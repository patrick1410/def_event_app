import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="root">
      <Navigation />
      <Outlet />
    </div>
  );
};
