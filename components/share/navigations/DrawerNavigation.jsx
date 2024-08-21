import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useAuth } from "../../../src/hooks/useAuth";
import { CustomDrawerContent } from "./customDrawerLogout";
import HeaderLeft from "../headerhomeLeft";
import HeaderRigth from "../headerhomeRigth";
import { DrawerActions } from "@react-navigation/native";
import { Redirect } from "expo-router";

export const DrawerHome = ({ drawerScreens }) => {
  const { user } = useAuth();
  console.log("user drawehome is: ", user);
  const Drawer = createDrawerNavigator();
  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        headerShown: route.name === "Dashboard" ? false : true,
        drawerActiveTintColor: "#3111F3",
        drawerInactiveTintColor: "#000000",
        drawerLabelStyle: { fontSize: 16 },
        headerStyle: { backgroundColor: "#3111F3" },
        headerTitleStyle: { color: "#fff" },
        headerRight: () => {
          return route.name === "Dashboard" ? (
            <HeaderRigth rol={capitalizeFirstLetter(user.rol)} />
          ) : null;
        },
        headerLeft: () => {
          return (
            <HeaderLeft
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              icon={
                <FontAwesome6 name="bars-staggered" size={30} color="#ffffff" />
              }
            />
          );
        },
      })}
    >
      {drawerScreens.map((screen, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
