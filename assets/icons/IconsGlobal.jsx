import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorItem } from "../../components/styles/StylesGlobal";
import { FontAwesome, MaterialCommunityIcons, AntDesign} from "@expo/vector-icons";

// icono de home
export const IconHome = ({ color }) => {
  return <MaterialIcons name="home" size={24} color={color} />;
};

// icono registrar 
export const IconAddCircle = () => {
  return <MaterialIcons name="add-circle" size={28} color={ColorItem.MediumGreen} />;
};

// icono comentario
export const Iconcommenting= () => {
  return <FontAwesome name="commenting" size={28} color={ColorItem.MediumGreen} />;
};

// icono de usuario
export const IconCustomUser= () => {
  return <MaterialCommunityIcons name="account-circle" size={28} color={ColorItem.MediumGreen} />;
};

// icono de default o null
export const IconAndroid = () => {
  return <AntDesign name="android1" size={28} color={ColorItem.MediumGreen} />;
};

export const IconClassRoom = () => {
  return <MaterialCommunityIcons name="google-classroom" size={28} color={ColorItem.MediumGreen} />;
};