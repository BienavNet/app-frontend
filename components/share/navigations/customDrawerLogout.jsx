import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuth } from "../../../src/hooks/useAuth";
import { DrawerItemList } from "@react-navigation/drawer";

export const CustomDrawerContent = (props) => {
    const { logout } = useAuth();
    console.log('logout', logout)
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
            onPress: () => {
            logout();
            },
          },
        ],
        { cancelable: true }
      );
    };
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <DrawerItemList {...props} />
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 5 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}
            color="red"
          >
            <Text style={styles.text}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "red",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });