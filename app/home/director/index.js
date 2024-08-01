import { usePathname, router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export const HomeDirector = () => {


  const pathanme = usePathname();
  console.log(pathanme, "director pathname")
  return (
    <View className="items-center content-center">
     
       <Text>
        DIRECTOR
       </Text>

    </View>
  );
};
