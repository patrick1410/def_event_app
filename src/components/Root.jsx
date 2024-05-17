import { Header } from "./UI/Header";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box, Center, VStack } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      <Center className="root">
        <VStack>
          <Header title={"Event App"} />
          <Navigation />
        </VStack>
      </Center>
      <Outlet />
    </Box>
  );
};
