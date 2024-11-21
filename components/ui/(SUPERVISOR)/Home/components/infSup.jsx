import { View, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { useSupervisorCedula } from "../../../../../src/hooks/customHooks";
import { userData } from "../../../../../src/hooks/use/userData";

export const InfoSup = () => {
  const { CEDULA } = userData();
  const datasupervisor = useSupervisorCedula(CEDULA);
  return datasupervisor.map((item) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }} 
      key={item.id}
    >
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          {capitalizeFirstLetter(item.nombre)}{" "}
          {capitalizeFirstLetter(item.apellido)}
        </Text>
    </View>
  ));
};
