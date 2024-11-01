import { Agenda } from "react-native-calendars";
import { useCallback } from "react";
import { userData } from "../../../../../src/hooks/use/userData";
import { useClaseDocentes } from "../../../../../src/hooks/customHooks";
import {
  formatDuration,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";
import AgendaItem from "./AgendaCalendar/AgendaItem";
export function loadCalendarItems(CEDULA) {
  const data = useClaseDocentes(CEDULA);
  let aux = {};
  for (item of data) {
    const dateFixed = item.fecha.substring(0, 10);
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
            salon:item.salon_id,
            docente:item.id_docente,
            clase:item.clase_id
          },
        ],
      },
    ];
  }
  return aux;
}

const CalendarListScreen = () => {
  const { CEDULA, ID } = userData();
  const items = loadCalendarItems(CEDULA);
  const _renderItem = useCallback((item) => {
    return <AgendaItem item={item} />;
  }, []);
  return (

      <Agenda
        items={items}
        renderItem={_renderItem}
        showClosingKnob={true}
        pastScrollRange={50}
        futureScrollRange={50}
      />
  );
};

export default CalendarListScreen;
