import { View, Text } from "react-native";
import { useAuth } from "../../../src/hooks/useAuth";

export const HomeDirector = () => {
  return (
    <View className="items-center content-center">
      <Text className="text-cyan-950">Pagina del director</Text>
    </View>
  );
};
