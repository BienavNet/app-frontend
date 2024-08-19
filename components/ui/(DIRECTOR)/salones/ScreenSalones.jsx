import { TouchableOpacity } from "react-native";
import {ListSalones} from "./list";
import {UpdateSalon} from "./update";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomStack from "../../Components/customStack";

export const IndexSalones = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSalones,
      title: "Listado",
      // headerRight: (navigation) => (
      //   <TouchableOpacity
      //     onPress={() => navigation.navigate("FormScreen")}
      //     style={{
      //       marginRight: 10,
      //       borderRadius: 40,
      //       borderWidth: 1,
      //       borderColor: "#ffffff",
      //     }}
      //   >
      //     <MaterialIcons name="add-circle" size={28} color="#ffffff" />
      //   </TouchableOpacity>
      // ),
    },
    {
      name: "FormScreen",
      component: UpdateSalon,
      title: "Actualizar Salon",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
}
