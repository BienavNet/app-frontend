import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ColorItem } from "../../styles/StylesGlobal";

export default function Buttonright({ icon, navigation }) {
  return (
    // <View style={styles.headerContainer}>
    //    <TouchableOpacity onPress={() => navigation.navigate("FormScreen")}>
    //    {icon}
    //    </TouchableOpacity>
    // </View>
    <TouchableOpacity onPress={() => navigation.navigate("FormScreen")} style={styles.btnright}>
      {icon}
      {/* <MaterialIcons name="add-circle" size={28} color="#ffffff" /> */}
    </TouchableOpacity>
  );
}
// headerRight: (navigation) => (

//   ),
const styles = StyleSheet.create({
  btnright: {
    marginRight: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: ColorItem.MediumGreen,
  },
});
