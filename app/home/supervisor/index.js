import { TabsHome } from "../../../components/share/navigations/tabsHome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ContentIndex } from "./content";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NotificationStackScreenSu from "../../../components/ui/(SUPERVISOR)/notifications/screenNotifications";
import StackModalRegisterReport from "../../../components/ui/(SUPERVISOR)/components/modal/stackModal";
import Entypo from "@expo/vector-icons/Entypo";
import { IndexReportesSupervisor } from "../../../components/ui/(SUPERVISOR)/reportes/indexReporte";
import { IndexClases } from "../../../components/ui/(SUPERVISOR)/clases/indexClases";
import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 75,
          height: 75,
          borderRadius: 35,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

// const Stack = createNativeStackNavigator();
// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={ContentIndex}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="NotificationStack"
//         component={NotificationStackScreenSu}
//         options={{
//           headerShown: false,
//           drawerItemStyle: { display: "none" },
//         }}
//       />
//       <Stack.Screen
//         name="RegisterReportStack"
//         component={StackModalRegisterReport}
//         options={{
//           headerShown: false,
//           drawerItemStyle: { display: "none" },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

export const IndexSupervisor = (props) => {
  const TabBarStyle = {
    display: "flex",
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    elevation: 0,
    borderRadius: 12,
    height: 60,
  };
  const SIZE = 26;
  const tabsSupervisor = [
    {
      name: "Dashboard",
      component: ContentIndex,
      options: {
        headerShown: false,
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "Reportes",
      component: IndexReportesSupervisor,
      options: {
        headerShown: false,
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <Entypo name="info-with-circle" size={40} color={color} />
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      },
    },
    {
      name: "Clases",
      component: IndexClases,
      options: {
        headerShown: false,
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <MaterialIcons
            name="class"
            size={35}
            color={color}
            style={{
              marginTop: 3,
            }}
          />
        ),
      },
    },
  ];
  return (
    <TabsHome tabsConfig={tabsSupervisor} customTabBarStyle={TabBarStyle} />
  );
};
export const HomeSupervisor = () => {
  const SIZE = 26;
  const directorDrawerScreens = [
    {
      name: "Home",
      component: IndexSupervisor,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
    // {
    //   name: "Supervisor",
    //   component: IndexSupervisor,
    //   options: {
    //     drawerIcon: ({ color }) => (
    //       <MaterialIcons
    //         name="supervised-user-circle"
    //         size={SIZE}
    //         color={color}
    //       />
    //     ),
    //   },
    // },
    // {
    //   name: "Comentario",
    //   component: IndexComentario,
    //   options: {
    //     drawerIcon: ({ color }) => (
    //       <FontAwesome6 name="commenting" size={SIZE} color={color} />
    //     ),
    //   },
    // },
  ];
  return <DrawerHome drawerScreens={directorDrawerScreens} />;
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
