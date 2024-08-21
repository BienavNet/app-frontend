import * as yup from "yup";
import asignaturas from "../../../components/ui/(DIRECTOR)/horarios/json/asignaturas.json";

const asignaturList = asignaturas.map((a) => a.asignatura);
// registar un salon
export const horarioRegisterSchema = yup.object({
  docente: yup
    .number()
    .typeError("Docente debe ser válido")
    .required("El docente es obligatorio")
    .integer("Docente debe ser valido"),
  asignatura: yup
    .string()
    .oneOf(asignaturList, "Debe seleccionar una asignatura válida")
    .required("Debe seleccionar una opción"),
});

/// schemas para detalle horario

export const diasArray = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

// export const Status = ["Pendiente", "Completada", "Cancelada"]; //perdida

export const detailHorarioRegister = yup.object({
  // horario: yup
  //   .number()
  //   .typeError("Horario debe ser válido")
  //   .required("El Horario es obligatorio")
  //   .integer("Horario debe ser valido"),
  salon: yup
    .number()
    .typeError("Salon debe ser válido")
    .required("El Salon es obligatorio")
    .integer("Salon debe ser valido"),
  dia: yup
    .string()
    .oneOf(diasArray, "El día seleccionado no es válido")
    .required("El día es obligatorio"),
  hora_inicio: yup
    .string()
    .required("La hora de inicio es obligatoria")
    .matches(/^\d{2}:\d{2}$/, "La hora de inicio debe tener el formato HH:mm"),
  hora_fin: yup
    .string()
    .required("La hora de fin es obligatoria")
    .matches(/^\d{2}:\d{2}$/, "La hora de fin debe tener el formato HH:mm")
    .test(
      "is-warnignClock",
      "La hora de fin debe ser mayor que la hora de inicio",
      function (value) {
        const { hora_inicio } = this.parent;
        return hora_inicio && value && value > hora_inicio;
      }
    ),
  // schema de las clases
  // supervisor: yup
  //   .number()
  //   .typeError("Supervisor debe ser válido")
  //   .required("El supervisor es obligatorio")
  //   .integer("Supervisor debe ser valido"),
  // estado: yup
  //   .string()
  //   .oneOf(Status, "Debe seleccionar una opción válida")
  //   .required("Debe seleccionar una opción"),
  // fecha: yup
  //   .date()
  //   .required("La fecha es obligatoria")
  //   .min(new Date(), "La fecha no puede ser en el pasado")
  //   .typeError("Fecha inválida"),
});