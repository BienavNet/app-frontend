import * as yup from "yup";

const status = ["completada", "perdida", "pendiente"];

export const RegisterReportSchema = yup.object({
  comentario: yup
    .string()
    .required("El comentario debe tener un reporte")
    .max(250, "El comentario no puede tener mas de 250 caracteres"),
  // estado: yup
  //   .string()
  //   .oneOf(status, "Debe seleccionar una opción válida")
  //   .required("Debe seleccionar una opción"),
});
