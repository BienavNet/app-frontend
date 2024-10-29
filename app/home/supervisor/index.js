import { TabsHome } from "../../../components/share/navigations/tabsHome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { IndexReportesSupervisor } from "../../../components/ui/(SUPERVISOR)/reportes/indexReporte";
import { IndexClases } from "../../../components/ui/(SUPERVISOR)/clases/indexClases";
import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { IndexListSupervisor } from "../../../components/ui/(SUPERVISOR)/Home/screenHome";
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
export const IndexSupervisor = (props) => {
  const TabBarStyle = {
    display: "flex",
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    elevation: 0,
    borderRadius: 12,
    height: 70,
    margin: 10,
    paddingTop: 15
  };
  const SIZE = 26;
  const tabsSupervisor = [
    {
      name: "Dashboard",
      component: IndexListSupervisor,
      options: {
        headerShown: false,
        tabBarLabel: "Inicio",
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
        tabBarLabel: "Reportes",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="file-circle-exclamation" size={SIZE} color={color}/>
        ),
        // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        
      },
    },
    {
      name: "Clases",
      component: IndexClases,
      options: {
        headerShown: false,
        tabBarLabel: "Clases",
        tabBarIcon: ({ color }) => (
          <MaterialIcons
            name="class"
            size={30}
            color={color}
          />
        ),
      },
    },
  ];
  return (
    <TabsHome tabsConfig={tabsSupervisor} customTabBarStyle={TabBarStyle}/>
  );
};
export const HomeSupervisor = () => {
  const supervisorDrawerScreens = [
    {
      name: "Home",
      component: IndexSupervisor,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
  ];
  return <DrawerHome drawerScreens={supervisorDrawerScreens} />;
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
