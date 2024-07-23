import axiosInstance from "../services/axios";

export const setSession = (accessToken, refreshToken = null) => {
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("access_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }

  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
};

export const resetSession = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
