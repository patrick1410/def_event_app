import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ placeholder, changeFn, value }) => {
  return (
    <InputGroup>
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
  );
};
