import { Select } from "@chakra-ui/react";

export const SelectSort = ({ sortBy, changeFn }) => {
  return (
    <Select value={sortBy} onChange={changeFn} border="1px solid black">
      <option value="">All</option>
      <option value="1">Sports</option>
      <option value="2">Games</option>
      <option value="3">Relaxation</option>
    </Select>
  );
};
