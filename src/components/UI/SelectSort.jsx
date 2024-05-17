import { Select, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const SelectSort = ({ sortBy, changeFn }) => {
  return (
    <Center>
      <Select
        w={{ base: "90%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
        icon={<ChevronDownIcon />}
        value={sortBy}
        onChange={changeFn}
        border="1px solid black"
      >
        <option value="">All</option>
        <option value="1">Sports</option>
        <option value="2">Games</option>
        <option value="3">Relaxation</option>
      </Select>
    </Center>
  );
};
