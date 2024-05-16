export const SelectSort = ({ sortBy, changeFn }) => {
  return (
    <select value={sortBy} onChange={changeFn}>
      <option value="">All</option>
      <option value="1">Sports</option>
      <option value="2">Games</option>
      <option value="3">Relaxation</option>
    </select>
  );
};
