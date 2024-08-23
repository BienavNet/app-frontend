import { jwtDecode } from "jwt-decode";
export const validateToken = (token) => {
  const now = Math.round(new Date().getTime() / 1000);
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.log("error jwt", error)
    return false;
  }
  const isValid = decodedToken && now < decodedToken.exp;
  return isValid;
};
