import { TouchableOpacity, Text, View } from "react-native";

export const SubmitButton = ({ editing = false, onPress, isDisabled }) => {
  return (
    <View className="w-[94%] pt-3 self-center">
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPress}
        className={`w-11/12 self-center p-3 rounded-lg ${
          !editing ? "bg-UPCKellyGreen" : "bg-UPCGoldOre"
        } ${isDisabled ? "bg-UPCTarnishedSilver" : ""}`}
      >
        <Text className="text-white text-center font-bold text-xl">
          {!editing ? "Registrar" : "Actualizar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
