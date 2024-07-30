import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { HomeDirector } from "./director/index";
import { Redirect } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const IndexHome = () => {
  const { user } = useAuth();
  console.log("user rol", user.rol);

  if (!user) return <Redirect href="/" />;

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender = HomeDirector;
      break;
    // case "docente":
    //   ComponentToRender = "/(docente)";
    //   break;
    // case "supervisor":
    //   ComponentToRender = "/(supervisor)";
    //   break;
    default:
      ComponentToRender = () => (
        <View>
          <Text>Rol desconocido o sin acceso.</Text>
        </View>
      );
      return;
  }
  console.log(ComponentToRender, "componentToRender")
  return (
    <>
      <View>
      <View>
        <Text>header</Text>
      </View>
      <ComponentToRender/>
    
    </View>
    </>
  );
};
const Drawer2 = () => {
  return (
    <>
      <View>
        <Text>Drawer 2</Text>
      </View>
    </>
  );
};
const Drawer3 = () => {
  return (
    <>
      <View>
        <Text>Drawer 3</Text>
      </View>
    </>
  );
};


function MyTabsHome() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#3111F3",
        // tabBarLabelStyle: { fontSize: 16 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={IndexHome}
        options={{
          headerShown: false,
          title: "ni Home",
          tabBarLabel: "Home",
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome6 name="house" size={25} color={color} />
          // ),
          tabBarBadge: 4,
        }}
      />
      <Tab.Screen
        name="Classroom"
        options={{
          headerShown: false,
          title: "mis classroom",
          tabBarLabel: "Classroom",
          // tabBarIcon: ({ color }) => (
          //   <MaterialCommunityIcons
          //     name="google-classroom"
          //     size={24}
          //     color={color}
          //   />
          // ),
        }}
        component={Drawer2}
      />
      <Tab.Screen
        name="Teacher"
        options={{
          headerShown: false,
          title: "mis teacher",
          tabBarLabel: "Teacher",
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome5 name="user-plus" size={24} color={color} />
          // ),
        }}
        component={Drawer3}
      />
    </Tab.Navigator>
  );
}
export default function DraweHome() {
  const { nombre } = useAuth().user;
  const namewelcome = `Bienvenido ${nombre}`;
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={
          {
            // drawerIcon: ({ color }) => (
            //   <FontAwesome6 name="house" size={25} color={color} />
            // )
          }
        }
        name={namewelcome}
        component={MyTabsHome}
      />

      <Drawer.Screen
        options={
          {
            // drawerIcon: ({ color }) => (
            //   <MaterialCommunityIcons
            //     name="google-classroom"
            //     size={24}
            //     color={color}
            //   />
            // ),
          }
        }
        name="Drawer2"
        component={Drawer2}
      />

      <Drawer.Screen
        options={
          {
            // drawerIcon: ({ color }) => (
            //   <FontAwesome5 name="user-plus" size={24} color={color} />
            // ),
          }
        }
        name="Drawer3"
        component={Drawer3}
      />
      {/* <Drawer.Screen name="UserDoc" component={Userdoc} /> */}
    </Drawer.Navigator>
  );
}
