import React, { Suspense, useCallback, useEffect, useState } from "react";
import TopAppBar from "../TopAppBar";
import AppDrawer from "../AppDrawer";
import LoadingFullPage from "../../ui/LoadingFullPage";
import classes from "./Layout.module.scss";
import Conversations from "../Conversations";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowWidth;
}

const MobileAppDrawer = React.lazy(
  () => import("../AppDrawer/MobileAppDrawer")
);

const Layout: React.FunctionComponent<
  React.PropsWithChildren<{ includeRouting: boolean }>
> = (props) => {
  const { children, includeRouting } = props;
  const [open, setOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const hidden = windowWidth < 960;
  const drawerToggle = useCallback(() => setOpen(!open), [open]);
  return (
    <div className="flex flex-row h-full">
      {hidden ? (
        <Suspense fallback={<LoadingFullPage />}>
          <MobileAppDrawer
            open={open}
            setOpen={setOpen}
            includeRouting={includeRouting}
          />
        </Suspense>
      ) : (
        <div className="flex flex-row items-start justify-end flex-1">
          <AppDrawer includeRouting={includeRouting} />
        </div>
      )}
      <div
        className="flex flex-col flex-1 ml-auto mr-auto overflow-auto h-screen"
        style={{ flexBasis: "auto" }}
      >
        <div className={`flex-1 max-w-5xl ${classes.innerContainer}`}>
          <TopAppBar
            onDrawerToggle={drawerToggle}
            includeRouting={includeRouting}
          />
          <div className="m-1">{children}</div>
        </div>
        <div className="fixed bottom-0 right-0">
          <Conversations />
        </div>
      </div>
    </div>
  );
};

export const wrapLayout = (
  children: React.FunctionComponent,
  options: { includeRouting: boolean } = { includeRouting: true }
): React.FunctionComponent => {
  return (props) => (
    <Layout includeRouting={options.includeRouting}>{children(props)}</Layout>
  );
};

export default Layout;
