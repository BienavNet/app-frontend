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
    try {
        const response = await axiosInstance.patch(`/horarios/${id}`);
        console.log(response.data, "return de los data de horario por one");
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

export const getHorarioAll = async () => {
    try {
        const response = await axiosInstance.get('/horarios/');
        console.log("response get horario", response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteHorarioOne = async (id) => {
    console.log("id delete horario one", id)
    try {
        const response = await axiosInstance.delete(`/horarios/delete/${id}`);
        console.log(response, "response deleted successfully")
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
