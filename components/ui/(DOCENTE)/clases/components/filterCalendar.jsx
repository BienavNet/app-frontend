import { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import isEmpty from "lodash.isempty";
// import Feather from "@expo/vector-icons/Feather";
import {getFutureDatesDisabled} from "../../../../../src/utils/functiones/functions"
const iconLeft = require("../../../../../assets/png/previous.png");
const iconrigth = require("../../../../../assets/png/nextt.png");

import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from "react-native-calendars";
// import { ColorItem } from "../../../../styles/StylesGlobal";
import AgendaItem from "./AgendaCalendar/AgendaItem";
import { getTheme, themeColor, lightThemeColor } from "./AgendaCalendar/theme";
import Loading from "../../../../share/loading";

export function getMarkedDates() {
  const marked = {};

  agendaItems.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}
// function getFutureDates(numberOfDays) {
//   const array = [];
//   for (let index = 1; index <= numberOfDays; index++) {
//     let d = Date.now();
//     if (index > 8) {
//       // set dates on the next month
//       const newMonth = new Date(d).getMonth() + 1;
//       d = new Date(d).setMonth(newMonth);
//     }
//     const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
//     const dateString = date.toISOString().split("T")[0];
//     array.push(dateString);
//   }
//   return array;
// }
// Obtener fechas deshabilitadas (futuras) y habilitadas (pasadas)

// const RANGE = 6;
// const fastDate = getPastDate(3);
// const futureDates = getFutureDates(12);
// const today = new Date().toISOString().split("T")[0]; // obtenemos la fecha actual pasandola a string
// console.log(today, "today");
// const dates = [fastDate, today].concat(RANGE);

// function getPastDate(numberOfDays) {
//   return new Date(Date.now() - 864e5 * numberOfDays)
//     .toISOString()
//     .split("T")[0];
// }

export const agendaItems = [
  {
    title: "dates[0]",
    data: [
      { hour: "12am", duration: "1h", title: "First Yoga" },
      {
        hour: "9am",
        duration: "1h",
        title: "Long Yoga",
        itemCustomHeightType: "LongEvent",
      },
    ],
  },
  {
    title: "dates[1]",
    data: [
      { hour: "4pm", duration: "1h", title: "Pilates ABC" },
      { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
    ],
  },
]
//   {
//     title: dates[2],
//     data: [
//       { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
//       { hour: "2pm", duration: "1h", title: "Deep Stretches" },
//       { hour: "3pm", duration: "1h", title: "Private Yoga" },
//     ],
//   },
//   {
//     title: dates[3],
//     data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
//   },
//   {
//     title: dates[4],
//     data: [{}],
//   },
//   {
//     title: dates[5],
//     data: [
//       { hour: "9pm", duration: "1h", title: "Middle Yoga" },
//       { hour: "10pm", duration: "1h", title: "Ashtanga" },
//       { hour: "11pm", duration: "1h", title: "TRX" },
//       { hour: "12pm", duration: "1h", title: "Running Group" },
//     ],
//   },
//   {
//     title: dates[6],
//     data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
//   },
//   {
//     title: dates[7],
//     data: [{}],
//   },
//   {
//     title: dates[8],
//     data: [
//       { hour: "9pm", duration: "1h", title: "Pilates Reformer" },
//       { hour: "10pm", duration: "1h", title: "Ashtanga" },
//       { hour: "11pm", duration: "1h", title: "TRX" },
//       { hour: "12pm", duration: "1h", title: "Running Group" },
//     ],
//   },
//   {
//     title: dates[9],
//     data: [
//       { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
//       { hour: "2pm", duration: "1h", title: "Deep Stretches" },
//       { hour: "3pm", duration: "1h", title: "Private Yoga" },
//     ],
//   },
//   {
//     title: dates[10],
//     data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
//   },
//   {
//     title: dates[11],
//     data: [
//       { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
//       { hour: "2pm", duration: "1h", title: "Deep Stretches" },
//       { hour: "3pm", duration: "1h", title: "Private Yoga" },
//     ],
//   },
//   {
//     title: dates[12],
//     data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
//   },
//   {
//     title: dates[13],
//     data: [{ hour: "12am", duration: "1h", title: "Last Yoga" }],
//   },
// ];

const CalendarListScreen = (props) => {
  const [loading, setLoading] = useState(true); // estado de carga
  const { horizontalView } = props;
  const minDate = "2024-01-01"
  const marked = useRef(getFutureDatesDisabled(minDate));
  console.log(`markes ${marked} -- marked current ${marked.current}`)
  // const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme()); // theme
  const todayBtnTheme = useRef({todayButtonTextColor: themeColor}); //stylos de un button

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  useEffect(() => {
    // Simulamos la carga de los datos necesarios
    if (agendaItems && marked.current) {
      // Si los datos de la agenda y las fechas marcadas están disponibles, dejamos de cargar
      setLoading(false);
    }
  }, [agendaItems, marked.current]); // Reaccionar cuando estos elementos estén listos

  if (loading) {
    // Mientras se cargan los datos, mostramos el indicador de carga
    return <Loading />;
  }
  return (
    <CalendarProvider
      theme={todayBtnTheme.current}
      showTodayButton
      date="2024-06-25" // Fecha actual seleccionada
    >
      {horizontalView ? (
        <>
          <WeekCalendar
            minDate={minDate}
            maxDate="2025-01-01"
            testID="week_calendar_btn"
            firstDay={1}
            markedDates={marked.current}
          />
        </>
      ) : (
        <ExpandableCalendar
          minDate={minDate}
          maxDate="2025-01-01"
          testID="expandable_calendar_btn"
          leftArrowImageSource={iconLeft}
          rightArrowImageSource={iconrigth}
          firstDay={1}
          theme={theme.current}
          markedDates={marked}
        />
      )}
      <AgendaList
        sections={agendaItems}
        renderItem={renderItem}
        scrollToNextEvent
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

// const theme = {
//   stylesheet: {
//     calendar: {
//       header: {
//         dayHeader: {
//           fontWeight: "600",
//           color: ColorItem.Luigi,
//         },
//       },
//     },
//   },
//   "stylesheet.day.basic": {
//     today: {
//       borderColor: ColorItem.Luigi,
//       borderWidth: 0.8,
//     },
//     todayText: {
//       color: ColorItem.GreenSymphony,
//       fontWeight: "800",
//     },
//   },
// };

// function renderCustomHeader(date) {
//   if (!date) {
//     console.log("ntro");
//     return null;
//   }
//   console.log("data", date);
//   const header = new Date(date).toString("MMMM yyyy");
//   const [month, year] = header.split(" ");
//   const textStyle = {
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingTop: 10,
//     paddingBottom: 10,
//     color: "#5E60CE",
//     paddingRight: 5,
//   };

//   return (
//     <View style={styles.header}>
//       <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
//       <Text style={[styles.year, textStyle]}>{year}</Text>
//     </View>
//   );
// }

export default CalendarListScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: "red",
    color: "grey",
    textTransform: "capitalize",
  },
});
