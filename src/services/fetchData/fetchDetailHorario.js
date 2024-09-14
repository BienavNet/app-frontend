import axiosInstance from "../axios";

export const registerDetailHorario= async (horario, dia, hora_inicio, hora_fin)  => {
try {
    const response = await axiosInstance.post('/horarios/detalles/save', {horario, dia, hora_inicio, hora_fin});
     return response;
} catch (error) {
    throw new Error(error.response.data.message)
}
}
export const getDetailHorarioOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/horarios/detalles/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}
export const getDetailHorarioByHorarioID = async (id) => {
    try {
        const response = await axiosInstance.get(`/horarios/detalles/timetable/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}
export const getDetailHorarioAll = async () => {
    try {
        const response = await axiosInstance.get('/horarios/detalles/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteDetailHorarioOne = async (id) => {
    try {
        const response = await axiosInstance.delete(`/horarios/detalles/delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateDetailHorario = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/horarios/detalles/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

// director and docente
export const getDetailHorarioDocente = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/horarios/detalles/docente/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getDetailHorario2 = async (horario) => {
    try {
        const response = await axiosInstance.get(`/horarios/detalles/horario/${horario}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}