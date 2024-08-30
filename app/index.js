import { FormLogin } from "../components/ui/login/formLogin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { SvgLogin } from "../assets/svg/iconLogin";
import { PublicRoute } from "../src/hooks/PublicRoute";
export default function Index() {
  const insert = useSafeAreaInsets();
  console.log("Insert", insert);
  return (
    <PublicRoute>
      <View style={{ paddingTop: insert.top, paddingBottom: insert.bottom }}>
        <View style={styles.containerSVG}>
          <SvgLogin style={styles.svgIcon} />
          <Text style={styles.title}>
            App {"\n"}
            ClassRooms
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height:"100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#D6DEDE",
            paddingVertical: 15,
            shadowColor: "black",
          }}
        >
          <FormLogin />
        </View>
      </View>
    </PublicRoute>
  );
}

const styles = StyleSheet.create({
  containerSVG: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    left: 15,
    bottom: 20,
    fontSize: 38,
    fontWeight: "bold",
    color: "#20232a",
    textAlign: "left",
  },
});
