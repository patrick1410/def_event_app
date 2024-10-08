export const login = async (username, password) => {
  const response = await fetch("https://event-api-prisma.onrender.com/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Login failed: ${errorText}`);
    return false;
  } else {
    const data = await response.json();
    localStorage.setItem("jwt", data.token); // Save JWT in localStorage
    return true;
  }
};
