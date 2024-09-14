import { useEffect, useState } from "react";
import io from "socket.io-client";
export let socket = null;
const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
export function initSockets(userId, rol) {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    socket = io(baseURL);

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
      socket.emit("authenticate", { userId, rol });
    });

    // Escuchar el evento de notificación
    socket.on("send-notification-to-user", (count) => {
      console.log("Notificaciones no leídas:", count);
      setUnreadCount(count);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket desconectado");
      }
    };
  }, [userId, rol]);

  return unreadCount;
}
