import { View, Text} from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { styles } from "../../../../styles/StylesGlobal";

export const CComentario = ({selectedItem}) => {
  return (
    <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
      <View>
        <Text style={[styles.Title1]}>Docente</Text>
        <Text style={[styles.text]}>
          {capitalizeFirstLetter(selectedItem?.nombre)}{" "}
          {capitalizeFirstLetter(selectedItem?.apellido)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Salon</Text>
        <Text style={[styles.text]}>
          {selectedItem?.numero_salon}
          {" - "}
          {capitalizeFirstLetter(selectedItem?.salon_nombre)}
        </Text>
      </View>
      <View>
        <Text style={[styles.Title1]}>Comentario</Text>
        <Text style={[styles.comentario]}>
          {capitalizeFirstLetter(selectedItem?.comentario)}
        </Text>
      </View>
    </View>
  );
};
