import { TouchableOpacity } from "react-native";
import { ListDocente } from "./(list)/listDocente";
import { RegistrarDocente } from "./(registrar)/formregister";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../customStack";

export default function DocenteHome() {
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
      title: "Registrar Supervisor",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
}
