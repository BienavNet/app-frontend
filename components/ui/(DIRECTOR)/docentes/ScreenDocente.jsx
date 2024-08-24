import { TouchableOpacity } from "react-native";
import { ListDocente } from "./listDocente";
import { RegistrarDocente } from "./register";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexDocente = () => {
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
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
