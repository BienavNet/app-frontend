import { View, Text } from "react-native";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import Checkbox from "expo-checkbox";

export const ListItemSelectHorario = ({
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
  const isDocente = selectedOption === "docente";
  const selectedId = !isDocente ? selectedData?.id : selectedData?.cedula;
  const dataId = !isDocente ? data.id : data.cedula;
  const isSelected = selectedId === dataId;
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
      />
      <View style={styles.itemInfo}>
        {selectedOption === "horario" ? (
          <Text style={styles.textinfo}>
            {truncateText(data.asignatura, 16)}
          </Text>
        ) : selectedOption === "docente" ? (
          <Text style={styles.textinfo}>
            {capitalizeFirstLetter(data.nombre)} {"-"}
            {capitalizeFirstLetter(data.apellido)}
          </Text>
        ) : (
          <Text style={styles.textinfo}>{data.Dia}</Text>
        )}
      </View>
    </View>
  );
};
