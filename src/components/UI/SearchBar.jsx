import { Input, InputGroup, InputLeftElement, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ placeholder, changeFn, value }) => {
  return (
    <Center>
      <InputGroup
        mt={5}
        mb={5}
        w={{ base: "90%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray" />}
        />
        <Input
          type="text"
          placeholder={placeholder}
          border="1px solid black"
          onChange={changeFn}
          value={value}
        ></Input>
      </InputGroup>
    </Center>
  );
};
