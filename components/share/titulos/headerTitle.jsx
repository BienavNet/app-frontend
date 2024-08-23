import { Text, View } from 'react-native';

export const HeaderTitle = ({ editing = false, registerText, updateText = "Actualizar"  }) => {
  return (
    <View className="py-2">
      <Text className="text-lg text-center font-bold">
        {!editing ? registerText : updateText}
      </Text>
    </View>
  );
};

