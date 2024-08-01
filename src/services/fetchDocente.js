

const registerDocente = async ({nombre, apellido, cedula, correo, contrasena})  =>{

     await axiosInstance.post('/docentes', docente);
}