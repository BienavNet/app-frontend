import { ListItem } from "@react-native-material/core";
import { Alert, View } from "react-native";
import { useAuth } from "../../../../../src/hooks/useAuth";
import { TouchableOpacity } from "react-native-gesture-handler";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ColorItem } from "../../../../styles/StylesGlobal";
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
        paddingHorizontal: 16,
        paddingVertical: 5,
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
        }}
        onPress={handleLogout}
      >
        <ListItem
          title="Cerrar Sesión"
          leading={
            <SimpleLineIcons
              name="logout"
              size={22}
              color={ColorItem.DeepFir}
            />
          }
        />
      </TouchableOpacity>
    </View>
  );
};
