import { Text, StyleSheet, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const InfoHorario = ({ selectedItem }) => {
  return (
    <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
      <View>
        <Text style={[styles.Title1]}>Asignatura Asignada</Text>
        <Text style={[styles.asignatura]}>
          {capitalizeFirstLetter(selectedItem.asignatura)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Docente</Text>
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem?.nombre)}{" "}
          {capitalizeFirstLetter(selectedItem?.apellido)}
        </Text>
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
  text: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 5,
  },
  asignatura: {
    fontSize: 16,
    fontWeight: "medium",
    padding: 5,
    marginBottom: 5,
  },
});
