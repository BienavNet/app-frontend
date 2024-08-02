import axiosInstance from "./axios";


export const registerDocente = async (nombre, apellido, cedula, correo, contrasena)  => {
    console.log("Datos para registro docente", {nombre, apellido, cedula, correo, contrasena});

try {
    const response = await axiosInstance.post('/api/docente/save', {
        nombre,
        apellido,
        cedula,
        correo,
        contrasena,
     });
     console.log(response,"response");
    return response
} catch (error) {
    throw new Error(error.response.data.message)
}
}