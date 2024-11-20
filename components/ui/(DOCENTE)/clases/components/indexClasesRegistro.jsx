import { useCallback } from "react";
import { userData } from "../../../../../src/hooks/use/userData";
import AgendaItem from "./AgendaCalendar/AgendaItem";
import { AgendaCalendar } from "../../../Components/agenda/agenda";
import { loadCalendarItems } from "../../../Components/agenda/data/tranformaData";
import { useClaseDocentes } from "../../../../../src/hooks/customHooks";
import { getmarkedDates } from "../../../Components/agenda/data/markesData";

export const Clasesregistro = () => {
  const { CEDULA } = userData();
  const data = useClaseDocentes(CEDULA);
  const ITEMS = loadCalendarItems(data);
  const markedDates = getmarkedDates(ITEMS)

  const _renderItem = useCallback(item => {
    return <AgendaItem item={item} />;
  }, []);

  return (
      <AgendaCalendar 
      markedDates={markedDates}
      items={ITEMS} 
      render={_renderItem}
       />
  );
};
