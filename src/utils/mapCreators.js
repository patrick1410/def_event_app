// createCategoryMap function
export const createCategoryMap = (categories) => {
  const categoryMap = {};
  categories.forEach((category) => {
    categoryMap[category.id] = category.name;
  });
  return categoryMap;
};

// createUserMap function
export const createUserMap = (users) => {
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user.name;
  });
  return userMap;
};
