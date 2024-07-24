import axios from "axios";

const baseURL = `${process.env.EXPO_PUBLIC_URLBACKEND_API}`;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("axios instance", baseURL);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
