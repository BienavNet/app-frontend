import * as yup from "yup";
export const RegisterReportSchema = yup.object({
  comentario: yup
    .string()
    .required("El comentario debe tener un reporte")
    .max(250, "El comentario no puede tener mas de 250 caracteres"),
});
