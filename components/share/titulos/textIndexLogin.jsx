import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SvgLogin } from "../../../assets/svg/iconLogin";
const { width: screenWidth } = Dimensions.get("window");

export const TitleLogin = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerSVG}>
        <SvgLogin style={styles.svgIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>App Salones</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // title: {
  //   marginTop: 3,
  //   paddingVertical: 8,
  //   color: "#20232a",
  //   textAlign: "center",
  //   fontSize: 38,
  //   fontWeight: "bold",
  // },
  container: {
    flex: 1,
    // height: screenWidth * 0.3, // Ajustar la altura del contenedor al tamaño del SVG
    // justifyContent: "center",
    // alignItems: "center",
  },

  containerSVG: {
    width: screenWidth,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // textContainer: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 38,
    fontWeight: "bold",
    color: "#20232a",
    textAlign: "center",
  },
});
