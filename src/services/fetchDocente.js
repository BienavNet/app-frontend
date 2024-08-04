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
    console.log(cedula, "cedula")
    try {
        const response = await axiosInstance.get(`/api/docente/${cedula}`);
        console.log(response, "response de data por cedula ")
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