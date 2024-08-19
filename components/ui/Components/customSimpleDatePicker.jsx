import React, { useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import { formatHourHHMMAMPM } from "../../../src/utils/functiones/functions";
import { Divider } from "@rneui/themed";
const { width } = Dimensions.get("window");
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SimpleDatePicker({
  selectedDate,
  onDateChange,
  viewSelectDate,
}) {
  console.log("viewSelectDate --------", viewSelectDate);
  console.log("selected date: " + selectedDate);
  console.log("selected date.length: " + selectedDate.length);
  console.log("selected date: type " + typeof selectedDate);

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
    // <SafeAreaView>
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
              <View style={styles.details}>
                <Text style={[styles.Title1]}>Horas Concedidas</Text>
                <View style={styles.vertical}>
                  <Text style={[styles.text]}>
                    {formatHourHHMMAMPM(viewSelectDate.hora_inicio)}
                  </Text>
                  <Divider orientation="vertical" width={5} />
                  <Text style={[styles.text]}>
                    {formatHourHHMMAMPM(viewSelectDate.hora_fin)}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.Title1]}># Salon</Text>
                    <Text style={[styles.text]}>
                      {viewSelectDate.numero_salon}
                    </Text>
                  </View>
                  <Divider orientation="vertical" width={1} />
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.Title1]}>Capacidad</Text>
                    <Text style={[styles.text]}>
                      {viewSelectDate.capacidad}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.Title1]}>Conectividad digital</Text>
                <View style={styles.vertical}>
                  {viewSelectDate.INTernet === "si" ? (
                    <MaterialIcons name="wifi" size={24} color="black" />
                  ) : (
                    <MaterialIcons name="wifi-off" size={24} color="black" />
                  )}
                  <Text style={[styles.text]}>{viewSelectDate.INTernet}</Text>
                  <Divider orientation="vertical" width={5} />
                  {viewSelectDate.tv === "si" ? (
                    <Ionicons name="tv-sharp" size={24} color="black" />
                  ) : (
                    <MaterialIcons name="tv-off" size={24} color="black" />
                  )}
                  <Text style={[styles.text]}>{viewSelectDate.tv}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.Title1]}>Categoría</Text>
                    <Text style={[styles.text]}>
                      {viewSelectDate.categoria}
                    </Text>
                  </View>
                  <Divider orientation="vertical" width={1} />
                  <View style={{ width: "50%" }}>
                    <Text style={[styles.Title11]}>Estado</Text>
                    <Text
                      style={[
                        styles.text1,
                        {
                          borderBottomRightRadius: 8,
                          color: "white",
                          fontWeight: "900",
                          backgroundColor: `${
                            viewSelectDate.estado === "pendiente"
                              ? "orange"
                              : viewSelectDate.estado === "completada"
                              ? "green"
                              : "red"
                          }`,
                        },
                      ]}
                    >
                      {viewSelectDate.estado}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  borderRadius:8,
                  backgroundColor: "#ea2a3b",
                  color: "white",
                  paddingVertical: 25,
                }}>
                  No hay información disponible para la fecha seleccionada
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Title1: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#1371C3",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 6,
  },
  Title11: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#1371C3",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "medium",
  },
  text1: {
    textAlign: "center",
    padding: 8,
    fontSize: 16,
    fontWeight: "medium",
  },
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
