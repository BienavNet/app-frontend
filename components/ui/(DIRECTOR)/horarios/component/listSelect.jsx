import { TouchableOpacity, View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { stylesHorariosDirector } from "./styles";
export const ListItemSelectHorario = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={stylesHorariosDirector.item}>
      <View style={stylesHorariosDirector.itemInfo}>
        {selectedOption === "docente" && (
          <Text style={stylesHorariosDirector.itemP1}>
            {capitalizeFirstLetter(data.nombre)} {"-"}{" "}
            {capitalizeFirstLetter(data.apellido)}
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
              <Text style={stylesHorariosDirector.itemP2}>
                {truncateText(data.asignatura, 14)} {"-"} {data.numero_salon}
              </Text>
              <DateChip item={new Date(data.fecha).toLocaleDateString()} />
            </View>
            <Text style={stylesHorariosDirector.itemP1}>
              {capitalizeFirstLetter(data.docente_nombre)}{" "}
              {capitalizeFirstLetter(data.docente_apellido)}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};