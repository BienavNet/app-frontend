import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "@rneui/themed";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { initSockets, socket } from "../../src/utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderRight({ rol, navigation }) {
  const { user } = useAuth();
  const ID = user.id;
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  console.log("setTotalUnreadNotification", totalUnreadNotification);
  const [sound, setSound] = useState();

  // Función para reproducir el sonido de notificación
  async function playNotificationSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/mp3/Sweet.mp3") // Ruta del archivo del sonido
    );
    setSound(sound);
    await sound.playAsync(); // Reproduce el sonido
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Descarga el sonido de la memoria
        }
      : undefined;
  }, [sound]);

  const getStoredNotificationCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem(
        `notifications_count_${ID}`
      );
      console.log(storedCount, "count de las notificaciones");
      return storedCount ? parseInt(storedCount, 10) : 0;
    } catch (error) {
      console.error("Error retrieving stored notifications count:", error);
      return 0;
    }
  };

  // Guarda el conteo de notificaciones en AsyncStorage
  const storeNotificationCount = async (count) => {
    try {
      await AsyncStorage.setItem(`notifications_count_${ID}`, count.toString());
    } catch (error) {
      console.error("Error saving notifications count:", error);
    }
  };

  useEffect(() => {
    const initializeNotifications = async () => {
      initSockets(ID);
      const initialCount = await getStoredNotificationCount();
      setTotalUnreadNotification(initialCount);

      const handleNotification = (data) => {
        console.log("Nueva notificación recibida:", data);
        const newNotificationCount = data || 0;

        if (newNotificationCount > totalUnreadNotification) {
          playNotificationSound();
        }

        setTotalUnreadNotification(newNotificationCount);
        storeNotificationCount(newNotificationCount); // Guarda el nuevo conteo
      };

      if (socket) {
        socket.on("notification", handleNotification);
      }

      return () => {
        if (socket) {
          socket.off("notification", handleNotification);
        }
      };
    };

    initializeNotifications();
  }, [ID, totalUnreadNotification]);

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
