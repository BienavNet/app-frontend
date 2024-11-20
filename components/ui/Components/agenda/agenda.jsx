import { Agenda, LocaleConfig } from "react-native-calendars";
import { RenderEmptyDate } from "../unregistered/noRegistration";
import testIDs from "../../(DIRECTOR)/horarios/component/testIDs";
import { ColorItem } from "../../../styles/StylesGlobal";
import { Text } from "react-native";
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
};
LocaleConfig.defaultLocale = "es";

export const AgendaCalendar = ({
  items,
  markedDates,
  selectedDay = undefined,
  render,
}) => {
  
  if (!items || Object.keys(items).length === 0) {
    return <Text>No classes available</Text>;
  }

  return (
    <Agenda
      markedDates={markedDates}
      markingType="dot"
      items={items}
      theme={{
        agendaKnobColor: ColorItem.DeepSkyBlue,
        textSectionTitleColor: "#000",
        todayTextColor: "#ffffff",
        selectedDayTextColor: "white",
        todayBackgroundColor: ColorItem.Luigi,
        dayTextColor: {
          gray: "gray",
        },
      }}
      keyExtractor={(item, index) => `ID-${item.keyunica}-DATA-${index}`}
      renderEmptyDate={RenderEmptyDate}
      testID={testIDs.agenda.CONTAINER}
      selected={selectedDay}
      renderItem={render}
      showClosingKnob={true}
      pastScrollRange={50}
      futureScrollRange={50}
      minDate="2024-01-01"
    />
  );
};