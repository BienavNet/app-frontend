import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../services/axios";

export const setSession = async (accessToken = null) => {
  console.log(accessToken, "access token");
  if (accessToken) {
    const setitemjtw = await AsyncStorage.setItem("access_token", accessToken);
    console.log(setitemjtw, "setitemjtw");
    const valueaxiosBearer = axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
   console.log(valueaxiosBearer, "valueaxiosBearer");
  } else {
    const redi = await AsyncStorage.removeItem("access_token");
    console.log(redi, "redi");
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log(valueaxiosBearer, "valueaxiosBearer");
  }

  // if (refreshToken) {
  //   AsyncStorage.setItem("refresh_token", refreshToken);
  // }
};

export const resetSession = async () => {
 await AsyncStorage.removeItem("access_token");
  // AsyncStorage.removeItem("refresh_token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
