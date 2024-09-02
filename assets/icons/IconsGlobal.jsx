import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorItem } from "../../components/styles/StylesGlobal";

// icono de home
export const IconHome = ({ color }) => {
  return <MaterialIcons name="home" size={24} color={color} />;
};


// ICONO de add button a registrar 
export const IconAddCircle = ({ color }) => {
  return <MaterialIcons name="add-circle" size={28} color={ColorItem.MediumGreen} />;
};
