import { View, Text } from "react-native";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import Checkbox from "expo-checkbox";

const ListFilterReport = ({
  data,
  onPress,
  selectedOption,
  temporarySelection,
}) => {
  const isSelected = temporarySelection?.id === data.id;
  const handleCheckSelected = () => {
    const newValue = !isSelected;
    onPress(data, newValue);
  };
  return (
    <View style={styles.contenCheckbox}>
      <Checkbox
        style={{
          borderRadius: 50,
        }}
        value={isSelected}
        onValueChange={handleCheckSelected} // Maneja el cambio de selección
        tintColors={{ true: ColorItem.DeepFir, false: ColorItem.DeepFir }} // Colores personalizados
      />
      <View style={styles.itemInfo}>
        {/* {selectedOption === "salones" && ( */}
          <Text style={styles.textinfo}>
            {data.numero_salon} {"-"} {capitalizeFirstLetter(data.nombre)}
          </Text>
        {/* )} */}
      </View>
    </View>
  );
};

export default ListFilterReport;
