import { symDecrypt, deriveExchangeSymKey } from "betro-js-lib";
import { bufferToImageUrl } from "../util/bufferToImage";
import AuthController from "./auth";
import { parsePost, parseUserProfile } from "./profileHelper";
import {
    FeedPageInfo,
    PostResource,
    PostResourceUser,
    PostResponse,
    PostsFeedResponse,
    PostUserResponse,
} from "./types";

class FeedController {
    auth: AuthController;
    constructor(auth: AuthController) {
        this.auth = auth;
    }

    transformPostFeed = async (
        feed: PostsFeedResponse,
        postToSymKey: (
            post: PostResponse,
            keys: { [key_id: string]: string },
            users: { [user_id: string]: PostUserResponse }
        ) => Promise<string>
    ): Promise<Array<PostResource>> => {
        const posts: Array<PostResource> = [];
        const users: { [user_id: string]: PostResourceUser } = {};
        for (const user_id in feed.users) {
            if (Object.prototype.hasOwnProperty.call(feed.users, user_id)) {
                const user = feed.users[user_id];
                if (
                    user.encrypted_profile_sym_key != null &&
                    user.public_key != null &&
                    user.own_key_id != null
                ) {
                    const userProfile = await parseUserProfile(
                        user.encrypted_profile_sym_key,
                        user.public_key,
                        this.auth.ecdhKeys[user.own_key_id].privateKey,
                        user
                    );
                    users[user_id] = {
                        username: user.username,
                        first_name: userProfile.first_name,
                        last_name: userProfile.last_name,
                        profile_picture:
                            userProfile.profile_picture != null
                                ? bufferToImageUrl(userProfile.profile_picture)
                                : null,
                    };
                }
            }
        }
        for (const post of feed.posts) {
            const sym_key = await postToSymKey(post, feed.keys, feed.users);
            const parsedPost = await parsePost(post, sym_key);
            posts.push({
                ...parsedPost,
                user: users[post.user_id],
            });
        }
        return posts;
    };

    private feedDefaultTransform = async (
        post: PostResponse,
        keys: { [key_id: string]: string },
        users: { [user_id: string]: PostUserResponse }
    ) => {
        const user = users[post.user_id];
        if (user.own_key_id == null || user.public_key == null) {
            throw Error("Decryption issues");
        }
        const ownKey = this.auth.ecdhKeys[user.own_key_id];
        const derivedKey = await deriveExchangeSymKey(user.public_key, ownKey.privateKey);
        const symKey = await symDecrypt(derivedKey, keys[post.key_id]);
        if (symKey == null) {
            throw Error("Decryption issues");
        }
        const sym_key = symKey.toString("base64");
        return sym_key;
    };

    fetchUserPosts = async (
        username: string,
        after: string | undefined
    ): Promise<{ data: Array<PostResource>; pageInfo: FeedPageInfo } | null> => {
        const limit = 5;
        if (after == null) {
            after = Buffer.from(new Date().toISOString(), "utf-8").toString("base64");
        }
        try {
            const response = await this.auth.instance.get(
                `/api/user/${username}/posts?limit=${limit}&after=${after}`
            );
            const posts: PostsFeedResponse = response.data;
            const data = await this.transformPostFeed(posts, this.feedDefaultTransform);
            return {
                data,
                pageInfo: response.data.pageInfo,
            };
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    fetchOwnPosts = async (
        after: string | undefined
    ): Promise<{ data: Array<PostResource>; pageInfo: FeedPageInfo } | null> => {
        const limit = 29;
        if (after == null) {
            after = Buffer.from(new Date().toISOString(), "utf-8").toString("base64");
        }
        try {
            const response = await this.auth.instance.get(
                `/api/account/posts?limit=${limit}&after=${after}`
            );
            const posts: PostsFeedResponse = response.data;
            const data = await this.transformPostFeed(posts, async (post, keys) => {
                const symKey = await symDecrypt(this.auth.encryptionKey, keys[post.key_id]);
                if (symKey != null) {
                    const sym_key = symKey.toString("base64");
                    return sym_key;
                }
                return "";
            });
            return {
                data,
                pageInfo: response.data.pageInfo,
            };
        } catch (e) {
            return null;
        }
    };

    fetchHomeFeed = async (
        after: string | undefined
    ): Promise<{ data: Array<PostResource>; pageInfo: FeedPageInfo } | null> => {
        const limit = 5;
        if (after == null) {
            after = Buffer.from(new Date().toISOString(), "utf-8").toString("base64");
        }
        try {
            const response = await this.auth.instance.get(
                `/api/feed?limit=${limit}&after=${after}`
            );
            const posts: PostsFeedResponse = response.data;
            const data = await this.transformPostFeed(posts, this.feedDefaultTransform);
            return {
                data,
                pageInfo: response.data.pageInfo,
            };
        } catch (e) {
            return null;
        }
    };
}

export default FeedController;
