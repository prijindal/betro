const routes = {
  loading: "/",
  login: "/login",
  deregister: "/deregister",
  register: "/register",
  home: "/home",
  user: "/user/:username",
  approvals: "/approvals",
  followers: "/followers",
  followees: "/followees",
  groups: "/groups",
  search: "/search",
  post: "/post/:id",
  newpost: "/newpost",
  posts: "/posts",
  profile: "/profile",
  notifications: "/notifications",
  settings: "/settings",
  logout: "/logout",
};

export const getRoute = (
  path: string,
  params?: { [key: string]: string | number },
  routesConfig: any = routes
): string | undefined =>
  path.split(".").reduce((routeBranch: any, pathItem: string) => {
    if (routeBranch && routeBranch[pathItem]) {
      const route = routeBranch[pathItem];
      if (typeof route === "string") {
        if (!params || typeof params === "undefined") {
          return route;
        }

        return Object.entries(params).reduce((replaced, [key, value]) => {
          return replaced.replace(`:${key}`, String(value));
        }, route);
      }
      return routeBranch[pathItem];
    }
    return undefined;
  }, routesConfig);

export default routes;
