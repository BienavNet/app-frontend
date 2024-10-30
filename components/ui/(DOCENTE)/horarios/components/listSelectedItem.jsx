import { View, Text } from "react-native";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import Checkbox from "expo-checkbox";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";

const ListSelectItemDocenteHorario = ({
  data,
  onPress,
  selectedOption,
  multipleSelectedItems,
  temporalSelectedItem,
}) => {
  console.log("ListSelectItemDocenteHorario", data);
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
      />
      <View style={styles.itemInfo}>
        {selectedOption === "horarios" ? (
          <Text style={styles.textinfo}>
            {data.numero_salon} {" - "} {data.asignatura}
          </Text>
        ) : (
          <Text style={styles.textinfo}>{data.Dia}</Text>
        )}
      </View>
    </View>
  );
};
export default ListSelectItemDocenteHorario;
