import { TouchableOpacity, Text, View } from "react-native";

export const Buttonlogin = ({ onPress, title = "Iniciar Sesión", error }) => {
  return (
    <View className={`w-full ${error ? 'pt-3' : 'pt-5'}`}>
      <TouchableOpacity
        onPress={onPress}
        className="w-11/12 self-center bg-UPCKellyGreen p-3  rounded-2xl mb-2"
      >
        <Text className="text-white text-center font-bold text-xl">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
