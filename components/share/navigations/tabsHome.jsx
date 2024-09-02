import { useState, useCallback } from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { Redirect } from "expo-router";
import { useAuth } from "../../../src/hooks/useAuth";
import { ColorItem } from "../../styles/StylesGlobal";

export const TabsHome = ({
  tabsConfig,
  customTabBarStyle,
  activeTinColor = "#ffffff",
  inactiveTinColoe = ColorItem.DeepFir,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const Tab = createBottomTabNavigator();
  const { user } = useAuth();
  console.log("TabsHome", user);

  if (!user) return <Redirect href="/" />;

  useFocusEffect(
    useCallback(() => {
      const handleKeyboardShow = () => setKeyboardVisible(true);
      const handleKeyboardHide = () => setKeyboardVisible(false);
      const keyboardDidShowListener = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        handleKeyboardShow
      );
      const keyboardDidHideListener = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
        handleKeyboardHide
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, [])
  );
  const defaultTabBarStyle = {
    display: "flex",
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    elevation: 0,
    borderRadius: 12,
    height: 70,
    backgroundColor: ColorItem.MediumGreen,
    ...styles.shadow,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarStyle:
          ["Docentes", "Salones"].includes(route.name) && isKeyboardVisible
            ? { display: "none" }
            : {
                ...defaultTabBarStyle,
                ...customTabBarStyle,
              },
        tabBarActiveTintColor: activeTinColor,
        tabBarInactiveTintColor: inactiveTinColoe,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          paddingBottom:10
        },
        tabBarIconStyle:{
          marginBottom: -10
        }
      })}
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
