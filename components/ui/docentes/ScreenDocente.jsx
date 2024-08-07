import {TouchableOpacity } from "react-native";
import { ListDocente } from "./(list)/listDocente";
import { RegistrarDocente } from "./(registrar)/formregister";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomStack from "../customStack";

export default function IndexDocente() {
  const screens = [
    {
      name: "ListScreen",
      component: ListDocente,
      title: "Lista",
      headerRight: (navigation) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("FormScreen")}
          style={{
            marginRight: 10,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "#ffffff",
          }}
        >
          <MaterialIcons name="add-circle" size={28} color="#ffffff" />
        </TouchableOpacity>
      ),
    },
    {
      name: "FormScreen",
      component: RegistrarDocente,
      title: "Registrar Docente",
    },
  ];
  return (
    <CustomStack initialRouteName="ListScreen" screens={screens} />
    // <Stack.Navigator initialRouteName="ListScreen">
    //   <Stack.Screen
    //     name="ListScreen"
    //     component={ListDocente}
    //     options={({ navigation }) => ({
    //       title: "Lista",
    //       headerStyle: {
    //         backgroundColor: "#3111F3",
    //       },
    //       headerTitleStyle: {
    //         color: "#ffffff",
    //       },
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate("FormScreen")}
    //           style={{
    //             marginRight: 10,
    //             borderRadius:40,
    //             borderWidth:1,
    //             borderColor:"#ffffff"
    //           }}
    //         >
    //          <MaterialIcons name="add-circle" size={28} color="#ffffff" />
    //         </TouchableOpacity>
    //       ),
    //     })}
    //   />
    //   <Stack.Screen
    //     name="FormScreen"
    //     component={RegistrarDocente}
    //     options={{
    //       title: "Create a teacher",
    //       headerStyle: {
    //         backgroundColor: "#3111F3",
    //       },
    //       headerTintColor: "#fff",

    //       headerTitleStyle: {
    //         color: "#ffffff",
    //       },
    //     }}
    //   />
    // </Stack.Navigator>
  );
}
