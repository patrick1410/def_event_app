import { Button } from "@chakra-ui/react";

export const DeleteEvent = ({ clickFn, id }) => {
  return (
    <Button
      w="6rem"
      display="flex"
      justifyContent="center"
      onClick={() => clickFn(id)}
    >
      Delete
    </Button>
  );
};
