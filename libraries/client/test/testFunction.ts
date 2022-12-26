import { UserSettingsType } from "../src";
import { GeneratedUser, generateUsers } from "./generateUsers";

export const runTests = (port: string): void => {
  let users: Array<GeneratedUser> = [];
  beforeAll(async () => {
    users = await generateUsers(port, 3);
  });
  it("Check email availability", async () => {
    for await (const user of users) {
      const isAvailable = await user.api.auth.isAvailableEmail(
        user.credentials.email
      );
      expect(isAvailable).toEqual(true);
    }
  });
  it("Check username availability", async () => {
    for await (const user of users) {
      const isAvailable = await user.api.auth.isAvailableUsername(
        user.credentials.email
      );
      expect(isAvailable).toEqual(true);
    }
  });
  it("Create users", async () => {
    for await (const user of users) {
      const isRegistered = await user.api.auth.register(
        user.credentials.username,
        user.credentials.email,
        user.password
      );
      expect(isRegistered).toEqual(true);
    }
  });
  it("Login users", async () => {
    for await (const user of users) {
      const isLoggedIn = await user.api.auth.login(
        user.credentials.email,
        user.password,
        false
      );
      expect(isLoggedIn).toEqual(true);
    }
  });
  it("Test invalid login", async () => {
    for await (const user of users) {
      expect(
        user.api.auth.login(user.credentials.email, "MyPassword@123", false)
      ).rejects.toThrow("Request failed with status code 403");
    }
  });
  it("Fetches keys", async () => {
    for (const user of users) {
      const isTokens = await user.api.keys.fetchKeys();
      expect(isTokens).toEqual(true);
    }
  });
  it("Saves profile information", async () => {
    for (const user of users) {
      const profile = await user.api.account.createProfile(
        user.profile.first_name,
        user.profile.last_name,
        user.profile.profile_picture
      );
      expect(profile).not.toBeNull();
      if (!profile) throw Error();
      expect(profile.first_name).not.toBeNull();
      expect(profile.last_name).not.toBeNull();
      expect(profile.profile_picture).not.toBeNull();
    }
  });
  it("Checks profile information", async () => {
    for (const user of users) {
      const profile = await user.api.account.fetchProfile();
      expect(profile).not.toBeNull();
      if (!profile) throw Error();
      expect(profile.first_name).toEqual(user.profile.first_name);
      expect(profile.last_name).toEqual(user.profile.last_name);
      expect(profile.profile_picture).toEqual(user.profile.profile_picture);
      expect(user.api.auth.symKey).not.toBeNull();
      if (!user.api.auth.symKey) throw Error();
      expect(profile.sym_key).toEqual(user.api.auth.symKey.toString("base64"));
    }
  });
  it("Updates Profile information", async () => {
    for (const user of users) {
      const profile = await user.api.account.updateProfile(
        user.profile.first_name,
        user.profile.last_name,
        Buffer.from("jc3o9chn32oc3")
      );
      expect(profile).not.toBeNull();
      if (!profile) throw Error();
      expect(profile.first_name).toBeTruthy();
      expect(profile.last_name).toBeTruthy();
      expect(profile.profile_picture).toBeTruthy();
      expect(profile.sym_key).toBeTruthy();
    }
  });
  it("Check whoami", async () => {
    for (const user of users) {
      const whoAmi = await user.api.account.whoAmi();
      expect(whoAmi).not.toBeNull();
      if (!whoAmi) throw Error();
      expect(whoAmi.email).toEqual(user.credentials.email);
      expect(whoAmi.user_id).toBeTruthy();
      expect(whoAmi.username).toEqual(user.credentials.username);
      user.id = whoAmi.user_id;
    }
  });
  it("Enables settings", async () => {
    const user_settings: Array<UserSettingsType> = [
      "notification_on_approved",
      "notification_on_followed",
      "allow_search",
    ];
    for (const user of users) {
      for (const user_setting of user_settings) {
        const isChanged = await user.api.settings.changeUserSettings(
          user_setting,
          true
        );
        expect(isChanged).not.toBeNull();
        if (!isChanged) throw Error();
        expect(isChanged.enabled).toEqual(true);
        expect(isChanged.type).toEqual(user_setting);
        expect(isChanged.id).toBeTruthy();
      }
    }
  });
  it("Checks settings", async () => {
    for (const user of users) {
      const settings = await user.api.settings.fetchUserSettings();
      expect(settings).not.toBeNull();
      if (!settings) throw Error();
      expect(settings.length).toEqual(3);
      expect(settings[0].type).toEqual("notification_on_approved");
      expect(settings[0].enabled).toEqual(true);
    }
  });
  it("Fetches user groups", async () => {
    for (const user of users) {
      const groups = await user.api.group.fetchGroups();
      expect(groups).not.toBeNull();
      if (!groups) throw Error();
      expect(groups.length).toEqual(0);
    }
  });
  it("Creates user group", async () => {
    for (const user of users) {
      const group = await user.api.group.createGroup("Followers", true);
      expect(group).not.toBeNull();
      if (!group) throw Error();
      expect(group.id).toBeTruthy();
    }
  });
  it("Verifies groups are created", async () => {
    for (const user of users) {
      const groups = await user.api.group.fetchGroups();
      expect(groups).not.toBeNull();
      if (!groups) throw Error();
      expect(groups.length).toEqual(1);
      user.groups = groups;
    }
  });
  it("Check Ecdh Keys", async () => {
    for (const user of users) {
      await user.api.keys.getExistingEcdhKeys();
      expect(Object.keys(user.api.auth.ecdhKeys).length).toEqual(25);
    }
  });
  it("Follows user", async () => {
    // User 1 send follow request to user2
    const user1 = users[0];
    const user2 = users[1];
    const ecdhKeyId = Object.keys(user2.api.auth.ecdhKeys)[0];
    const ecdhKeyPair = user2.api.auth.ecdhKeys[ecdhKeyId];
    expect(user2.id).not.toBeNull();
    if (!user2.id) throw Error();
    const followUser = await user1.api.follow.followUser(
      user2.id,
      ecdhKeyPair.id,
      ecdhKeyPair.publicKey
    );
    expect(followUser).not.toBeNull();
    if (!followUser) throw Error();
    expect(followUser.is_approved).toEqual(false);
  });
  it("Searches user", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const result = await user2.api.follow.searchUser(
      user1.credentials.username
    );
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(user1.id);
  });
  it("Check notification for follow", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const notifications = await user2.api.notifications.fetchNotifications();
    expect(notifications).not.toBeNull();
    if (!notifications) throw Error();
    expect(notifications.length).toEqual(1);
    expect(notifications[0].content).toEqual(
      `${user1.credentials.username} asked to follow you`
    );
    expect(notifications[0].payload.username).toEqual(
      user1.credentials.username
    );
  });
  it("Check approvals and Approve users", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const approvals = await user2.api.follow.fetchPendingApprovals();
    expect(approvals).not.toBeNull();
    if (!approvals) throw Error();
    expect(approvals.total).toEqual(1);
    expect(approvals.data.length).toEqual(1);
    const data = approvals.data;
    expect(data[0].follower_id).toEqual(user1.id);
    const publicKey = data[0].public_key;
    const own_key_id = data[0].own_key_id;
    const first_name = data[0].first_name;
    const ecdhKeyId = Object.keys(user2.api.auth.ecdhKeys)[0];
    const ownKeyPair = user2.api.auth.ecdhKeys[ecdhKeyId];
    expect(ownKeyPair).not.toBeNull();
    expect(first_name).toEqual(user1.profile.first_name);
    expect(publicKey).not.toBeNull();
    if (!publicKey) throw Error();
    expect(own_key_id).not.toBeNull();
    if (!own_key_id) throw Error();
    expect(user2.groups).not.toBeNull();
    if (!user2.groups) throw Error();
    const approved = await user2.api.follow.approveUser(
      data[0].id,
      publicKey,
      user2.groups[0].id,
      user2.groups[0].sym_key,
      own_key_id,
      ownKeyPair.privateKey,
      true
    );
    expect(approved).toBeTruthy();
    if (!approved) throw Error();
    expect(approved.approved).toEqual(true);
  });
  it("Check followers", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const followers = await user2.api.follow.fetchFollowers();
    expect(followers).not.toBeNull();
    if (!followers) throw Error();
    expect(followers.total).toEqual(1);
    expect(followers.data.length).toEqual(1);
    expect(followers.data[0].user_id).toEqual(user1.id);
  });
  it("Check followees", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const followees = await user1.api.follow.fetchFollowees();
    expect(followees).not.toBeNull();
    if (!followees) throw Error();
    expect(followees.total).toEqual(1);
    expect(followees.data.length).toEqual(1);
    expect(followees.data[0].user_id).toEqual(user2.id);
  });
  it("Check notification for approved", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const notifications = await user1.api.notifications.fetchNotifications();
    expect(notifications).not.toBeNull();
    if (!notifications) throw Error();
    expect(notifications.length).toEqual(1);
    expect(notifications[0].content).toEqual(
      `${user2.credentials.username} has approved your follow request`
    );
    expect(notifications[0].payload.username).toEqual(
      user2.credentials.username
    );
  });
  it("Read notification", async () => {
    const user1 = users[0];
    let notifications = await user1.api.notifications.fetchNotifications();
    expect(notifications).not.toBeNull();
    if (!notifications) throw Error();
    const read = await user1.api.notifications.readNotification(
      notifications[0].id
    );
    expect(read).toEqual(true);
    notifications = await user1.api.notifications.fetchNotifications();
    expect(notifications).not.toBeNull();
    if (!notifications) throw Error();
    expect(notifications[0].read).toEqual(true);
  });
  it("Create new post", async () => {
    const user2 = users[1];
    const data = "My First Post";
    expect(user2.groups).not.toBeNull();
    if (!user2.groups) throw Error();
    const post = await user2.api.post.createPost(
      user2.groups[0].id,
      user2.groups[0].sym_key,
      data,
      null,
      null
    );
    expect(post).not.toBeNull();
    if (!post) throw Error();
    expect(post.id).toBeTruthy();
    expect(post.text_content).toBeTruthy();
  });
  it("Fetches user info", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const userInfo = await user1.api.follow.fetchUserInfo(
      user2.credentials.username
    );
    expect(userInfo).not.toBeNull();
    if (!userInfo) throw Error();
    expect(userInfo.username).toEqual(user2.credentials.username);
    expect(userInfo.first_name).toEqual(user2.profile.first_name);
    expect(userInfo.last_name).toEqual(user2.profile.last_name);
  });
  it("Fetches user posts", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const userPosts = await user1.api.feed.fetchUserPosts(
      user2.credentials.username
    );
    expect(userPosts).not.toBeNull();
    if (!userPosts) throw Error();
    expect(userPosts.data.length).toEqual(1);
    expect(userPosts.data[0].user.username).toEqual(user2.credentials.username);
    expect(userPosts.data[0].user.first_name).toEqual(user2.profile.first_name);
    expect(userPosts.data[0].text_content).toEqual("My First Post");
  });
  it("Fetches Home feed", async () => {
    const user1 = users[0];
    const user2 = users[1];
    const homeFeed = await user1.api.feed.fetchHomeFeed();
    expect(homeFeed).not.toBeNull();
    if (!homeFeed) throw Error();
    expect(homeFeed.data.length).toEqual(1);
    expect(homeFeed.data[0].user.username).toEqual(user2.credentials.username);
  });
  it("Fetches own posts", async () => {
    const user2 = users[1];
    const posts = await user2.api.feed.fetchOwnPosts();
    expect(posts).not.toBeNull();
    if (!posts) throw Error();
    expect(posts.data.length).toEqual(1);
    expect(posts.data[0].likes).toEqual(0);
    expect(posts.data[0].text_content).toEqual("My First Post");
  });
  it("Like post", async () => {
    const user1 = users[0];
    const homeFeed = await user1.api.feed.fetchHomeFeed();
    expect(homeFeed).not.toBeNull();
    if (!homeFeed) throw Error();
    const likePosts = await user1.api.post.like(homeFeed.data[0].id);
    expect(likePosts.liked).toEqual(true);
    expect(likePosts.likes).toEqual(1);
  });
  it("Fetch post", async () => {
    const user1 = users[0];
    const homeFeed = await user1.api.feed.fetchHomeFeed();
    expect(homeFeed).not.toBeNull();
    if (!homeFeed) throw Error();
    const post = await user1.api.post.getPost(homeFeed.data[0].id);
    expect(post).not.toBeNull();
    if (!post) throw Error();
    expect(post.likes).toEqual(1);
    expect(post.user.first_name).toEqual(users[1].profile.first_name);
    expect(post.text_content).toEqual("My First Post");
  });
  it("Unike post", async () => {
    const user1 = users[0];
    const homeFeed = await user1.api.feed.fetchHomeFeed();
    expect(homeFeed).not.toBeNull();
    if (!homeFeed) throw Error();
    const likePosts = await user1.api.post.unlike(homeFeed.data[0].id);
    expect(likePosts.liked).toEqual(false);
    expect(likePosts.likes).toEqual(0);
  });
  it("Deletes group", async () => {
    for (const user of users) {
      expect(user.groups).not.toBeNull();
      if (!user.groups) throw Error();
      const deletedGroup = await user.api.group.deleteGroup(user.groups[0].id);
      expect(deletedGroup).not.toBeNull();
      if (!deletedGroup) throw Error();
      expect(deletedGroup.deleted).toEqual(true);
    }
  });
  describe("Conversation between people without any profile grants", () => {
    it("Create conversation", async () => {
      const user1 = users[0];
      const user3 = users[2];
      const ecdhKeyId = Object.keys(user3.api.auth.ecdhKeys)[0];
      const ecdhKey = user3.api.auth.ecdhKeys[ecdhKeyId];
      expect(user3.id).not.toBeNull();
      if (!user3.id) throw Error();
      const conversation = await user1.api.conversation.createConversation(
        user3.id,
        ecdhKeyId
      );
      expect(conversation).not.toBeNull();
      if (!conversation) throw Error();
      expect(conversation.first_name).toEqual(null);
      expect(conversation.user_id).toEqual(user3.id);
      expect(conversation.public_key).toEqual(ecdhKey.publicKey);
    });
    it("Checks conversation", async () => {
      const user1 = users[0];
      const user3 = users[2];
      const conversations = await user3.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      expect(conversations.data.length).toEqual(1);
      expect(conversations.data[0].user_id).toEqual(user1.id);
      expect(conversations.data[0].first_name).toEqual(null);
      expect(conversations.data[0].last_name).toEqual(null);
      expect(conversations.data[0].username).toEqual(
        user1.credentials.username
      );
    });
    it("Fetches conversation", async () => {
      const user1 = users[0];
      const user3 = users[2];
      const conversations = await user1.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      expect(conversations.total).toEqual(1);
      const conversation = await user1.api.conversation.fetchConversation(
        conversations.data[0].id
      );
      expect(conversation).not.toBeNull();
      if (!conversation) throw Error();
      expect(conversation.user_id).toEqual(user3.id);
      expect(conversation.username).toEqual(user3.credentials.username);
    });
    it("Sends message", async () => {
      const user3 = users[2];
      const conversations = await user3.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      const conversation = conversations.data[0];
      expect(conversation.own_private_key).not.toBeNull();
      if (!conversation.own_private_key) throw Error();
      expect(conversation.public_key).not.toBeNull();
      if (!conversation.public_key) throw Error();
      const message = await user3.api.conversation.sendMessage(
        conversation.id,
        conversation.own_private_key,
        conversation.public_key,
        "Hello"
      );
      expect(message.id).not.toBeNull();
    });
    it("Fetches messages", async () => {
      const user1 = users[0];
      const conversations = await user1.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      const conversation = conversations.data[0];
      expect(conversation.own_private_key).not.toBeNull();
      if (!conversation.own_private_key) throw Error();
      expect(conversation.public_key).not.toBeNull();
      if (!conversation.public_key) throw Error();
      const messages = await user1.api.conversation.fetchMessages(
        conversation.id,
        conversation.own_private_key,
        conversation.public_key
      );
      expect(messages.data.length).toEqual(1);
      expect(messages.data[0].message).toEqual("Hello");
    });
  });
  describe("Conversation between people who have profile grants", () => {
    it("Create conversation", async () => {
      const user1 = users[0];
      const user2 = users[1];
      const ecdhKeyId = Object.keys(user2.api.auth.ecdhKeys)[0];
      const ecdhKey = user2.api.auth.ecdhKeys[ecdhKeyId];
      expect(user2.id).not.toBeNull();
      if (!user2.id) throw Error();
      const conversation = await user1.api.conversation.createConversation(
        user2.id,
        ecdhKeyId
      );
      expect(conversation).not.toBeNull();
      if (!conversation) throw Error();
      expect(conversation.first_name).toEqual(user2.profile.first_name);
      expect(conversation.user_id).toEqual(user2.id);
      expect(conversation.public_key).toEqual(ecdhKey.publicKey);
    });
    it("Checks conversation", async () => {
      const user1 = users[0];
      const user2 = users[1];
      const conversations = await user2.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      expect(conversations.data.length).toEqual(1);
      expect(conversations.data[0].user_id).toEqual(user1.id);
      expect(conversations.data[0].first_name).toEqual(
        user1.profile.first_name
      );
      expect(conversations.data[0].last_name).toEqual(user1.profile.last_name);
      expect(conversations.data[0].username).toEqual(
        user1.credentials.username
      );
    });
    it("Fetches conversation", async () => {
      const user1 = users[0];
      const user2 = users[1];
      const conversations = await user1.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      const conversation = await user1.api.conversation.fetchConversation(
        conversations.data[0].id
      );
      expect(conversation).not.toBeNull();
      if (!conversation) throw Error();
      expect(conversation.user_id).toEqual(user2.id);
      expect(conversation.username).toEqual(user2.credentials.username);
    });
    it("Sends message", async () => {
      const user2 = users[1];
      const conversations = await user2.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      const conversation = conversations.data[0];
      expect(conversation.own_private_key).not.toBeNull();
      if (!conversation.own_private_key) throw Error();
      expect(conversation.public_key).not.toBeNull();
      if (!conversation.public_key) throw Error();
      const message = await user2.api.conversation.sendMessage(
        conversation.id,
        conversation.own_private_key,
        conversation.public_key,
        "Hello"
      );
      expect(message.id).not.toBeNull();
    });
    it("Fetches messages", async () => {
      const user1 = users[0];
      const conversations = await user1.api.conversation.fetchConversations(
        undefined
      );
      expect(conversations).not.toBeNull();
      if (!conversations) throw Error();
      const conversation = conversations.data[0];
      expect(conversation.own_private_key).not.toBeNull();
      if (!conversation.own_private_key) throw Error();
      expect(conversation.public_key).not.toBeNull();
      if (!conversation.public_key) throw Error();
      const messages = await user1.api.conversation.fetchMessages(
        conversation.id,
        conversation.own_private_key,
        conversation.public_key
      );
      expect(messages.data.length).toEqual(1);
      expect(messages.data[0].message).toEqual("Hello");
    });
  });
  it("Checks count", async () => {
    const user1 = users[0];
    const countsUser1 = await user1.api.account.fetchCounts();
    expect(countsUser1).not.toBeNull();
    if (!countsUser1) throw Error();
    expect(countsUser1.notifications).toEqual(0);
    expect(countsUser1.settings).toEqual(3);
    expect(countsUser1.groups).toEqual(0);
    expect(countsUser1.followers).toEqual(0);
    expect(countsUser1.followees).toEqual(1);
    expect(countsUser1.approvals).toEqual(0);
    expect(countsUser1.posts).toEqual(0);
    const user2 = users[1];
    const countsUser2 = await user2.api.account.fetchCounts();
    expect(countsUser2).not.toBeNull();
    if (!countsUser2) throw Error();
    expect(countsUser2.notifications).toEqual(1);
    expect(countsUser2.settings).toEqual(3);
    expect(countsUser2.groups).toEqual(0);
    expect(countsUser2.followers).toEqual(1);
    expect(countsUser2.followees).toEqual(0);
    expect(countsUser2.approvals).toEqual(0);
    expect(countsUser2.posts).toEqual(1);
  });
};
