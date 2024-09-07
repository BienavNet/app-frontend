import axiosInstance from "../axios";

export const registerNotification = async (mensaje, de, para) => {
  try {
    const response = await axiosInstance.post("/notificaciones/guardar", {
      mensaje,
      de,
      para,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getNotificationCedulaEstado = async (cedula, estado) => {
  console.log("cedula del loegado en notification", cedula, "estado filtrado o optional", estado)
  try {
    const response = await axiosInstance.get(`/notificaciones/obtener/${cedula}/${estado}`);
    console.log("response", response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error(error.response?.data?.message || "Unknown error");
  }
};

export const getNotificationAll = async () => {
  try {
    const response = await axiosInstance.get(`/notificaciones/}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

export const updateNotificationId = async (id, estado) => {
  try {
    const response = await axiosInstance.patch(`/notificaciones/${id}`, {estado});
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};
