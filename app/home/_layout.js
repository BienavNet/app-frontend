import { View, Text } from "react-native";
import { Slot, Tabs } from "expo-router";
import { Authenticated } from "../../src/hooks/Authenticated";
export default () => {
  return (
    <Authenticated>
      <View>header</View>
      <Slot />
      <View>footer</View>
    </Authenticated>
  );
};
