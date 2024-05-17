import { Link } from "react-router-dom";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav">
      <UnorderedList style={{ listStyle: "none" }}>
        <ListItem>
          <Link to={"/"}>Home</Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
