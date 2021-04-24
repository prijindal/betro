import axios from "axios";
import { rsaDecrypt, rsaEncrypt, symDecrypt } from "betro-js-lib";
import { API_HOST } from "../constants";
import { parseUserProfile } from "./profileHelper";

export interface PostResource {
    id: string;
    text_content: Buffer | null;
    media_content: Buffer | null;
    media_encoding: string;
    user: PostResourceUser;
    created_at: Date;
}

export interface PostResourceUser {
    username: string;
    first_name?: string | null;
    last_name?: string | null;
    profile_picture?: Buffer | null;
}

export interface UserInfo {
    is_following: boolean;
    is_approved: boolean;
    username: string;
    public_key: string | null;
    first_name?: string | null;
    last_name?: string | null;
    profile_picture?: Buffer | null;
}

export interface PostsFeedResponse {
    posts: Array<PostResponse>;
    users: { [user_id: string]: PostUserResponse };
    keys: { [key_id: string]: string };
}

export interface PostResponse {
    id: string;
    user_id: string;
    media_content: string;
    media_encoding: string;
    text_content: string;
    key_id: string;
    created_at: Date;
}

export interface PostUserResponse {
    username: string;
    sym_key?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    profile_picture?: string | null;
}

export const followUser = async (
    token: string,
    username: string,
    public_key: string,
    sym_key: string
): Promise<{ is_following: boolean; is_approved: boolean; email: string } | null> => {
    try {
        const encrypted_sym_key = await rsaEncrypt(public_key, Buffer.from(sym_key, "base64"));
        const response = await axios.post(
            `${API_HOST}/api/follow/`,
            {
                followee_username: username,
                sym_key: encrypted_sym_key,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = response.data;
        return data;
    } catch (e) {
        return null;
    }
};

export const fetchUserInfo = async (
    token: string,
    private_key: string,
    username: string
): Promise<UserInfo | null> => {
    try {
        const response = await axios.get(`${API_HOST}/api/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        if (data.sym_key != null) {
            const userResponse = await parseUserProfile(data.sym_key, private_key, data);
            return { ...data, ...userResponse };
        } else {
            return { ...data, first_name: null, last_name: null, profile_picture: null };
        }
    } catch (e) {
        return null;
    }
};

export const fetchUserPosts = async (
    token: string,
    username: string,
    private_key: string
): Promise<Array<PostResource> | null> => {
    try {
        const response = await axios.get(`${API_HOST}/api/user/${username}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data: PostsFeedResponse = response.data;
        const posts: Array<PostResource> = [];
        for (const post of data.posts) {
            const symKey = await rsaDecrypt(private_key, data.keys[post.key_id]);
            const sym_key = symKey.toString("base64");
            let text: Buffer | null = null;
            let media: Buffer | null = null;
            if (post.text_content !== null) {
                text = await symDecrypt(sym_key, post.text_content);
            }
            if (post.media_content !== null) {
                media = await symDecrypt(sym_key, post.media_content);
            }
            let resUser: PostUserResponse = data.users[post.user_id];
            let user: PostResourceUser = { username: resUser.username };
            if (resUser.sym_key != null) {
                const userProfile = await parseUserProfile(resUser.sym_key, private_key, resUser);
                user = {
                    username: resUser.username,
                    ...userProfile,
                };
            }
            posts.push({
                id: post.id,
                created_at: post.created_at,
                text_content: text,
                media_content: media,
                media_encoding: post.media_encoding,
                user: user,
            });
        }
        return posts;
    } catch (e) {
        return null;
    }
};
