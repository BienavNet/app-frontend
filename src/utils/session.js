import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../services/axios";

export const setSession = (accessToken = null) => {
  if (accessToken) {
    AsyncStorage.setItem("access_token", accessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    AsyncStorage.removeItem("access_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  // if (refreshToken) {
  //   AsyncStorage.setItem("refresh_token", refreshToken);
  // }
};

export const resetSession = () => {
  AsyncStorage.removeItem("access_token");
  // AsyncStorage.removeItem("refresh_token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
