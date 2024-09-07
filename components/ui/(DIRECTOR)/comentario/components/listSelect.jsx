import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";

export const ListSelectItem = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.itemInfo}>
        {selectedOption === "docente" && (
          <Text style={styles.itemP2}>
            {capitalizeFirstLetter(data.nombre)}{" "}
            {capitalizeFirstLetter(data.apellido)}
          </Text>
        )}
        {selectedOption === "salon" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Text style={styles.itemP2}>
              {data.numero_salon} {"-"} {truncateText(data.nombre, 13)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorItem.DeepFir,
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemInfo: {
    marginLeft: 20,
  },
  itemP1: {
    fontSize: 16,
    color: "black",
  },
  itemP2: {
    fontSize: 18,
    color: "black",
  },
});
