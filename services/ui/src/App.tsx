import * as React from "react";
import { Helmet } from "react-helmet-async";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import favicon from "./assets/favicon.png";
import routes from "./routes";
import RequireAuth from "./components/RequireAuth";
import { useSelector } from "react-redux";
import { getAuth } from "./store/app/selectors";
import { wrapLayout } from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Deregister from "./pages/Deregister";
import Register from "./pages/Register";
import User from "./pages/User";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import Posts from "./pages/Posts";
import Search from "./pages/Search";
import Approvals from "./pages/Approvals";
import Followers from "./pages/Followers";
import Followees from "./pages/Followees";
import Groups from "./pages/Groups";
import Notifications from "./pages/Notifications";
import UserSettings from "./pages/UserSettings";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import LoadingFullPage from "./ui/LoadingFullPage";

const LayoutLoading = wrapLayout(() => <LoadingFullPage />, {
  includeRouting: false,
});

const LoadingSuspense = () => {
  const auth = useSelector(getAuth);
  if (auth.isLoaded === false) {
    return <LoadingFullPage />;
  } else {
    return <LayoutLoading />;
  }
};

const APP_ROUTES = [
  {
    route: routes.home,
    Component: Home,
  },
  {
    route: routes.user,
    Component: User,
  },
  {
    route: routes.posts,
    Component: Posts,
  },
  {
    route: routes.groups,
    Component: Groups,
  },
  {
    route: routes.approvals,
    Component: Approvals,
  },
  {
    route: routes.approvals,
    Component: Approvals,
  },
  {
    route: routes.followers,
    Component: Followers,
  },
  {
    route: routes.followees,
    Component: Followees,
  },
  {
    route: routes.post,
    Component: Post,
  },
  {
    route: routes.newpost,
    Component: NewPost,
  },
  {
    route: routes.profile,
    Component: Profile,
  },
  {
    route: routes.notifications,
    Component: Notifications,
  },
  {
    route: routes.settings,
    Component: UserSettings,
  },
];

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingSuspense />}>
      <Router>
        <Helmet
          defaultTitle="Betro"
          titleTemplate="%s – Betro"
          link={[{ rel: "icon", type: "image/png", href: favicon }]}
        />
        <Routes>
          <Route path={routes.loading} element={<Navigate to="/home" />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.deregister} element={<Deregister />} />
          <Route path={routes.register} element={<Register />} />
          {APP_ROUTES.map(({ route, Component }) => (
            <Route
              key={route}
              path={route}
              element={
                <RequireAuth>
                  <Component />
                </RequireAuth>
              }
            />
          ))}
          <Route
            path={routes.search}
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route path={routes.logout} element={<Logout />} />
          <Route path="*">404</Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default App;
