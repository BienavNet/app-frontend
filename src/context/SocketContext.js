import { createContext, useEffect, useRef, useState } from "react";
import playNotificationSound from "../../src/utils/functiones/functions";
import io from "socket.io-client";
import useNotificationPermissions from "../utils/PERMISSIONS/push.notification/expo.notification";
import { userData } from "../hooks/use/userData";
const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
export let socket = null;

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const permissionGranted = useNotificationPermissions();
  const { children } = props;
  const { ROL, ID, INITIALIZE, ISAUTENTICATED } = userData();
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  const [isNotification, setIsNotification] = useState(false);
  const [sound, setSound] = useState(null);
  const socketInitialized = useRef(false);

  const handleNewNotification = (data) => {
    if (data > totalUnreadNotification) {
      playNotificationSound(setSound);
      setTotalUnreadNotification(data);
    } else if (data < totalUnreadNotification) {
      setIsNotification(false);
      setTotalUnreadNotification(data);
    } else {
      setIsNotification(false);
      return;
    }
  };

  const _handleNewNotification = async (data) => {
    try {
      if (data.success) {
        setIsNotification(true);
      }
    } catch (error) {
      setIsNotification(false);
    } finally {
      setIsNotification(false);
    }
  };

  const configreSocketEvents = () => {
    // eventos del websocket
    socket.on("connect", () => {
      socket.emit("authenticate", { userId: ID, rol: ROL });
    });

    socket.on("count-notification", (data) => {
      handleNewNotification(data);
    });

    socket.on("new_notificacion", (data) => {
      _handleNewNotification(data);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });
  };

  const initialStateSocket = () => {
    // si el socket ya esta iniciado no hara mas nada, si no verifica que el usuario este inizializado
    if (socketInitialized.current) return;
    if (INITIALIZE && ISAUTENTICATED) {
      socket = io(baseURL);
      if (permissionGranted) {
        // verificamos los permiso de notificacion
        socketInitialized.current = true; // Inicializamos el socket
        configreSocketEvents();
      }
    }
  };

  const disconnectSocket = () => {
    if (socket && socketInitialized.current) {
      socket.emit("disauthenticate", ID);
      socket.off("count-notification");
      socket.off("new_notification");
      socket.disconnect();
      socketInitialized.current = false;
    }
    if (sound) {
      sound.unloadAsync(); // Descargar el sonido si está cargado
    }
  };

  useEffect(() => {
    initialStateSocket();
    return () => {
      disconnectSocket(); // Limpiar y desconectar el socket al desmontar el contexto o cuando cambie el usuario o cierre session
    };
  }, [INITIALIZE, ISAUTENTICATED]);

  return (
    <NotificationContext.Provider
      value={{ totalUnreadNotification, isNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
