import { TouchableOpacity } from "react-native";
import { ListSupervisor } from "./list";
import { RegistrarSupervisor } from "./register";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexSupervisor =() =>{
  const screens = [
    {
      name: "ListScreen",
      component: ListSupervisor,
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
      component: RegistrarSupervisor,
      title: "Registrar Supervisor",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
}
