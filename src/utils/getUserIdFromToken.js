import { jwtDecode } from "jwt-decode";

// Function to extract userId from token
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId; // Return usedId from token
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return null;
};
