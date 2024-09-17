import { Chip } from "@rneui/themed";
import { View } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { useState } from "react";
export const ContentFilter = () => {
  const [selected, setSelected] = useState("Todas");
  const filter = ["Todas", "A", "P", "C"];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      {filter.map((i, j) => (
        <Chip
          onPress={() => setSelected(i)}
          titleStyle={{
            color: selected === i ? "white" : ColorItem.MediumGreen,
          }}
          buttonStyle={{
            width: 70,
          }}
          color={selected === i ? ColorItem.DeepFir : "lightgreen"}
          key={j}
          type="solid"
          title={i}
        />
      ))}
    </View>
  );
};
