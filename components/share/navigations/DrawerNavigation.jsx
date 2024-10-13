import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { CustomDrawerContent } from "./customDrawerLogout";
import HeaderLeft from "../headerhomeLeft";
import HeaderRigth from "../headerhomeRigth";
import { DrawerActions } from "@react-navigation/native";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { ColorItem } from "../../styles/StylesGlobal";
import NotificationStackScreen from "../../ui/(DIRECTOR)/notifications/screenNotifications";
import { userData } from "../../../src/hooks/use/userData";

export const DrawerHome = ({ drawerScreens }) => {
  const Drawer = createDrawerNavigator();
  const { ROL } = userData();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        headerShown: route.name === "Dashboard" ? false : true,
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: ColorItem.DeepFir,
        drawerActiveBackgroundColor: ColorItem.MediumGreen,
        drawerInactiveBackgroundColor: ColorItem.Zircon,
        drawerLabelStyle: { fontSize: 16 },
        headerStyle: { backgroundColor: ColorItem.MediumGreen },
        headerTitleStyle: { color: "#fff" },
        headerRight: () => {
          return route.name === "Home" ? (
            <HeaderRigth
              rol={capitalizeFirstLetter(ROL)}
              navigation={navigation}
            />
          ) : null;
        },

        headerLeft: () => {
            return (
             ROL === "director" &&(
              <HeaderLeft
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              icon={<FontAwesome6 name="bars-staggered" size={30} color="#ffffff" />}
            />
             )
            );
          // }
        },
      })}
    >
      {drawerScreens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
      <Drawer.Screen
        name="NotificationStack"
        component={NotificationStackScreen}
        options={{
          headerShown: false, // Ocultar en header del Drawer
          drawerItemStyle: { display: "none" } // Ocultar en el drawer
        }} 
      />
    </Drawer.Navigator>
  );
};
