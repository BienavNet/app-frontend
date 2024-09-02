import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { styles } from "../../../../styles/StylesGlobal";


export const SearchView = ({ value, handleOpenSecondModal }) => {
  return (
    <View style={[styles.viewmore]}>
      <Text style={styles.subtitle}>{value.toDateString()}</Text>
      <Button
        onPress={handleOpenSecondModal}
        color="#1371C3"
        buttonStyle={{ width: 100 }}
        radius={"sm"}
        type="clear"
      >
        Ver mas
        <MaterialIcons name="expand-more" size={24} color="#1371C3" />
      </Button>
    </View>
  );
};
// const styles = StyleSheet.create({
//   viewmore: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   subtitle: {
//     paddingVertical: 12,
//     fontSize: 17,
//     fontWeight: "600",
//     color: "#999999",
//   },
// });
