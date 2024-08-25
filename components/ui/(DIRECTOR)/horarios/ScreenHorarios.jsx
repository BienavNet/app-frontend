import { TouchableOpacity } from "react-native";
import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexHorario = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListHorario,
      title: "Listado",
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
      component: RegisterHorario,
      title: "Registrar Clase",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
