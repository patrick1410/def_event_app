import { Link } from "react-router-dom";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav">
      <UnorderedList style={{ listStyle: "none", margin: 0 }}>
        <ListItem _hover={{ color: "#0000EE" }} mb={5}>
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
