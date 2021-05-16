import { AxiosResponse } from "axios";
import { symEncrypt, symDecrypt, generateExchangePair } from "betro-js-lib";
import times from "lodash/times";
import AuthController from "./auth";

class KeysController {
    auth: AuthController;
    constructor(auth: AuthController) {
        this.auth = auth;
    }

    fetchKeys = async (): Promise<boolean> => {
        if (!this.auth.isAuthenticated()) return false;
        const response = await this.auth.instance.get("api/keys?include_echd_counts=true");
        const data = response.data;
        const ecdh_max_keys = data.ecdh_max_keys;
        const ecdh_unclaimed_keys = data.ecdh_unclaimed_keys;
        const ecdh_claimed_keys = data.ecdh_claimed_keys;
        if (ecdh_claimed_keys + ecdh_unclaimed_keys > 0) {
            this.getExistingEcdhKeys();
        }
        if (ecdh_unclaimed_keys < ecdh_max_keys) {
            this.generateEcdhKeys(ecdh_max_keys / 2 - ecdh_unclaimed_keys);
        }
        const encryptedSymKey = data.sym_key;
        let sym_key: string | undefined;
        const symKey = await symDecrypt(this.auth.encryptionKey, encryptedSymKey);
        if (symKey != null) {
            sym_key = symKey.toString("base64");
            this.auth.symKey = sym_key;
            return true;
        }
        return false;
    };

    generateEcdhKeys = async (n: number) => {
        if (n <= 0) {
            return;
        }
        const keyPairs = await Promise.all(times(n).map(() => generateExchangePair()));
        const keyPairMappings: { [k: string]: string } = {};
        for (const keyPair of keyPairs) {
            keyPairMappings[keyPair.publicKey] = keyPair.privateKey;
        }
        const encryptedKeyPairs = await Promise.all(
            keyPairs.map(async ({ publicKey, privateKey }) => {
                const privKey = await symEncrypt(
                    this.auth.encryptionKey,
                    Buffer.from(privateKey, "base64")
                );
                return {
                    public_key: publicKey,
                    private_key: privKey,
                };
            })
        );
        const response = await this.auth.instance.post<
            null,
            AxiosResponse<
                Array<{
                    id: string;
                    user_id: string;
                    public_key: string;
                    private_key: string;
                    claimed: boolean;
                }>
            >
        >("api/keys/ecdh/upload", {
            keys: encryptedKeyPairs,
        });
        const data = response.data;
        for (const iterator of data) {
            if (keyPairMappings[iterator.public_key]) {
                this.auth.ecdhKeys[iterator.id] = {
                    id: iterator.id,
                    publicKey: iterator.public_key,
                    claimed: iterator.claimed,
                    privateKey: keyPairMappings[iterator.public_key],
                };
            }
        }
    };

    getExistingEcdhKeys = async () => {
        const response = await this.auth.instance.get<
            null,
            AxiosResponse<
                Array<{
                    id: string;
                    user_id: string;
                    public_key: string;
                    private_key: string;
                    claimed: boolean;
                }>
            >
        >("api/keys/ecdh");
        const encryptedKeyPairs = response.data;
        for (const encryptedKeyPair of encryptedKeyPairs) {
            const { id, public_key, private_key, claimed } = encryptedKeyPair;
            const privateKey = await symDecrypt(this.auth.encryptionKey, private_key);
            if (privateKey != null) {
                this.auth.ecdhKeys[id] = {
                    id,
                    publicKey: public_key,
                    claimed,
                    privateKey: privateKey?.toString("base64"),
                };
            }
        }
        console.dir(this.auth.ecdhKeys);
    };
}

export default KeysController;
