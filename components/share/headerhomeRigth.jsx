import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function HeaderRigth({rol}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.rightContainer}>
        <Text style={styles.rol}>{rol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    margin: 2,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    width: "40%",
  },

  rol: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
