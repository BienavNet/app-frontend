import io from "socket.io-client";
const SOCKET_URL = "http://10.0.2.2:5000";
export let socket = null;

export function initSockets(userId) {
  socket = io(SOCKET_URL);

  const authenticateUser = (userId) => {
    socket.emit("authenticate", userId);
  };

  // Escuchar el evento de notificación
  socket.on("notification", (data) => {
    console.log("Notificaciones no leídas:", data);
  });

  socket.on("connect", () => {
    console.log("Conectado al servidor WebSocket");
    authenticateUser(userId);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor WebSocket");
  });
}
