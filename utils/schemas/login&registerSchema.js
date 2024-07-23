import * as yup from "yup";

export const login = yup.object({
    password: yup.string().required("Password es requerido").min(4).max(16),
    email: yup
      .string()
      .email("Invalid email")
      .required("Correo Electronico es requerido")
      .min(4)
      .max(100),
    cedula: yup.string().min(10).max(10),
    supervisor: yup.boolean(),
    docente: yup.boolean(),
    admin: yup.boolean(),
    checkebox: yup
    .string()
    .oneOf(['supervisor', 'docente', 'admin'], 'Debe seleccionar una opción válida')
    .required('Debe seleccionar una opción')
  });


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
    username: yup.string().required("Username es requerido"),
    password: yup.string().required("Password es requerido").min(4).max(16),
    email: yup
      .string()
      .email("Invalid email")
      .required("Correo Electronico es requerido")
      .min(4)
      .max(100),
    cedula: yup.string().required("Cedula es requerido").min(10).max(10),
  });