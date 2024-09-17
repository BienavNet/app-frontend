import { createContext, useEffect, useState } from "react";
import playNotificationSound from "../../src/utils/functiones/functions";
import { socket } from "../utils/socket";

// Creamos el contexto
export const NotificationContext = createContext({
  totalUnreadNotification: 0,
  handleNewNotification: () => {},
});

// Proveedor del contexto
export const NotificationProvider = (props) => {
  const { children } = props;
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  const [sound, setSound] = useState(null);

  // Manejamos las notificaciones
  const handleNewNotification = (data) => {
    if (data > totalUnreadNotification) {
      playNotificationSound(setSound);
      setTotalUnreadNotification(data);
    } else if (data < totalUnreadNotification) {
      setTotalUnreadNotification(data);
    } else {
      console.log("No hay nuevas notificaciones");
    }
  };

  useEffect(() => {
    const handleNotification = (data) => {
      handleNewNotification(data);
    };
    const handleDefaulNotification = (data) => {
      setTotalUnreadNotification(data);
    };

    //Escuchamos los eventos del socket
    if (socket) {
      socket.on("send-notification-to-user", handleNotification);
      socket.on("count-notification", handleDefaulNotification);
      console.log("paso count ");
    }

    return () => {
      if (socket) {
        socket.off("send-notification-to-user", handleNotification);
        socket.off("count-notification", handleDefaulNotification);
      }
      if (sound) {
        sound.unloadAsync(); // Descargar el sonido si está cargado
      }
    };
  }, [sound, totalUnreadNotification]);

  return (
    <NotificationContext.Provider
      value={{ totalUnreadNotification, setTotalUnreadNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
