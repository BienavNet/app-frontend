import axiosInstance from "../axios";

// supervisor & director
export const registerReporte = async (clase, comentario) => {
  try {
    const response = await axiosInstance.post("/reporte/register", {
      clase,
      comentario,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getReportSupervisorID = async (id) => {
  try {
    const response = await axiosInstance.get(`/reporte/supervisor/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getReportSupervisorCedulaSalon = async (cedula, salon) => {
  try {
    const response = await axiosInstance.get(`/reporte/supervisor/${cedula}/salon/${salon}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const updateReportID = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/reporte/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

//director

export const getReportAll = async () => {
  try {
    const response = await axiosInstance.get("/reporte/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getReportClase2 = async (clase) => {
  try {
    const response = await axiosInstance.get(`/reporte/clase/${clase}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

export const getReportSalon2 = async (salon) => {
  try {
    const response = await axiosInstance.get(`/reporte/salon/${salon}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

export const deleteReportID = async (id) => {
  try {
    const response = await axiosInstance.delete(`/reporte/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// endpoints for reporting statistics
export const getDocenteQMasComentariosHaRealizado = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/docente-mas-comentarios"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getsalonMasComentarioTiene = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/salon-mas-comentarios"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getSalonMasUtilizado = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/salon-mas-utilizado"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getSalonMenosUtilizado = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/salon-menos-utilizado"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getCantidadDiaMasAsignado = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/cantidad-dias-asignado"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const getRangeHoursMasFrecuente = async () => {
  try {
    const response = await axiosInstance.get(
      "/reporte/statistics/hours-mas-frecuente"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
