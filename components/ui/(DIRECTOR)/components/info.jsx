import { Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { styles } from "../../../styles/StylesGlobal";

export const InfoDS = ({ selectedItem }) => {
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