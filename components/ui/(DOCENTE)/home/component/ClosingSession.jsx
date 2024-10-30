import { Alert, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { useAuth } from "../../../../../src/hooks/use/useAuth";
export const LogoutSession = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Confirmación de Cierre de Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              Alert.alert("Cerrando sesión......... Nos vemos pronto 👋");
              await logout();
            } catch (error) {
              throw Error("Error durante el cierre de sesión:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: ColorItem.TarnishedSilver,
      }}
    >
      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            flexDirection: "row",
            padding: 12,
            justifyContent: "center",
          }}
        >
          <SimpleLineIcons name="logout" size={22} color={ColorItem.DeepFir} />
          <Text
            style={{
              fontSize: 18,
              color: ColorItem.DeepFir,
              marginHorizontal: 10,
            }}
          >
            Cerrar Sesión
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
