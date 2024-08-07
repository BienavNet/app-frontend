import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../services/axios";

export const setSession = async (accessToken = null) => {
  console.log(accessToken, "access token");
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
  await AsyncStorage.removeItem("access_token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
