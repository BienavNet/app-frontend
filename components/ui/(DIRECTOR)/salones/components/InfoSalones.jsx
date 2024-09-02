import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { styles } from "../../../../styles/StylesGlobal";
export const InfoSalones = ({ selectedItem }) => {
  return (
    <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
      <Text style={[styles.Title1]}>Nombre Salon</Text>
      <Text style={[styles.text]}>{capitalizeFirstLetter(selectedItem.nombre)}</Text>
      <Text style={[styles.Title1]}> # Salon</Text>
      <Text style={[styles.text]}>{selectedItem.numero_salon}</Text>
      <Text style={[styles.Title1]}>Conectividad digital</Text>
      <View style={styles.vertical}>
        {selectedItem.INTernet === "si" ? (
          <MaterialIcons name="wifi" size={24} color="black" />
        ) : (
          <MaterialIcons name="wifi-off" size={24} color="black" />
        )}
        <Text style={[styles.text]}>{capitalizeFirstLetter(selectedItem.INTernet)}</Text>
        <Divider orientation="vertical" width={5} /> 
        {selectedItem.tv === "si" ? (
          <Ionicons name="tv-sharp" size={24} color="black" />
        ) : (
          <MaterialIcons name="tv-off" size={24} color="black" />
        )}
        <Text style={[styles.text]}>{capitalizeFirstLetter(selectedItem.tv)}</Text>
      </View>
      <Text style={[styles.Title1]}>Categoría</Text>
      <Text style={[styles.text]}>{capitalizeFirstLetter(selectedItem.categoria)}</Text>
    </View>
  );
};