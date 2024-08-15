import { TouchableOpacity } from "react-native";
import {ListDetailHorario} from "./list";
import {RegisterDetailHorario} from "./register";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexDetailHorarios = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListDetailHorario,
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
      component: RegisterDetailHorario,
      title: "Registrar Detalle Horario",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
}
