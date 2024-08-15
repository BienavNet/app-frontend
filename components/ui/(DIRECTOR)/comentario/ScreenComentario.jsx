import { TouchableOpacity } from "react-native";
import {ListComentario} from "./list";
import {RegisterComentario} from "./register";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexComentario = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListComentario,
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
      component: RegisterComentario,
      title: "Registrar Comentario",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
}
