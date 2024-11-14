import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "@rneui/themed";
import { useSocket } from "../../src/hooks/use/useSocket";
export default function HeaderRight({ rol, navigation }) {
  const { totalUnreadNotification } = useSocket();
  return (
    <View
      style={[styles.headerContainer, rol === "Director" && { width: "50%" }]}
    >
      {rol === "Director" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationStack")}
          style={{
            paddingRight: 5,
          }}
        >
          <View>
            <Ionicons name="notifications-sharp" size={24} color="#ffffff" />
            {totalUnreadNotification > 0 && (
              <Badge
                status="primary"
                value={totalUnreadNotification}
                containerStyle={{ position: "absolute", top: 2, left: 10 }}
              />
            )}
          </View>
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
