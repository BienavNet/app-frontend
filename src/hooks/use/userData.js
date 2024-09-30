import { useAuth } from "./useAuth";

export const userData = () => {
    //DETALLES DEL USUARIO LOGEADO
    const { user } = useAuth();
    const NOMBRE = user?.nombre;
    const CEDULA = user?.cedula;
    const CORREO = user?.user;
    const ROL = user?.rol;
    const ID = user?.id;
    return { NOMBRE, CEDULA, CORREO, ROL , ID};
  };
  