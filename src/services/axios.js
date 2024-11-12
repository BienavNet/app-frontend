import axios from "axios";
const baseURL = process.env.EXPO_PUBLIC_URLBACKEND_API;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);
export default axiosInstance;
