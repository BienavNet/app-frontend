import io from "socket.io-client";
export let socket = null;

const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;

export function initSockets(userId, rol) {
  socket = io(baseURL);

  socket.on("connect", () => {
    console.log("Conectado al servidor WebSocket");
    socket.emit("authenticate", { userId, rol });
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor WebSocket");
  });
}
