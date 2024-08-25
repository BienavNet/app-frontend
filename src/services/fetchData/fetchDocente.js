import axiosInstance from "../axios";

export const registerDocente = async (nombre, apellido, cedula, correo, contrasena)  => {

console.log("registes desde endpoint", nombre, apellido, cedula, correo, contrasena);
    try {
    const response = await axiosInstance.post('/docente/save', {
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
        const response = await axiosInstance.get('/docente/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getDocenteOne = async (cedula) => {
    console.log('getDocente entra', cedula);
    try {
        const response = await axiosInstance.get(`/docente/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteDocenteOne = async (cedula) => {
    console.log('deleteDocente entra', cedula);
    try {
        const response = await axiosInstance.delete(`/docente/delete/${cedula}`);
        console.log('deleteDocente RESPONSE DELETE', response);
        console.log('deleteDocente RESPONSE DATA DELETE', response.data);
        return response.data;
    } catch (error) {
        console.log('ERROR', error);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

export const updateDocente = async (cedula, data) => {
    try {
        const response = await axiosInstance.patch(`/docente/update/${cedula}`, data);
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}