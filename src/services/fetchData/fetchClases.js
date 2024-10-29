import axiosInstance from "../axios";

export const registerClase = async (
  horario,
  salon,
  supervisor,
  estado,
  fecha
) => {
  try {
    const response = await axiosInstance.post("/clase/register", {
      horario,
      salon,
      supervisor,
      estado,
      fecha,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const getClasesOne = async (id) => {
  try {
    const response = await axiosInstance.get(`/clase/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

export const getClassesByHorarioID = async (id) => {
  try {
    const response = await axiosInstance.get(`/clase/timetable/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

export const getClasesAll = async () => {
  try {
    const response = await axiosInstance.get("/clase/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const DeleteClasesOne = async (id) => {
  try {
    const response = await axiosInstance.delete(`/clase/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateClase = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/clase/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la actualización"
    );
  }
};

// supervisor
export const getClaseSupervisor = async (cedula) => {
  try {
    const response = await axiosInstance.get(`/clase/supervisor/${cedula}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// supervisor, docente and director

export const getClaseSalonOne = async (salon) => {
  try {
    const response = await axiosInstance.get(`/clase/salon/${salon}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const getClaseHorarioOne = async (horario) => {
  try {
    const response = await axiosInstance.get(`/clase/horario/${horario}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getClaseSupervisorSalonHorarioDia = async (cedula, salon, dia, horario) => {
  try {
    const response = await axiosInstance.get(`/clase/supervisor/${cedula}/salon/${salon}/dia/${dia}/horario/${horario}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getClasesByDocentes = async (cedula) => {
  try {
    const response = await axiosInstance.get(`/clase/docente/${cedula}`)
    return response.data
  } catch (error) {
    console.log('No se pudo obtener los datos del metodo getClasesByDocentes: ', error)
    return undefined
  }
}
export const getfilterByAllDate = async (cedula) => {
  try {
    const response = await axiosInstance.get(`/clase/fechadocente/${cedula}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};