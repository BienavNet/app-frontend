import { TabsHome } from "../../../components/share/navigations/tabsHome";
import { IndexDocente } from "../../../components/ui/(DIRECTOR)/docentes/ScreenDocente";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ContentIndex } from "./content";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
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

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ContentIndex}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const HomeSupervisor = (props) => {
  const TabBarStyle = {
    display: "flex",
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    elevation: 0,
    borderRadius: 12,
    height: 60,
    backgroundColor: "#3111F3",
  };
  const SIZE = 26;
  const tabsDirector = [
    {
      name: "Dashboard",
      component: HomeStack,
      options: {
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
        tabBarBadge: 4,
      },
    },
    {
      name: "Docentes",

      component: IndexDocente,
      options: {
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <AntDesign name="pluscircle" size={40} color="#1371C3" />
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      },
      // options: {
      //   headerShown: false,
      //   tabBarLabel: "Docentes",
      //   tabBarIcon: ({ color }) => (
      //     <MaterialCommunityIcons
      //       name="human-male-board"
      //       size={28}
      //       color={color}
      //     />
      //   ),
      // },
    },
    {
      name: "Horarios",
      component: IndexDocente,
      options: {
        headerShown: false,
        tabBarLabel: "Horarios",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="calendar-days" size={SIZE} color={color} />
        ),
      },
    },
    // {
    //   name: "Salones",
    //   component: IndexSalones,
    //   options: {
    //     headerShown: false,
    //     tabBarLabel: "Salones",
    //     tabBarIcon: ({ color }) => (
    //       <FontAwesome6 name="landmark" size={SIZE} color={color} />
    //     ),
    //   },
    // },
  ];
  return (
    <TabsHome
      tabsConfig={tabsDirector}
      customTabBarStyle={TabBarStyle}
      activeTinColor="#ffffff"
      inactiveTinColoe="gray"
    />
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
