import { View, StyleSheet } from "react-native";

export const BoxView = ({ children, style }) => {
  return <View style={[styles.boxview, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  boxview: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
  },
});
