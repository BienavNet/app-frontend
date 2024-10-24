import { View, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
export const ScrollMultipleFilterClass = ({
  opciones,
  // removeFilter,
  handleOptionSelect,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", paddingRight: 15 }}
    >
      <>
        {opciones.map((item, index) => {
          return (
            <View key={item.id} style={{ marginHorizontal: 5 }}>
              <View
                style={{
                  width: 130,
                  marginHorizontal: 10,
                }}
              >
                <Chip
                  size="md"
                  key={`seletedset-${index}`}
                  title={item.title}
                  onPress={() => handleOptionSelect(item.action)}
                  iconRight
                  containerStyle={{ marginVertical: 10 }}
                  color={item.isSelected ? "primary" : "lightgrey"}
                />
              </View>
            </View>
          );
        })}
      </>
    </ScrollView>
  );
};

// icon={
//   <FontAwesome
//     style={{
//       marginHorizontal: item.isSelected ? 5 : 0,
//     }}
//     name={item.isSelected ? "remove" : "angle-down"}
//     size={20}
//     color="white"
//     onPress={() => {
//       if (item.isSelected) {
//         removeFilter(item.id);
//       }
//     }}
//   />
// }
