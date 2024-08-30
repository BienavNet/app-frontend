import { Alert, Text, TouchableOpacity, View, StyleSheet, ImageBackground } from "react-native";
import { useAuth } from "../../../src/hooks/useAuth";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Divider } from "@rneui/base";
export const CustomDrawerContent = (props) => {
  const { logout, user } = useAuth();
  console.log("logout", logout);
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
              Alert.alert("Cerrando sesión......... Nos vemos pronto 👋")
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}
      contentContainerStyle={{
        // backgroundColor: "red",
        // paddingHorizontal: 16,
        // paddingVertical: 24,
        // paddingBottom: 32,
        // borderBottomWidth: 1,
        // borderBottomColor: "#E5E5E5",
      }}
      >
      <ImageBackground
      style={{
        padding:20
      }}
      source={require('../../../assets/img/fondoazulmobil.jpg')}
      >
     
      <Text style={{
        fontSize:18,
        color: "#FFFFFF",
      }}>{user.nombre}{" "}{user.apellido}</Text>
         <Text style={{
        fontSize:18,
        color: "#FFFFFF",
      }}>{user.user}</Text>
      </ImageBackground>
      <DrawerItemList {...props} />
      
      </DrawerContentScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 5 }}>
      <Divider width={2}/>
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
