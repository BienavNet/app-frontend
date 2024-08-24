import { Text } from "react-native";
import { capitalizeFirstLetter, truncateText } from "../../../../../src/utils/functiones/functions";

export const ViewHorario = ({ item }) => {
  return (
    <>
      <Text className="font-extrabold text-lg">
        {capitalizeFirstLetter(item.nombre)}{" "}
        {capitalizeFirstLetter(item.apellido)}
        {" - "}
      </Text>
      <Text className="font-extrabold text-lg">
        {item.asignatura
          ? truncateText(item.asignatura)
          : "Asignatura no disponible"}
      </Text>
    </>
  );
};
