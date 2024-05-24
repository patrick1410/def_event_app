// convertDate functie
export const convertDate = (dateStr) => {
  const slicedDate = dateStr.slice(0, 16); // Slice dateStr to YYYY-MM-DD-TTTT
  const [datePart, timePart] = slicedDate.split("T"); // Split parts
  const [year, month, day] = datePart.split("-"); // Split date parts

  return `${day}-${month}-${year}, ${timePart}u`; // return manipulated dateString
};

export const capFirstIndex = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1); // capitalize first index

export const getCreatedBy = (createdBy, users) => {
  if (typeof createdBy === "number") {
    const user = users.find((user) => user.id === createdBy.toString()); // Find the user with the matching ID
    return user ? user.name : createdBy; // Return the user's name if found, otherwise return the original createdBy value
  }
  return createdBy;
};
