import axiosInstance from "../axios";

export const registerHorario= async (docente, asignatura)  => {
    console.log("entrando --->" + " docente: ", docente + " asignatura: ", asignatura);
try {
    const response = await axiosInstance.post('/horarios/save', {docente, asignatura});
     return response;
} catch (error) {
    throw new Error(error.response.data.message)
}
}
export const getHorarioOne = async (id) => {
    console.log('id que entra para traer', id)
    try {
        const response = await axiosInstance.get(`/horarios/detail/${id}`);
        console.log(JSON.stringify(response.data, null, 2), "return de los data de horario por one ");
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
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
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

// docente and director

export const getHorarioDocente = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/horarios/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
