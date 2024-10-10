import { useAuth } from "./useAuth";
import { Redirect } from "expo-router";

export const userData = () => {
    //DETALLES DEL USUARIO LOGEADO
    const { user } = useAuth();
    if (!user) return <Redirect href="/" />;
    const NOMBRE = user?.nombre;
    const CEDULA = user?.cedula;
    const CORREO = user?.user;
    const ROL = user?.rol;
    const ID = user?.id;
    return { NOMBRE, CEDULA, CORREO, ROL , ID};
  };
  