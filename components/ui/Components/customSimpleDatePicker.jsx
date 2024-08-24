import React, { useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import { NotRegistrationDate } from "../../share/noRegistration";
import { ViewDatePicker } from "../(DIRECTOR)/horarios/component/viewDatePicker";

export default function SimpleDatePicker({
  selectedDate,
  onDateChange,
  viewSelectDate,
}) {
  const swiper = useRef();
  const [value, setValue] = useState(
    selectedDate.length > 0 ? selectedDate[0] : new Date()
  );
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
                          backgroundColor: "#1371C3",
                          borderColor: "#1371C3",
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
                        {moment(item.fecha).date()}
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // paddingHorizontal: 12,
    overflow: "hidden",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    height: "100%",
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
