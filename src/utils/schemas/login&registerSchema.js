import * as yup from "yup";

//iniciar sesion Schema
export const loging = yup.object({
    contrasena: yup.string().required("Password es requerido").min(4).max(16),
    correo: yup
      .string()
      .email("Invalid email")
      .required("Correo Electronico es requerido")
      .min(4)
      .max(100),
    supervisor: yup.boolean(),
    docente: yup.boolean(),
    admin: yup.boolean(),
    rol: yup
    .string()
    .oneOf(['supervisor', 'docente', 'director'], 'Debe seleccionar una opción válida')
    .required('Debe seleccionar una opción')
  });


// registrar doncente Schmea
  export const register = yup.object().shape({
    nombre: yup
      .string()
      .lowercase()
      .required("Nombre es requerido")
      .min(3, {
        message: "debe ser mayo a 3 caracteres",
      })
      .max(30),
    apellido: yup
      .string()
      .lowercase()
      .required("Apellido es requerido")
      .min(3, {
        message: "debe ser mayo a 3 caracteres",
      })
      .max(30),
    constrasena: yup.string().required("Password es requerido").min(4).max(16),
    correo: yup
      .string()
      .email("Invalid email")
      .required("Correo Electronico es requerido")
      .min(4)
      .max(100),
    cedula: yup.string().required("Cedula es requerido").min(10).max(10),
  });