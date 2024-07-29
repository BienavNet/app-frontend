import { jwtDecode } from "jwt-decode";
("jwt-decode");

export const validateToken = (token) => {
  const now = Math.round(new Date().getTime() / 1000);
  try {
    console.log("token typeof", typeof token);
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
  const isValid = decodedToken && now < decodedToken.exp;
  return isValid;
};
