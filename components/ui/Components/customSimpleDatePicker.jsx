import { useState, useRef, useMemo } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from "react-native";
import {ColorItem, styles} from "../../styles/StylesGlobal"


import moment from "moment";
import "moment/locale/es"
import Swiper from "react-native-swiper";
import { NotRegistrationDate } from "../../share/noRegistration";
import { ViewDatePicker } from "../(DIRECTOR)/horarios/component/viewDatePicker";

// Configuracion moment para usar español 'es'
moment.locale('es');
export default function SimpleDatePicker({
  selectedDate,
  onDateChange,
  viewSelectDate,
}) {
  console.log("onDateChange", onDateChange)
  console.log("selectDatePicker", selectedDate)
  console.log("selectDatePicker selectedDate[0]", selectedDate[0])
  const swiper = useRef();
  const [value, setValue] = useState(selectedDate[0]);
  
  console.log(" set value", value);
  const [week, setWeek] = useState(0);
  console.log(" set week", week);
  const weeks = useMemo(() => {
    const month = moment(value).month(); // Obtener el mes de la fecha seleccionada
    const year = moment(value).year(); // Obtener el año de la fecha seleccionada
    const day = moment(value).day();
    const start = moment([year, month]).startOf("month"); // establece la fecha de inicio del mes
    console.log("start - ", start);
    const startDay = start.day();
    const diff = (day - startDay + 7) % 7; //calcula el primer dia deseado
    start.add(diff, "days");
    const mondays = [];
    while (start.month() === month) {
      mondays.push({
        dia: start.format("ddd"), // Día de la semana en abreviatura (Mon, Tue, etc.)
        fecha: start.toDate(), // Fecha en formato Date
      });
      start.add(1, "week"); // Avanzar una semana
    }
    return mondays;
  }, [week, value]);

  const handleDateChange = (newDate) => {
    console.log("emtro");
    console.log("onchange newDate", newDate);
    setValue(newDate);
    if (onDateChange) {
      onDateChange(newDate);
      console.log("  onDateChange(newDate);", onDateChange(newDate));
      console.log("onchange newDate", newDate);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) return;
            setWeek(week + (ind - 1)); //week
            setValue(
              moment(value)
                .add(ind - 1, "weeks")
                .toDate()
            ); //fecha
            swiper.current.scrollTo(1, false); //índice central
          }}
        >
          {[-1, 0, 1].map((offset) => (
            <View style={styles.itemRow} key={offset}>
              {weeks.map((item, dateIndex) => {
                const isActive =
                  value.toDateString() === item.fecha.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => handleDateChange(item.fecha)}
                  >
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: ColorItem.KellyGreen,
                          borderColor: ColorItem.KellyGreen,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {item.dia}
                      </Text>
                      <Text
                        style={[styles.itemDate, isActive && { color: "#fff" }]}
                      >
                       {moment(item.fecha).locale('es').date()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
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

