import { TouchableOpacity, Text, View } from 'react-native';

export const SubmitButton = ({ editing = false, onPress }) => {
  return (
    <View className="w-full pt-3">
      <TouchableOpacity
        onPress={onPress}
        className={`w-11/12 self-center p-3 rounded-lg ${
          !editing ? "bg-lime-600" : "bg-amber-600"
        }`}
      >
        <Text className="text-white text-center font-bold text-xl">
          {!editing ? "Registrar" : "Actualizar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

