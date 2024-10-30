import { View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";

export const ListViewScreen = ({ screen }) => {
  return screen.map((i, j) => (
    <View
      key={j}
      style={{
        marginTop: 5,
        paddingHorizontal: 16,
        paddingVertical: 5,
      }}
    >
      <TouchableOpacity onPress={i.action}>
        <ListItem
          containerStyle={{
            borderRadius: 4,
          }}
          linearGradientProps={{
            colors: [ColorItem.KellyGreen, ColorItem.Luigi],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0.9 },
          }}
          ViewComponent={LinearGradient} 
        >
          {i.icon}

          <ListItem.Content>
            <ListItem.Title style={{ color: "white", fontWeight: "bold" }}>
              {i.title}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="white" />
        </ListItem>
      </TouchableOpacity>
    </View>
  ));
};
