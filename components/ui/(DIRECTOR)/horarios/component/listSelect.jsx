import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { capitalizeFirstLetter, truncateText } from "../../../../../src/utils/functiones/functions";


export const ListItemSelectHorario = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.itemInfo}>
        {selectedOption === "docente" && (
          <Text style={styles.itemP1}>
            {capitalizeFirstLetter(data.nombre)} {"-"} {capitalizeFirstLetter(data.apellido)}
          </Text>
        )}
        {selectedOption === "horario" && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <Text style={styles.itemP2}>
                {truncateText(data.asignatura, 14)} {"-"} {data.numero_salon}
              </Text>
              <DateChip 
             item={new Date(data.fecha).toLocaleDateString()}
              />
            </View>
            <Text style={styles.itemP1}>
              {capitalizeFirstLetter(data.docente_nombre)}{" "}
              {capitalizeFirstLetter(data.docente_apellido)}
            </Text>
          </>
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
