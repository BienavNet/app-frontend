import * as Notifications from "expo-notifications";
import { Alert, Platform, Linking } from "react-native";
import { useState } from "react";

export default function useNotificationPermissions() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  async function requestNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      setPermissionGranted(true);
    } else if (status === "denied") {
      Alert.alert(
        "Permisos de notificaciones requeridos",
        "Debes habilitar las notificaciones desde la configuración del dispositivo para continuar usando la aplicación.",
        [
          {
            text: "Volver a intentar",
            onPress: requestNotificationPermissions,
          },
          {
            text: "abrir configuracion",
            onPress: () => {
              if (Platform.OS === "android") {
                Linking.openSettings();
              } else {
                console.log(
                  "En iOS, el usuario debe abrir la configuración manualmente."
                );
              }
            },
          },
        ]
      );
    } else {
      const { status: newStatus } = await Notifications.requestPermissionsAsync(
        {
          android: {
            allowAlert: true,
            allowSound: true,
            allowVibration: true,
          },
        }
      );

      if (newStatus === "granted") {
        setPermissionGranted(true);
      } else {
        Alert.alert(
          "Permisos de notificaciones requeridos",
          "Debes habilitar las notificaciones para continuar usando la aplicación."
        );
      }
    }
  }

  return { permissionGranted, requestNotificationPermissions };
}
