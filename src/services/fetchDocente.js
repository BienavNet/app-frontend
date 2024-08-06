import axiosInstance from "./axios";

export const registerDocente = async (nombre, apellido, cedula, correo, contrasena)  => {
try {
    const response = await axiosInstance.post('/api/docente/save', {
        nombre,
        apellido,
        cedula,
        correo,
        contrasena,
     });
     return response;
} catch (error) {
    throw new Error(error.response.data.message)
}
}

export const getDocenteAll = async () => {
    try {
        const response = await axiosInstance.get('/api/docente/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getDocenteOne = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/api/docente/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteDocenteOne = async (cedula) => {
    try {
        const response = await axiosInstance.delete(`/api/docente/delete/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateDocente = async (cedula, data) => {
    console.log('cedula updated', cedula, " data :", data);
    try {
        const response = await axiosInstance.patch(`/api/docente/update/${cedula}`, data);
        console.log('Respuesta del backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}