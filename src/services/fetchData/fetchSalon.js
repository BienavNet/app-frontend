import axiosInstance from "../axios";

export const getCategorySalon = async () => {
    try {
        const response = await axiosInstance.get("/salon/categoria-salon/salon");
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

export const getSalon = async () => {
    try {
        const response = await axiosInstance.get(`/salon/`);
        return response.data;

    } catch (error) {
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
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}