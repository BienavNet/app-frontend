import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ChildFilter } from "../../../components/chid/chidFilter";
import { FontAwesome } from "@expo/vector-icons";
import { ColorItem } from "../../../../../styles/StylesGlobal";

export const ScrollFilterClass = ({ opciones, selectedItem }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", paddingRight: 15 }}
    >
      <>
        {/* <View
          style={{
            marginLeft: 8,
            padding:5,
            marginVertical: 8,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 4,
            backgroundColor: "lightgray",
          }}
        >
          <TouchableOpacity
          // onPress={() =>()}
          >
            <FontAwesome name="sliders" size={35} color={ColorItem.DeepFir} />
          </TouchableOpacity>
        </View> */}
        {opciones.map((item) => (
          <View key={item.id} style={{ marginHorizontal: 5 }}>
            <ChildFilter
              title={item.title}
              action={item.action}
              selectedItem={selectedItem}
            />
          </View>
        ))}
      </>
    </ScrollView>
  );
};
