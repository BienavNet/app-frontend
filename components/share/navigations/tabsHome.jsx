import { useState, useCallback } from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { Redirect } from "expo-router";
import { useAuth } from "../../../src/hooks/useAuth";

export const TabsHome = ({ tabsConfig }) => {
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

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarStyle:
          ["Docentes", "Salones"].includes(route.name) && isKeyboardVisible
            ? { display: "none" }
            : {
                display: "flex",
                position: "absolute",
                bottom: 10,
                left: 15,
                right: 15,
                elevation: 0,
                borderRadius: 12,
                height: 70,
                ...styles.shadow,
              },
        tabBarActiveTintColor: "#3111F3",
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
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
