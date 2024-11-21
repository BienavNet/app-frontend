import * as yup from "yup";
import { status } from "../../../components/ui/(SUPERVISOR)/components/modal/status";

export const RegisterReportSchema = yup.object({
  comentario: yup
    .string()
    .required("El comentario debe tener un reporte")
    .max(250, "El comentario no puede tener mas de 250 caracteres"),
  estado: yup
    .string()
    .oneOf(status,"Debe seleccionar un estado valido")
    .required("Debe seleccionar una estado valido"),
});
