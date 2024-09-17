import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { useAuth } from "../../../../../src/hooks/useAuth";

export const CardInformationCuenta = () => {
  const { user } = useAuth();
  const NOMBRE = user.nombre;
  const Correo = user.user;
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
          {Correo}
        </Text>
      </View>
    </Card>
  );
};
