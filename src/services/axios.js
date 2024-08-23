import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const baseURL = process.env.EXPO_PUBLIC_URLBACKEND_API;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const router = useRouter();
    const { response } = error;
    if (response) {
      if (response.status === 401 || response.status === 403) {
        console.log("status code: " + response.status)
        console.log("data code: " + response.data)
        await AsyncStorage.removeItem("access_token");
        delete axiosInstance.defaults.headers.common["Authorization"];
        router.replace("/");
        return Promise.reject(new Error("Token expired or unauthorized."));
      } else {
        throw new Error(`Response Error: ${response.status}`);
      }
    } else if (error.request) {
      throw new Error("Request Error:", error.request);
    } else {
      throw new Error("General Error:", error.message);
    }
  }
);

export default axiosInstance;
