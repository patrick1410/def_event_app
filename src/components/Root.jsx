import { Header } from "./UI/Header";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="root">
      <Header title={"Event App"} />
      <Navigation />
      <Outlet />
    </div>
  );
};
