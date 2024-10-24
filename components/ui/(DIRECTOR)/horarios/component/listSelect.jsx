import { TouchableOpacity, View, Text } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { stylesHorariosDirector } from "./styles";


export const ListItemSelectHorario = ({ data, onPress, selectedOption }) => {
  console.log("data: " + data);
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
          <Text style={stylesHorariosDirector.itemP2}>
            {truncateText(data.asignatura, 16)}
          </Text>
        )}
        {selectedOption === "dia" && (
          <Text style={stylesHorariosDirector.itemP2}>
            {data.dia}
            mundo
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
