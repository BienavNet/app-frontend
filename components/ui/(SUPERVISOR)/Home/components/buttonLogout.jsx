import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity , Alert} from "react-native";
import { useAuth } from "../../../../../src/hooks/useAuth";

export const ButtonLogoutS = () => {
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
              console.error("Error durante el cierre de sesión:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <SimpleLineIcons
        name="logout"
        size={22}
        color="white"
        style={{
          marginHorizontal: 25,
        }}
      />
    </TouchableOpacity>
  );
};
