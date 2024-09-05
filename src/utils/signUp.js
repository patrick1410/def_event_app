import { getJWT } from "./getJWT";

export const signUp = async (username, password, name, image) => {
  const token = getJWT();
  const response = await fetch("https://event-api-prisma.onrender.com/users", {
    method: "POST",
    body: JSON.stringify({ username, password, name, image }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Signup failed: ${errorText}`);
    return false;
  } else {
    return true;
  }
};
