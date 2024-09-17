import { View } from "react-native";
import { CardInformationCuenta } from "./component/cardsIndex";
import { ListViewScreen } from "./component/viewScreen";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LogoutSession } from "./component/ClosingSession";
import { useNavigation } from "@react-navigation/native";


export const DashboardDocente = () => {
  const navigation = useNavigation();
  const COLORWHITE = "white";
  const screen = [
    {
      title: "Clases",
      icon: (
        <MaterialCommunityIcons
          name="google-classroom"
          size={25}
          color={COLORWHITE}
        />
      ),
      action: () => navigation.navigate("Clases"),
    },
    {
      title: "Horarios",
      icon: <FontAwesome6 name="calendar-days" size={25} color={COLORWHITE} />,
      action: () => navigation.navigate("Horarios"),
    },
    {
      title: "Comentarios",
      icon: <FontAwesome name="commenting" size={25} color={COLORWHITE} />,
      action: () => navigation.navigate("Comentarios"),
    },
  ];

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View>
        <CardInformationCuenta />
        <ListViewScreen screen={screen} />
      </View>

      <LogoutSession />
    </View>
  );
};
