import { Link } from "react-router-dom";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav">
      <UnorderedList style={{ listStyle: "none", margin: 0 }}>
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
      </UnorderedList>
    </Box>
  );
};
