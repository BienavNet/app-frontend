import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { CustomDrawerContent } from "./customDrawerLogout";
import HeaderLeft from "../headerhomeLeft";
import { DrawerActions, useNavigationState } from "@react-navigation/native";
import { ColorItem } from "../../styles/StylesGlobal";
import { userData } from "../../../src/hooks/use/userData";
export const DrawerHome = ({ drawerScreens }) => {
  const Drawer = createDrawerNavigator();
  const { ROL } = userData();

  const isDrawerVisible = useNavigationState((state) => {
    const activeRoute = state.routes[state.index];
    const nestedState = activeRoute.state;
    const activeTabName = nestedState?.routes[nestedState.index]?.name;
    return ["Docentes", "Supervisores", "Comentarios"].includes(activeTabName);
  });
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: isDrawerVisible ? true : false,
          drawerActiveTintColor: "#ffffff",
          drawerActiveBackgroundColor: ColorItem.MediumGreen,
          drawerInactiveBackgroundColor: ColorItem.Zircon,
          drawerLabelStyle: { fontSize: 16 },
          headerStyle: { backgroundColor: ColorItem.MediumGreen },
          headerTitleStyle: { color: "#fff" },
          headerLeft: () => {
            return (
              <HeaderLeft
                onPress={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
                icon={
                  <FontAwesome6
                    name="bars-staggered"
                    size={30}
                    color="#ffffff"
                  />
                }
              />
            );
          },
        };
      }}
    >
      {drawerScreens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
};
