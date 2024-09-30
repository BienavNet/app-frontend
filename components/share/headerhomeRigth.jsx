import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "@rneui/themed";
import { useSocket } from "../../src/hooks/use/useSocket";
// import { useEffect, useState } from "react";
// import { socket } from "../../src/utils/socket";
// import playNotificationSound from "../../src/utils/functiones/functions";

export default function HeaderRight({ rol, navigation }) {
  const {totalUnreadNotification} = useSocket();
  // const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  // console.log("setTotalUnreadNotification", totalUnreadNotification);
  // const [sound, setSound] = useState(null);

  // const handleNewNotification = (data) => {
  //   if (data > totalUnreadNotification) {
  //     playNotificationSound(setSound);
  //     setTotalUnreadNotification(data);
  //   } else if (data < totalUnreadNotification) {
  //     setTotalUnreadNotification(data);
  //   } else {
  //     console.log("No hay nuevas notificaciones");
  //   }
  // };

  // useEffect(() => {
  //   const handleNotification = (data) => {
  //     handleNewNotification(data);
  //   };
  //   const handleDefaulNotification = (data) => {
  //     setTotalUnreadNotification(data);
  //   };

  //   if (socket) {
  //     socket.on("send-notification-to-user", handleNotification);
  //     socket.on("count-notification", handleDefaulNotification);
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off("send-notification-to-user", handleNotification); // Limpiar el listener cuando el componente se desmonte
  //       socket.off("count-notification", handleDefaulNotification);
  //     }
  //     if (sound) {
  //       sound.unloadAsync(); // Descargar el sonido si está cargado
  //     }
  //   };
  // }, [sound, totalUnreadNotification]);

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
