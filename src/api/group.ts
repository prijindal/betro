import axios from "axios";
import { aesEncrypt, generateSymKey } from "betro-js-lib";

import AuthController from "./auth";
import { GroupResponse } from "./types";

class GroupController {
    auth: AuthController;
    constructor(auth: AuthController) {
        this.auth = auth;
    }
    fetchGroups = async (): Promise<Array<GroupResponse> | null> => {
        try {
            const response = await axios.get(`${this.auth.host}/api/groups`, {
                headers: { Authorization: `Bearer ${this.auth.token}` },
            });
            const data = response.data;
            return data;
        } catch (e) {
            return null;
        }
    };

    deleteGroup = async (
        groupId: string
    ): Promise<{ is_following: boolean; is_approved: boolean; email: string } | null> => {
        try {
            const response = await axios.delete(`${this.auth.host}/api/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${this.auth.token}` },
            });
            const data = response.data;
            return data;
        } catch (e) {
            return null;
        }
    };

    createGroup = async (name: string, is_default: boolean): Promise<GroupResponse | null> => {
        const sym_key = await generateSymKey();
        const encryptedSymKey = await aesEncrypt(
            this.auth.encryptionKey,
            this.auth.encryptionMac,
            Buffer.from(sym_key, "base64")
        );
        try {
            const response = await axios.post(
                `${this.auth.host}/api/groups`,
                { name: name, sym_key: encryptedSymKey, is_default: is_default },
                {
                    headers: { Authorization: `Bearer ${this.auth.token}` },
                }
            );
            return response.data;
        } catch (e) {
            return null;
        }
    };
}

export default GroupController;
