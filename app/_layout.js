import { Slot } from "expo-router";
import { View, Text, StatusBar } from "react-native";

export default () => {
    return (
     <>
      <StatusBar style="dark" />
      <Slot name="main" />
     </> 
    )
}