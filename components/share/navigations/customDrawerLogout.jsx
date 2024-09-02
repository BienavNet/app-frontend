import { Alert, Text, TouchableOpacity, View, StyleSheet, ImageBackground } from "react-native";
import { useAuth } from "../../../src/hooks/useAuth";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Divider } from "@rneui/base";
import { ColorItem } from "../../styles/StylesGlobal";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ButtonLogin = ({title = "Cerrar Sesión", onPress}) =>{
  return(
    <View style={{ flex: 1, justifyContent: "flex-end"}}>
    <Divider width={2}/>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
         <View className="flex-row items-center justify-around">
         <SimpleLineIcons
          name="logout"
          size={25}
          color={ColorItem.DeepFir}
        />
        <Text style={styles.text}>{title}</Text>
         </View>
      </TouchableOpacity>
    </View>
  )
}

const DrawerContent = ({user}) => {
  return(
    <ImageBackground style={{padding:20}}
    source={require('../../../assets/img/fondoazulmobil.jpg')}>
    <Text style={{fontSize:18, color: "#FFFFFF",}}>
    {user.nombre}{" "}{user.apellido}
    </Text>
    <Text style={{fontSize:18, color: "#FFFFFF",}}>
    {user.user}
    </Text>
    </ImageBackground>
  )
}

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
      <DrawerContentScrollView {...props}>
      <DrawerContent user={user}/>
      <DrawerItemList {...props} />
      </DrawerContentScrollView>
     <ButtonLogin onPress={handleLogout}/> 
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical:10,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    marginRight:50,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: ColorItem.DeepFir,
  },
});
