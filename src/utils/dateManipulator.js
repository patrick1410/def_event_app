// convertDate functie
export const convertDate = (dateStr) => {
  const slicedDate = dateStr.slice(0, 16); // Slice dateStr to YYYY-MM-DD-TTTT
  const [datePart, timePart] = slicedDate.split("T"); // Split parts
  const [year, month, day] = datePart.split("-"); // Split date parts

  return `${day}-${month}-${year}, ${timePart}u`; // return manipulated dateString
};
