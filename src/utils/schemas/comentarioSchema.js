import * as yup from "yup";

// registar comentarios
export const _registerComentario = yup.object({
  comentario: yup
    .string()
    .required("El Comentario es obligatorio")
    .min(5, "El Comentario debe tener al menos 5 caracteres"),
});
