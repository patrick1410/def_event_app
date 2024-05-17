import { Heading } from "@chakra-ui/react";

export const Header = ({ title }) => {
  return (
    <Heading as="h1" size="3xl">
      {title}
    </Heading>
  );
};
