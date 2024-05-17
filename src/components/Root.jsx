import { Header } from "./UI/Header";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box, Center, VStack } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box className="root">
      <Center>
        <VStack>
          <Header title={"Event App"} />
          <Navigation />
        </VStack>
      </Center>
      <Outlet />
    </Box>
  );
};
