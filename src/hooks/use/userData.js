import { useAuth } from "./useAuth";
import { Redirect } from "expo-router";

export const userData = () => {
    //DETALLES DEL USUARIO LOGEADO
    const { user, isAuthenticated, isInitialized } = useAuth();
    if (!user) return <Redirect href="/" />;
    const NOMBRE = user?.nombre;
    const CEDULA = user?.cedula;
    const CORREO = user?.user;
    const ROL = user?.rol;
    const ID = user?.id;
    const INITIALIZE = isInitialized;
    const ISAUTENTICATED = isAuthenticated;
    return { NOMBRE, CEDULA, CORREO, ROL , ID, INITIALIZE, ISAUTENTICATED};
  };
  