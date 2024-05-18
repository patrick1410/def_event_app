import { Select, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { capFirstIndex } from "../../utils/strManipulator";

export const SelectSort = ({ sortBy, changeFn, data }) => {
  const { categories } = data;

  const style = { backgroundColor: "#121212", color: "#F5F5F5" };

  return (
    <Center>
      <Select
        w={{ base: "90%", sm: "60%", md: "50%", lg: "40%", xl: "30%" }}
        icon={<ChevronDownIcon />}
        iconColor="#F5F5F5"
        value={sortBy}
        onChange={changeFn}
        border="1px solid #F5F5F5"
        style={style}
      >
        <option value="" style={style}>
          All
        </option>
        {categories.map(({ name, id }) => (
          <option value={id} key={id} style={style}>
            {capFirstIndex(name)}
          </option>
        ))}
      </Select>
    </Center>
  );
};
