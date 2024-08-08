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

// registrar doncente, supervisor (Schema)
export const register = yup.object().shape({
  nombre: yup.string().lowercase().required("Nombre es requerido").min(3, {
      message: "debe ser mayo a 3 caracteres",
    }).max(30).matches(/^[A-Za-z]+$/, "Nombre no es válido"),
  apellido: yup.string().lowercase().required("Apellido es requerido").min(3, {
      message: "debe ser mayo a 3 caracteres",
    }).max(30).matches(/^[A-Za-z]+$/, "Apellido no es válido"),
  contrasena: yup.string().required("Password es requerido").min(4).max(16).matches(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,16}$/, "Debe incluir mayúscula, minúscula, número y símbolo"),
  correo: yup.string().email("Invalid email").required("Correo Electronico es requerido").min(4).max(100),
  cedula: yup.number().required("Cedula es requerido").integer("Cédula debe ser un número entero").typeError(/^\d{8}$|^\d{10}$/, "Cédula debe ser un número").test(
    'length',
    'Cédula debe tener 8 o 10 dígitos',
    value => value && (value.toString().length === 8 || value.toString().length === 10)
  ),
});

// update doncente, supervisor (Schema)
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
