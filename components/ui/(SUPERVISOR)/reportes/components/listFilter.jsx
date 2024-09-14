import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { ColorItem } from "../../../../styles/StylesGlobal";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

const ListFilterReport = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.itemInfo}>
        {selectedOption === "salones" && (
          <Text style={styles.itemP1}>
            {data.numero_salon} {"-"} {capitalizeFirstLetter(data.nombre)}
          </Text>
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

export default ListFilterReport;