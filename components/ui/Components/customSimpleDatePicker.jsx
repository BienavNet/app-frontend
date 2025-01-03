import { useState, useMemo, useEffect } from "react";
import { TouchableWithoutFeedback, View, Text, ScrollView } from "react-native";
import { ColorItem, styles } from "../../styles/StylesGlobal";
import  moment, { Today } from "../../../src/utils/InstanceMoment";
import { ViewDatePicker } from "../(DIRECTOR)/horarios/component/viewDatePicker";
import { NotRegistrationDate } from "./unregistered/noRegistration";

export default function SimpleDatePicker({
  selectedDate,
  onDateChange,
  viewSelectDate,
}) {
  const today = Today();
  const [value, setValue] = useState(null);
  const formattedSelectedDates = useMemo(() => {return selectedDate.map((date) => moment(date))
  }, [selectedDate]); 

 //comparamos si today se encuentra en la lista
 const isTodayInSelectedDates = useMemo(() => {
  return formattedSelectedDates.some((formattedDate) =>
    today.isSame(formattedDate, 'day'))
 },[formattedSelectedDates, today]);
 
  useEffect(() => {
    if (isTodayInSelectedDates) {
      if (!today.isSame(value, 'day')) {
        setValue(today);
      }
    } else {
      setValue(today);
    }
  }, [isTodayInSelectedDates]);

  const weeks = useMemo(() => {
    if (!formattedSelectedDates || formattedSelectedDates.length === 0) return []; // Verificar que haya fechas
    const sortedDates = [...formattedSelectedDates].sort((a, b) => moment.utc(a).diff(moment.utc(b)));
    const daysMonth = sortedDates.map(dateStr => {
      const date = moment.utc(dateStr);  // Convertir cada string a un objeto moment en UTC
      return {
        dia: date.format('ddd'),  // Día de la semana en abreviatura
        fecha: date.toDate(),     // Fecha en formato Date
      };
    });
    return daysMonth;
  }, [formattedSelectedDates]);

  const handleDateChange = (newDate) => {
    setValue(moment(newDate));
    if (onDateChange) {
      onDateChange(newDate);
    }
  };
//   const today = Today();
//   const [value, setValue] = useState(null);
//   // const formattedSelectedDates = useMemo(() => {return selectedDate.map((date) => moment(date))}, [selectedDate]); 

//   const formattedSelectedDates = useMemo(() => {
//     // Asegura que selectedDate sea un array antes de usar .map()
//     if (!Array.isArray(selectedDate)) return [];
//     return selectedDate.map((date) => moment(date));
//   }, [selectedDate]);
//  //comparamos si today se encuentra en la lista
//  const isTodayInSelectedDates = useMemo(() => {
//   return formattedSelectedDates.some((formattedDate) =>
//     today.isSame(formattedDate, 'day'))
//  },[formattedSelectedDates, today]);
 
//   useEffect(() => {
//     if (isTodayInSelectedDates) {
//       if (!today.isSame(value, 'day')) {
//         setValue(today);
//       }
//     } else {
//       setValue(today);
//     }
//   }, [isTodayInSelectedDates]);
//   const weeks = useMemo(() => {
//     if (!formattedSelectedDates || formattedSelectedDates.length === 0) return [];
//     const sortedDates = [...formattedSelectedDates].sort((a, b) =>
//       moment.utc(a).diff(moment.utc(b))
//     );
//     return sortedDates.map((date) => ({
//       dia: date.format("ddd"),
//       fecha: date.toDate(),
//     }));
//   }, [formattedSelectedDates]);
//   // const weeks = useMemo(() => {
//   //   if (!formattedSelectedDates || formattedSelectedDates.length === 0) return []; // Verificar que haya fechas
//   //   const sortedDates = [...formattedSelectedDates].sort((a, b) => moment.utc(a).diff(moment.utc(b)));
//   //   const daysMonth = sortedDates.map(dateStr => {
//   //     const date = moment.utc(dateStr);  // Convertir cada string a un objeto moment en UTC
//   //     return {
//   //       dia: date.format('ddd'),  // Día de la semana en abreviatura
//   //       fecha: date.toDate(),     // Fecha en formato Date
//   //     };
//   //   });
//   //   return daysMonth;
//   // }, [formattedSelectedDates]);

//   const handleDateChange = (newDate) => {
//     console.log('handleDateChange', newDate);
//     setValue(moment(newDate));
//     if (onDateChange) {
//       onDateChange(newDate);
//     }
//   };

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", paddingRight: 15 }}
        >
          {weeks.map((item, dateIndex) => {
            const fecha = moment(item.fecha);
            const isActive = value && fecha.isSame(value, "day");

            return (
              <TouchableWithoutFeedback
                key={dateIndex}
                onPress={() => handleDateChange(item.fecha)} 
              >
                <View
                  style={[
                    styles.item,
                    {
                      backgroundColor: isActive
                        ? ColorItem.KellyGreen
                        : "transparent", // Verde si es activo
                      borderColor: isActive
                        ? ColorItem.KellyGreen
                        : "lightgray",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.itemWeekday,
                      { color: isActive ? "#fff" : "black" }, // Blanco si es activo
                    ]}
                  >
                    {item.dia}
                  </Text>
                  <Text
                    style={[
                      styles.itemDate,
                      { color: isActive ? "#fff" : "black" }, // Blanco si es activo
                    ]}
                  >
                    {fecha.date()} 
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 10,
        }}
      >
        <View style={styles.placeholder}>
          <View style={styles.placeholderInset}>
            {viewSelectDate ? (
              <ViewDatePicker viewSelectDate={viewSelectDate} />
            ) : (
              <NotRegistrationDate />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
