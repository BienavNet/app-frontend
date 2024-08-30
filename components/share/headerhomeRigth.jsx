import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HeaderRight({ rol }) {
  return (
    <View
      style={[styles.headerContainer, rol === "Director" && { width: "50%" }]}
    >
      {rol === "Director" ? (
        <TouchableOpacity title="">
          <Ionicons name="notifications-sharp" size={24} color="#ffffff" />
        </TouchableOpacity>
      ) : null}
      <View style={styles.rightContainer}>
        <Text style={styles.rol}>{rol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    margin: 2,
    alignItems: "center",
    padding: 2,
    width: "40%",
  },

  rol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  rightContainer: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
