import { Header } from "./UI/Header";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box className="root">
      <Header title={"Event App"} />
      <Navigation />
      <Outlet />
    </Box>
  );
};
