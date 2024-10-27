import axiosInstance from "../axios";

export const registerHorario= async (docente, asignatura)  => {
try {
    const response = await axiosInstance.post('/horarios/save', {docente, asignatura});
     return response;
} catch (error) {
    throw new Error(error.response.data.message)
}
}
export const getHorarioOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/horarios/detail/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

export const getHorarioAll = async () => {
    try {
        const response = await axiosInstance.get('/horarios/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteHorarioOne = async (id) => {
    try {
        const response = await axiosInstance.delete(`/horarios/delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateHorario = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/horarios/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

// docente and director

export const getHorarioDocenteCedula = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/horarios/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
