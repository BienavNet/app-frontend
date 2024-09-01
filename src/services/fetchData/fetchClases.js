import axiosInstance from "../axios";

export const registerClase = async (horario, salon, supervisor, estado, fecha)  => {
    console.log("horario ", horario, " salon ", salon, " supervisor ", supervisor, " estado ", estado, " fecha ", fecha);

try {
    const response = await axiosInstance.post('/clase/register', {
        horario,
        salon,
        supervisor,
        estado,
        fecha,
     });
     return response.data;
} catch (error) {
    throw new Error(error.response.data.message)
}
}
export const getClasesOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/clase/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

export const getClassesByHorarioID = async (id) => {
    try {
        const response = await axiosInstance.get(`/clase/timetable/${id}`);
        return response.data;
    } catch (error) {
      
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

export const getClasesAll = async () => {
    try {
        const response = await axiosInstance.get('/clase/');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteClasesOne = async (id) => {
    console.log('delete clases ID: ', id)
    try {
        const response = await axiosInstance.delete(`/clase/delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const updateClase = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/clase/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error en la actualización:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Error en la actualización')
    }
}

// supervisor and director

export const getClaseSupervisor = async (cedula) => {
    try {
        const response = await axiosInstance.get(`/clase/supervisor/${cedula}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

// supervisor, docente and director

export const getClaseSalonOne = async (salon) => {
    try {
        const response = await axiosInstance.get(`/clase/salon/${salon}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
export const getClaseHorarioOne = async (horario) => {
    try {
        const response = await axiosInstance.get(`/clase/horario/${horario}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}