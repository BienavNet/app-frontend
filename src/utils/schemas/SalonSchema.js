import * as yup from "yup";

const SN = ["si", "no"];
// update a room
export const updateSalonSchema = yup.object({
  nombre: yup
    .string()
    .required("Debe seleccionar una opción")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  numero_salon: yup
    .number()
    .typeError("El numero del salon debe ser válido")
    .required("Numero salon es obligatorio")
    .integer("El numero debe ser valido"),
  capacidad: yup
    .number()
    .typeError("La capacidad debe ser un número válido")
    .required("La capacidad es obligatoria")
    .integer("La capacidad debe ser válida")
    .min(1, "La capacidad debe ser al menos 1")
    .max(60, "La capacidad no puede exceder 60"),
  INTernet: yup
    .string()
    .oneOf(SN, "Debe seleccionar si o no para Internet")
    .required("Debe seleccionar si o no para Internet"),
  tv: yup
    .string()
    .oneOf(SN, "Debe seleccionar si o no para TV")
    .required("Debe seleccionar si o no para TV"),
});
