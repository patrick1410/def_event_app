import { Button } from "@chakra-ui/react";

export const DeleteEvent = ({ clickFn, id }) => {
  return (
    <Button
      w="6rem"
      backgroundColor="#bb86fc"
      color="#fff"
      _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
      transition="300ms ease-in"
      display="flex"
      justifyContent="center"
      onClick={() => clickFn(id)}
    >
      Delete
    </Button>
  );
};
