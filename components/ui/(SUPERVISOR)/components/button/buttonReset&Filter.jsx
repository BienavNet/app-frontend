import { TouchableOpacity, Text } from "react-native";

export const Reset_Filter = ({
  onPress,
  title,
  colorText,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      <Text
        style={{
          color: colorText,
          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
