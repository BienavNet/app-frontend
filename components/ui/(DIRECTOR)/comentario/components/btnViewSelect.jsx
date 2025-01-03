import { TouchableOpacity, Text} from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const BtnViewSelect = ({item}) => {
  return (
    <TouchableOpacity className="flex-row">
      <Text className="font-extrabold text-lg">
        {capitalizeFirstLetter(item.nombre)}
        {" - "}
        {item.numero_salon}
        {" - "} {item.salon_nombre}
      </Text>
    </TouchableOpacity>
  );
};
