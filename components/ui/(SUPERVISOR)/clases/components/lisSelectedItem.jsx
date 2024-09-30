import { View, Text } from "react-native"
import { capitalizeFirstLetter, truncateText } from "../../../../../src/utils/functiones/functions";
import { styles } from "../../../../styles/StylesGlobal";

const ListSelectItemFilterClases = ({ data, onPress, selectedOption }) => {
  return (
    <View style={styles.itemInfo}>
    {selectedOption === "salones" && (
      <Text style={styles.textinfo}>
        {data.numero_salon} {"-"} {capitalizeFirstLetter(truncateText(data.nombre,15))}
      </Text>
    )}
      {selectedOption === "horarios" && (
      <Text style={styles.textinfo}>
      {capitalizeFirstLetter(data.nombre)} {capitalizeFirstLetter(data.apellido)} {"-"} {data.asignatura}
      </Text>
    )}
      {selectedOption === "dia" && (
      <Text style={[styles.textinfo]}>
        {data.Dia}
      </Text>
    )}
      {selectedOption === "supervisor" && (
      <Text style={styles.textinfo}>
        {data.nombre} {"-"} {capitalizeFirstLetter(data.apellido)}
      </Text>
    )}
  </View>
    // <TouchableOpacity onPress={onPress} style={styles.item}>
     
    // </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   // item: {
//   //   flexDirection: "row",
//   //   marginLeft: 20,
//   //   marginRight: 20,
//   //   borderBottomWidth: 1,
//   //   borderBottomColor: ColorItem.DeepFir,
//   //   paddingTop: 15,
//   //   paddingBottom: 15,
//   // },
// });

export default ListSelectItemFilterClases;