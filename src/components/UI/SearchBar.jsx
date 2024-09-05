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
          children={<SearchIcon color="#F5F5F5" />}
        />
        <Input
          id="search"
          type="text"
          placeholder={placeholder}
          _placeholder={{ color: "#F5F5F5" }}
          border="1px solid #F5F5F5"
          onChange={changeFn}
          value={value}
          color="#F5F5F5"
          autoComplete="off"
        ></Input>
      </InputGroup>
    </Center>
  );
};
