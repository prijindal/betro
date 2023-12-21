import React from "react";
import AppDrawer from "../AppDrawer";

const MobileAppDrawer: React.FunctionComponent<{
  includeRouting: boolean;
  open: boolean;
  setOpen: (b: boolean) => void;
}> = (props) => {
  const { includeRouting, open, setOpen } = props;
  return (
    <>
      <div
        className={`${
          open ? "absolute" : "hidden"
        } h-full w-full z-20 bg-black/20 cursor-pointer`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`${
          open ? "absolute" : "hidden"
        } z-20 bg-white shadow-subtle h-full`}
      >
        <AppDrawer includeRouting={includeRouting} />
      </div>
    </>
  );
};

export default MobileAppDrawer;
