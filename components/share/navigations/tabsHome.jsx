import { useState, useCallback } from "react";
import { Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem } from "../../styles/StylesGlobal";
import HeaderRight from "../headerhomeRigth";
import HeaderLeft from "../headerhomeLeft";
import { FontAwesome6 } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { userData } from "../../../src/hooks/use/userData";
import { DrawerActions } from "@react-navigation/native";
export const TabsHome = ({ tabsConfig }) => {
  const { ROL } = userData();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const Tab = createBottomTabNavigator();
  useFocusEffect(
    useCallback(() => {
      const handleKeyboardShow = () => setKeyboardVisible(true);
      const handleKeyboardHide = () => setKeyboardVisible(false);
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        handleKeyboardShow
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        handleKeyboardHide
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, [])
  );
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route, navigation }) => {
        const hiddenOptions = [
          "Comentario",
          "Reportes",
          "Clases",
          "RegistrarReporte",
        ];
        return {
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
          headerRight: () => {
            return route.name === "Dashboard" ? (
              <HeaderRight
                rol={capitalizeFirstLetter(ROL)}
                navigation={navigation}
              />
            ) : null;
          },
          headerStyle: { backgroundColor: ColorItem.MediumGreen },
          headerTitleStyle: { color: "#fff" },
          tabBarStyle: hiddenOptions.includes(route.name) || isKeyboardVisible
          ? { display: "none" }
          : {
              backgroundColor: ColorItem.MediumGreen,
              maxHeight: "11%",
              minHeight: "10%",
            },

          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: ColorItem.DeepFir,
          tabBarIconStyle: {
            marginTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 500,
          },
        };
      }}
    >
      {tabsConfig.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};
