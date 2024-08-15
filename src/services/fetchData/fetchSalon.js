import axiosInstance from "../axios";

export const getSalon = async () => {
    try {
        const response = await axiosInstance.get(`/salon/`);
        console.log('response', response.data)
        return response.data;
    } catch (error) {
        // console.log('error', error.response.data.message)
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}
export const getSalonOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/salon/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateSalon = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/salon/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}