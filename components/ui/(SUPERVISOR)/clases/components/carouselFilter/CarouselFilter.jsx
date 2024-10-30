import { View, ScrollView } from "react-native";
import { Chip } from "@rneui/themed";
import { ColorItem } from "../../../../../styles/StylesGlobal";

export const ScrollMultipleFilterClass = ({ opciones, handleOptionSelect }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "row",
        backgroundColor: "transparent",
        minWidth: "100%",
      }}
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
                  titleStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: item.isSelected
                      ? "white"
                      : ColorItem.TarnishedSilver,
                  }}
                  iconRight
                  containerStyle={{ marginVertical: 10 }}
                  color={item.isSelected ? "primary" : "lightgray"}
                />
              </View>
            </View>
          );
        })}
      </>
    </ScrollView>
  );
};
