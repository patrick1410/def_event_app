export const SearchBar = ({ placeholder, changeFn, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{ border: "1px solid black" }}
      onChange={changeFn}
      value={value}
    ></input>
  );
};
