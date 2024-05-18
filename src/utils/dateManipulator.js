// convertDate functie
export const convertDate = (dateStr) => {
  const slicedDate = dateStr.slice(0, 16); // Slice date to YYYY-MM-DD-TTTT
  const [datePart, timePart] = slicedDate.split("T"); // Split parts
  const [year, month, day] = datePart.split("-"); // Split date parts

  return `${day}-${month}-${year}, ${timePart}u`; // return manipulated dateString
};

export const sliceDate = (date) => {
  if (date.length >= 16) {
    const slicedDate = date.slice(0, 16);
    console.log(slicedDate);
  } else {
    console.log(date);
  }
};
