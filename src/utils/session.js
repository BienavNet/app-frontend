import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../services/axios";

export const setSession = async (accessToken = null) => {
  if (accessToken) {
    await AsyncStorage.setItem("access_token", accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    await AsyncStorage.removeItem("access_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const resetSession = async () => {
  const rresult = await AsyncStorage.removeItem("access_token");
  console.log(rresult, "Access token null")
  delete axiosInstance.defaults.headers.common["Authorization"];
};
