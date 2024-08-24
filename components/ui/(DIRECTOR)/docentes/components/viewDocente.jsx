import { Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";

export const ViewDocente = ({ item }) => {
  return (
    <>
      <Text className="font-extrabold text-lg">
        {capitalizeFirstLetter(item.nombre)}{" "}
      </Text>
      <Text className="font-extrabold text-lg">
        {capitalizeFirstLetter(item.apellido)}
      </Text>
    </>
  );
};
