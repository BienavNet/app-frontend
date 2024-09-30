import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Chip } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { View } from "react-native";
export const ChildFilter = ({ title, selectedItem, action }) => {
  return (
    <View
      style={{
        width: 130,
        marginHorizontal: 10,
      }}
    >
      <Chip
        size="md"
        titleStyle={{
          fontSize: 16,
          fontWeight: "bold",
          color: ColorItem.TarnishedSilver,
        }}
        onPress={action}
        iconRight
        title={title}
        color={selectedItem ? ColorItem.GreenSymphony : "lightgray"}
        containerStyle={{ marginVertical: 10 }}
        icon={<FontAwesome name="angle-down" size={24} color="gray" />}
      />
    </View>
  );
};
