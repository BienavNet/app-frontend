import { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import isEmpty from "lodash.isempty";
// import Feather from "@expo/vector-icons/Feather";
import { formatDuration, formatHourHHMMTime, getFutureDatesDisabled, timeHHMM } from "../../../../../src/utils/functiones/functions";
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
import { useFilterClassDiasCalendar } from "../../../../../src/hooks/customHooks";
import { userData } from "../../../../../src/hooks/use/userData";
import { Today } from "../../../../../src/utils/InstanceMoment";

const today = Today();
// console.log("Today", today + "  istype ", typeof today)
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays) {
  // const today = new Date();
  // const currentMonth = today.getMonth() // obtiene el mes actual
  // const pastDates = [];
  
  // for(let month= 0; month <currentMonth; month++) {
    
  // }
  // console.log("today new date: " + today)
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}
const useFetchDaysAll = () => {
  const { CEDULA } = userData();  
  const filtersDateAll = useFilterClassDiasCalendar(CEDULA); 
  const processedItems = filtersDateAll.map((item, index) => ({
    title: dates[0],
    data: [
      {
        subject:item.asignatura,
        hours: `${timeHHMM(item.fecha, item.hora_inicio)} - ${timeHHMM(item.fecha, item.hora_fin)}`,
        duration: formatDuration(item.hora_inicio, item.hora_fin),
        status:item.estado,
        title: `Clase ${index + 1}`,
        room:`${item.nombre_salon} - ${item.numero_salon}`,
        fecha:item.fecha,
          key: `${item.fecha}-${item.id || index}`
      },
    ],
  }));
  console.log(JSON.stringify(processedItems.title), "processedItems");
  return {processedItems};
};



// Obtener las fechas marcadas para el calendario
export function getMarkedDates(processedItems) {
  const marked = {};
  processedItems.forEach(item => {
    if (item.data && item.data[0].fecha) {
      const formattedDate = item.data[0].fecha.split('T')[0];
      console.log(formattedDate, "FechaFomatedad");

      if (formattedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        marked[formattedDate] = { marked: true };
      } else {
        console.warn("Formato de fecha incorrecto:", item.data[0].fecha);
      }
    } else {
      console.warn("La fecha no está definida para este elemento:", item);
    }
  });
  console.log(marked, "marked dates");
  return marked;
}

const CalendarListScreen = (props) => {
  const { processedItems } = useFetchDaysAll();
  const markedDates = useRef(getMarkedDates(processedItems))
  const { horizontalView } = props;
  const minDate = "2024-01-01";
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({ todayButtonTextColor: themeColor });
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);
  
  // const dayActually = Today();
  return (
    <CalendarProvider

      theme={todayBtnTheme.current}
      showTodayButton
      date="2024-10-25"
    >
      {horizontalView ? (
        <WeekCalendar
        testID="horinzontalWeekCalendar"
          minDate={minDate}
          maxDate="2025-01-01"
          firstDay={1}
          markedDates={markedDates}
        />
      ) : (
        <ExpandableCalendar
        testID="expandiblecalendarID"
          minDate={minDate}
          maxDate="2025-01-01"
          firstDay={1}
          theme={theme.current}
          markedDates={markedDates}
        />
      )}
      <AgendaList
        sections={processedItems}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};


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

// export const agendaItems = [
//   {
//     title: "dates[0]",
//     data: [
//       { hour: "12am", duration: "1h", title: "First Yoga" },
//       {
//         hour: "9am",
//         duration: "1h",
//         title: "Long Yoga",
//         itemCustomHeightType: "LongEvent",
//       },
//     ],
//   },
//   {
//     title: "dates[1]",
//     data: [
//       { hour: "4pm", duration: "1h", title: "Pilates ABC" },
//       { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
//     ],
//   },
// ];
// const CalendarListScreen = (props) => {
//   const [loading, setLoading] = useState(true); // estado de carga
//   const { horizontalView } = props;
//   const minDate = "2024-01-01";
//   const marked = useRef(getFutureDatesDisabled(minDate));
//   console.log(`markes ${marked} -- marked current ${marked.current}`);
//   // const marked = useRef(getMarkedDates());
//   const theme = useRef(getTheme()); // theme
//   const todayBtnTheme = useRef({ todayButtonTextColor: themeColor }); //stylos de un button

//   const renderItem = useCallback(({ item }) => {
//     return <AgendaItem item={item} />;
//   }, []);

//   useEffect(() => {
//     // Simulamos la carga de los datos necesarios
//     if (agendaItems && marked.current) {
//       // Si los datos de la agenda y las fechas marcadas están disponibles, dejamos de cargar
//       setLoading(false);
//     }
//   }, [agendaItems, marked.current]); // Reaccionar cuando estos elementos estén listos

//   if (loading) {
//     // Mientras se cargan los datos, mostramos el indicador de carga
//     return <Loading />;
//   }
//   return (
//     <CalendarProvider
//       theme={todayBtnTheme.current}
//       showTodayButton
//       date="2024-06-25" // Fecha actual seleccionada
//     >
//       {horizontalView ? (
//         <>
//           <WeekCalendar
//             minDate={minDate}
//             maxDate="2025-01-01"
//             testID="week_calendar_btn"
//             firstDay={1}
//             markedDates={marked.current}
//           />
//         </>
//       ) : (
//         <ExpandableCalendar
//           minDate={minDate}
//           maxDate="2025-01-01"
//           testID="expandable_calendar_btn"
//           leftArrowImageSource={iconLeft}
//           rightArrowImageSource={iconrigth}
//           firstDay={1}
//           theme={theme.current}
//           markedDates={marked}
//         />
//       )}
//       <AgendaList
//         sections={agendaItems}
//         renderItem={renderItem}
//         scrollToNextEvent
//         sectionStyle={styles.section}
//       />
//     </CalendarProvider>
//   );
// };

// const useFetchDaysAll = () => {
//   const [itemsFechaAll, setItemsFechaAll] = useState([]);
//   const { CEDULA } = userData();  // Obtener cédula
//   const filtersDateAll = useFilterClassDiasCalendar(CEDULA); // Uso del hook anterior
//   useEffect(() => {
//     if (filtersDateAll.length > 0) {
//       const processedItems = filtersDateAll.map((item, index) => ({
//         title:`${item.nombre_salon} - ${item.numero_salon}`,
//         data: [
//           {
//             subject:item.asignatura,
//             hours: `${timeHHMM(item.fecha, item.hora_inicio)} - ${timeHHMM(item.fecha, item.hora_fin)}`,
//             duration: formatDuration(item.hora_inicio, item.hora_fin),
//             status:item.estado,
//             title: `Clase ${index + 1}`,
//           },
//         ],
//       }));
//       setItemsFechaAll(processedItems);
//     }
//   }, [filtersDateAll]);
//   return { itemsFechaAll };
// };

// const {processedItems} = useFetchDaysAll();
  // // const [markedDates, setMarkedDates] = useState({});
  // const { horizontalView } = props;
  // const minDate = "2024-01-01";
  // const markedDates = useRef(getMarkedDates());
  // const theme = useRef(getTheme());
  // const todayBtnTheme = useRef({ todayButtonTextColor: themeColor });

  // // Usar el hook que obtiene y procesa los datos
  // // const { itemsFechaAll } = useFetchDaysAll();

  // // useEffect(() => {
  // //   // Verificar que los datos se han cargado correctamente
  // //   if (itemsFechaAll && itemsFechaAll.length > 0) {
  // //     const marked = getMarkedDates(itemsFechaAll);
  // //     setMarkedDates(marked);
  // //   }
  // // }, [itemsFechaAll]);

  // // Si hay un error al cargar los datos
  // // if (error) {
  // //   return <ErrorComponent message="Error al cargar los datos de la agenda" />;
  // // }

  // // // Si aún está cargando
  // // if (loading) {
  // //   return <Loading />;
  // // }

  // // Renderizar el ítem de la agenda de manera optimizada con useCallback
  // const renderItem = useCallback(({ item }) => {
  //   return <AgendaItem item={item} />;
  // }, []);