import * as yup from "yup";

export const Status = ["Pendiente", "Completada", "Cancelada"]; //perdida

// registar un salon
export const registerClaseSchema = yup.object({
  supervisor: yup
    .number()
    .typeError("Supervisor debe ser válido")
    .required("El supervisor es obligatorio")
    .integer("Supervisor debe ser valido"),
  salon: yup
    .number()
    .typeError("Salon debe ser válido")
    .required("El salon es obligatorio")
    .integer("Salon debe ser valido"),
  estado: yup
    .string()
    .oneOf(Status, "Debe seleccionar una opción válida")
    .required("Debe seleccionar una opción"),
  fecha: yup
    .date()
    .required("La fecha es obligatoria")
    .min(new Date(), "La fecha no puede ser en el pasado")
    .typeError("Fecha inválida"),
  horario: yup
    .number()
    .typeError("Horario debe ser válido")
    .required("El Horario es obligatorio")
    .integer("Horario debe ser valido"),
});
