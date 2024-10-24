import { View, Text } from "react-native";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import Checkbox from "expo-checkbox";

const ListSelectItemFilterClases = ({
  data,
  onPress,
  selectedOption,
  multipleSelectedItems,
  temporalSelectedItem,
}) => {
  let selectedData;
  if (temporalSelectedItem[selectedOption]) {
    selectedData = temporalSelectedItem[selectedOption];
  } else if (multipleSelectedItems[selectedOption]) {
    selectedData = multipleSelectedItems[selectedOption];
  }

  const isSelected = selectedData?.id === data.id;

  const handleCheckSelected = () => {
    const newValue = !isSelected;
    if (newValue) {
      onPress(data, true);
    } else {
      onPress(data, false);
    }
  };

  return (
    <View style={styles.contenCheckbox}>
      <Checkbox
        tintColors={{ true: ColorItem.DeepFir, false: ColorItem.DeepFir }}
        style={{
          borderRadius: 50,
        }}
        value={isSelected}
        onValueChange={handleCheckSelected}
        // color={isSelected ? "#4630EB" : undefined}
      />
      <View style={styles.itemInfo}>
        {selectedOption === "horarios" ? (
          <Text style={styles.textinfo}>
            {data.nombre} {" - "} {data.apellido}
          </Text>
        ) : selectedOption === "salones" ? (
          <Text style={styles.textinfo}>
            {data.numero_salon} {" - "} {data.nombre}
          </Text>
        ) : (
          <Text style={styles.textinfo}>{data.Dia}</Text>
        )}
      </View>
    </View>
  );
};
export default ListSelectItemFilterClases;
