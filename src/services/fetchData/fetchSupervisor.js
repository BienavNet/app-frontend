import axiosInstance from "../axios";

export const registerSupervisor = async (nombre, apellido, cedula, correo, contrasena)  => {
try {
    const response = await axiosInstance.post('/api/supervisor/save', {
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

export const getSupervisor = async () => {
    try {
        const response = await axiosInstance.get('/api/supervisor/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const getSupervisorOne = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/api/supervisor/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const deleteSupervisorOne = async (cedula) => {
    try {
        const response = await axiosInstance.delete(`/api/supervisor/delete/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateSupervisor = async (cedula, data) => {
    try {
        const response = await axiosInstance.patch(`/api/supervisor/update/${cedula}`, data);
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}