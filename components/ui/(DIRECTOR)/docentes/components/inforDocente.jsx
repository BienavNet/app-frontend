import { Text, StyleSheet, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const InfoDocente = ({ selectedItem }) => {
  return (
    <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
      <Text style={[styles.Title1]}>Nombre y apellido</Text>
      <Text style={[styles.text]}>
        {capitalizeFirstLetter(selectedItem.nombre)}{" "}
        {capitalizeFirstLetter(selectedItem.apellido)}
      </Text>
      <Text style={[styles.Title1]}>Cédula</Text>
      <Text style={[styles.text]}> {selectedItem.cedula}</Text>
      <Text style={[styles.Title1]}>Correo</Text>
      <Text style={[styles.text]}>{selectedItem.correo}</Text>
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
});
