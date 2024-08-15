import * as yup from "yup";

// registar comentarios
export const registerComentario = yup.object({
  comentario: yup
    .string()
    .required("El Comentario es obligatorio")
    .min(5, "El Comentario debe tener al menos 5 caracteres"),
  docente: yup
    .number()
    .required("El docente es obligatorio")
    .typeError("Docente debe ser válido")
    .integer("Docente debe ser valido"),
  salon: yup
    .number()
    .typeError("Salon debe ser válido")
    .required("El Salon es obligatorio")
    .integer("Salon debe ser valido"),
});
