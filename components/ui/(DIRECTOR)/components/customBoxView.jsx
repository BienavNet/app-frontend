import { View, StyleSheet } from "react-native";

export const BoxView = ({ children, style }) => {
  return( <View style={[styles.boxview, style]}>{children}</View>)
};

const styles = StyleSheet.create({
  boxview: {

    width:"100%",
    justifyContent: "center",
    // borderRadius: 4,
    // elevation: 5,
    backgroundColor: "#fff",
    // marginHorizontal: 10,

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,

  },
});
