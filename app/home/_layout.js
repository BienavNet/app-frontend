import { View, Text } from "react-native";
import { Slot, Tabs } from "expo-router";

export default () => {
  return (
    <>
      <View>header</View>
      <Slot />
      <View>footer</View>
    </>
  );
};
