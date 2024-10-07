import { TouchableOpacity, View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { DateChip } from "./components/DateChip";
import { styles } from "../../../styles/StylesGlobal";

const ListItem = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionItem}>
      <View style={styles.itemInfo}>
        {selectedOption === "salones" && (
          <Text className="text-black text-lg text-left py-2">
            {data.numero_salon} {"-"} {capitalizeFirstLetter(data.nombre)}
          </Text>
        )}
        {selectedOption === "clases" && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text className="text-black text-lg text-left py-2">
                {truncateText(data.asignatura, 15)} {"-"} {data.numero_salon}
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <DateChip item={new Date(data.fecha).toLocaleDateString()} />
              </View>
            </View>
            <Text className="text-black text-lg text-left py-2">
              {capitalizeFirstLetter(data.docente_nombre)}{" "}
              {capitalizeFirstLetter(data.docente_apellido)}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ListItem;
