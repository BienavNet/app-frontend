import axiosInstance from "../axios";

// doncente & director
export const registerComentario = async (comentario, docente, salon) => {
  try {
    const response = await axiosInstance.post("/comentarios/register", {
      comentario,
      docente,
      salon,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getComentarioDocenteDocente = async (cedula) => {
  try {
    const response = await axiosInstance.get(`/comentarios/docente/${cedula}`);
    console.log(response,  "getComentarioDocenteDocente");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteComentarioDocente = async (cedula) => {
  try {
    const response = await axiosInstance.delete(
      `/comentarios/delete/docente/${cedula}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
//director
export const getComentarioOne = async (id) => {
  try {
    const response = await axiosInstance.get(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};
export const getComentarioSalonOne = async (salon) => {
  try {
    const response = await axiosInstance.get(`/comentarios/salon/${salon}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};
export const getComentarioDocenteSalon = async (cedula, salon) => {
  try {
    const response = await axiosInstance.get(
      `/comentarios/docente/${cedula}/salon/${salon}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

// ✅
export const getComentarioAll = async () => {
  try {
    const response = await axiosInstance.get("/comentarios/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const DeleteComentarioOne = async (id) => {
  try {
    const response = await axiosInstance.delete(`/comentarios/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
