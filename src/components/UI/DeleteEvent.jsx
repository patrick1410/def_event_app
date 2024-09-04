import { Button, useToast } from "@chakra-ui/react";

export const DeleteEvent = ({ clickFn, id }) => {
  const toast = useToast();
  const jwt = localStorage.getItem("jwt");

  const noPermission = () => {
    toast({
      title: "Access denied",
      description: "You must be logged in to perform this action.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Button
      w="6rem"
      backgroundColor="#bb86fc"
      color="#fff"
      _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
      transition="300ms ease-in"
      display="flex"
      justifyContent="center"
      onClick={jwt ? () => clickFn(id) : noPermission}
    >
      Delete
    </Button>
  );
};
