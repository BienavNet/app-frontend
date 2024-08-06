import * as yup from "yup";

//iniciar sesion Schema para All
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
    .oneOf(
      ["supervisor", "docente", "director"],
      "Debe seleccionar una opción válida"
    )
    .required("Debe seleccionar una opción"),
});

// registrar doncente Schema
export const register = yup.object().shape({
  nombre: yup.string().lowercase().required("Nombre es requerido").min(3, {
      message: "debe ser mayo a 3 caracteres",
    }).max(30).matches(/^[A-Za-z]+$/, "Nombre no es válido"),
  apellido: yup.string().lowercase().required("Apellido es requerido").min(3, {
      message: "debe ser mayo a 3 caracteres",
    }).max(30).matches(/^[A-Za-z]+$/, "Apellido no es válido"),
  contrasena: yup.string().required("Password es requerido").min(4).max(16),
  correo: yup.string().email("Invalid email").required("Correo Electronico es requerido").min(4).max(100),
  cedula: yup.number().typeError("Cédula debe ser un número").required("Cedula es requerido").integer("Cédula debe ser un número entero").min(8, "Cédula debe tener 8 dígitos").max(10, "Cédula debe tener 10 dígitos"),
});

// update doncente Schema
export const update = yup.object().shape({
  nombre: yup.string().lowercase().required("Nombre es requerido")
    .min(3, "Nombre debe ser mínimo 3 caracteres")
    .matches(/^[A-Za-z]+$/, "Nombre no es válido"),
  apellido: yup.string()
    .required("Apellido es requerido")
    .min(3, "Apellido debe ser mínimo 3 caracteres")
    .matches(/^[A-Za-z]+$/, "Apellido no es válido"),
  correo: yup.string().email("Invalid email").required("Correo Electronico es requerido").min(4).max(100),
});
