import { TouchableOpacity } from "react-native";
import { ListComentario } from "./list";
// import { RegisterComentario } from "./register";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomStack from "../../Components/customStack";
import { ColorItem } from "../../../styles/StylesGlobal";

export const IndexComentario = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListComentario,
      title: "Listado",
      headerRight: (navigation) => (
        <TouchableOpacity
          onPress={() =>console.log("onpress")}
          style={{ marginRight: 20 }}
        >
          <FontAwesome5 name="sliders-h" size={30} color={ColorItem.MediumGreen} />
        </TouchableOpacity>
      ),
    },
    // {
    //   name: "FormScreen",
    //   component: RegisterComentario,
    //   title: "Actualizar Comentario",+
    // },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
