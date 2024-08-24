import { Text, StyleSheet, View } from "react-native";
import { formatHourHHMMAMPM } from "../../../../../src/utils/functiones/functions";
import { Divider } from "@rneui/themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const ViewDatePicker = ({ viewSelectDate }) => {
  return (
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
          <Text style={[styles.text]}>{viewSelectDate.numero_salon}</Text>
        </View>
        <Divider orientation="vertical" width={1} />
        <View style={{ width: "50%" }}>
          <Text style={[styles.Title1]}>Capacidad</Text>
          <Text style={[styles.text]}>{viewSelectDate.capacidad}</Text>
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
          <Text style={[styles.text]}>{viewSelectDate.categoria}</Text>
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
  );
};

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
});
