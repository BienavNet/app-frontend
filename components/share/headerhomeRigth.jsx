import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "@rneui/themed";
import { useSocket } from "../../src/hooks/use/useSocket";
export default function HeaderRight({ rol, navigation }) {
  const { totalUnreadNotification } = useSocket();
  return (
    <View
      style={[
        styles.headerContainer,

        rol === "Director" || rol === "Supervisor" && { width: "50%" },
      ]}
    >
      <View style={styles.rightContainer}>
        <Text style={styles.rol}>{rol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginRight: 20,
    paddingHorizontal: 10,
    alignItems: "center",
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
