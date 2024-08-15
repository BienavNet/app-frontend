import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

export const ItemComponent = ({ item, onSelect }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.optionItem}
      onPress={() => onSelect}
    >
      <Text className="text-black ml-1 text-base pl-2">{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    height: 45,
    justifyContent: "center",
  },
});
