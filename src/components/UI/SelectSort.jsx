import { Select, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const SelectSort = ({ sortBy, changeFn }) => {
  return (
    <Center>
      <Select
        w={{ base: "90%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
        icon={<ChevronDownIcon />}
        iconColor="#F5F5F5"
        value={sortBy}
        onChange={changeFn}
        border="1px solid #F5F5F5"
        style={{
          backgroundColor: "#121212",
          color: "#F5F5F5",
        }}
      >
        <option
          value=""
          style={{ backgroundColor: "#121212", color: "#F5F5F5" }}
        >
          All
        </option>
        <option
          value="1"
          style={{ backgroundColor: "#121212", color: "#F5F5F5" }}
        >
          Sports
        </option>
        <option
          value="2"
          style={{ backgroundColor: "#121212", color: "#F5F5F5" }}
        >
          Games
        </option>
        <option
          value="3"
          style={{ backgroundColor: "#121212", color: "#F5F5F5" }}
        >
          Relaxation
        </option>
      </Select>
    </Center>
  );
};
