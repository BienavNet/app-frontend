import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
export default function useNotificationPermissions() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync({
      android: {
        allowAlert: true,
        allowSound: true,
        allowVibration: true,
      },
    });

    if (status === "granted") {
      setPermissionGranted(true);
      console.log("Permisos de notificaciones concedidos.");
    } else {
      Alert.alert(
        "Permisos de notificaciones requeridos",
        "Debes habilitar las notificaciones para continuar usando la aplicación.",
        [
          {
            text: "Volver a intentar",
            onPress: requestNotificationPermissions,
          },
        ]
      );
    }
  }

  useEffect(() => {
    if (!permissionGranted) {
      requestNotificationPermissions();
    }
  }, [permissionGranted]);

  return { permissionGranted, requestNotificationPermissions };
}
