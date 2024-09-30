import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { userData } from "../../../../../src/hooks/use/userData";

export const CardInformationCuenta = () => {
  const { NOMBRE, CORREO } = userData();

  return (
    <Card>
      <Card.Title>Informacion de la cuenta</Card.Title>
      <Card.Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {capitalizeFirstLetter(NOMBRE)}
        </Text>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {CORREO}
        </Text>
      </View>
    </Card>
  );
};
