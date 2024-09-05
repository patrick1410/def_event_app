import { Box, Spinner } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        boxSize={32}
      />
    </Box>
  );
};
