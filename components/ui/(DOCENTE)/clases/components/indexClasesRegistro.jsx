import { View } from "react-native";
import { useCallback } from "react";
import { userData } from "../../../../../src/hooks/use/userData";
import AgendaItem from "./AgendaCalendar/AgendaItem";
import { AgendaCalendar } from "../../../Components/agenda/agenda";
import { loadCalendarItems } from "../../../Components/agenda/data/tranformaData";

export const Clasesregistro = () => {
  const { CEDULA, ID } = userData();
  const items = loadCalendarItems(CEDULA);

  const _renderItem = useCallback((item) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AgendaCalendar items={items} render={_renderItem} />;
    </View>
  );
};
