import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_URLBACKEND_API;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("Response Error Data:", error.response.data);
      console.log("Response Error Status:", error.response.status);
      console.log("Response Error Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request Error:", error.request);
    } else {
      console.log("General Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
