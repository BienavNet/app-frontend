import { getAllRelevantDates } from "./usedDates";
import { useClaseDocentes } from "../../../../../src/hooks/customHooks";
import {
  DatesYYYYMMDD,
  formatDuration,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";

// uso para admin
export function transformData (selectedDate) {
  console.log(selectedDate , "selectedDate transformdata")
  const items = {};
  const allDates = getAllRelevantDates();
  selectedDate.horarios.forEach((horario) => {
    const datekey = DatesYYYYMMDD(horario.fecha);
    if (allDates.includes(datekey)) {
      if (!items[datekey]) {
        items[datekey] = [];
      }

      items[datekey].push({
        keyunica: datekey,
        categoria: horario.categoria,
        numero_salon: horario.numero_salon,
        capacidad: horario.capacidad,
        dia: horario.dia,
        hora_fin: horario.hora_fin,
        hora_inicio: horario.hora_inicio,
        estado: horario.estado,
        INTernet: horario.INTernet,
        tv: horario.tv,
      });
    }
  });

  allDates.forEach((date) => {
    if (!items[date]) {
      items[date] = [];
    }
  });
  console.log(items, " responde items: ")
  return items;
};

// uso para docente
export function loadCalendarItems(CEDULA) {
  const data = useClaseDocentes(CEDULA);
  const allDates = getAllRelevantDates();
  let aux = {};
  for (item of data) {
    const dateFixed = DatesYYYYMMDD(item.fecha);
    aux[dateFixed] = [
      {
        data: [
          {
            subject: item.asignatura,
            hours: `${formatTimeTo12Hour(
              item.hora_inicio
            )} - ${formatTimeTo12Hour(item.hora_fin)}`,
            duration: formatDuration(item.hora_inicio, item.hora_fin),
            room: item.numero_salon,
            salon: item.salon_id,
            docente: item.id_docente,
            clase: item.clase_id,
          },
        ],
      },
    ];
  }
  return aux;
}
