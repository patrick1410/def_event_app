import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  UnorderedList,
  ListItem,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { getJWT } from "../utils/getJWT";

export const Navigation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // Handles logout and removes the JWT from the localStorage
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/"); // Redirect to login page this is necessary
    toast({
      title: "Logged out!",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const jwt = getJWT();

  return (
    <Box as="nav">
      <UnorderedList style={{ listStyle: "none", margin: 0 }}>
        <HStack>
          <ListItem
            color="#F5F5F5"
            _hover={{ color: "#bb86fc" }}
            mb={5}
            transition="300ms ease-in"
          >
            <Link
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              to={"/"}
            >
              Home
            </Link>
          </ListItem>
          <ListItem
            color="#F5F5F5"
            _hover={{ color: "#bb86fc" }}
            mb={5}
            transition="300ms ease-in"
          >
            {jwt ? (
              <Text className="logout" onClick={handleLogout}>
                Logout
              </Text>
            ) : (
              <Link
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                to={"/login"}
              >
                Login
              </Link>
            )}
          </ListItem>
          <ListItem
            color="#F5F5F5"
            _hover={{ color: "#bb86fc" }}
            mb={5}
            transition="300ms ease-in"
          >
            {jwt && (
              <Link
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                to={"/signup"}
              >
                Create account
              </Link>
            )}
          </ListItem>
        </HStack>
      </UnorderedList>
    </Box>
  );
};
