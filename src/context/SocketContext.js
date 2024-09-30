import { createContext, useEffect, useState } from "react";
import playNotificationSound from "../../src/utils/functiones/functions";
import io from "socket.io-client";
// import { useAuth } from "../hooks/useAuth";

const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
let socket = null;
export function initSockets(userId, rol) {
  socket = io(baseURL);

  socket.on("connect", () => {
    console.log("Conectado al servidor WebSocket");
    socket.emit("authenticate", { userId, rol });
  });
  
  socket.on("count-notification", (data) =>{
  console.log("datos recibidos del servidor WebSocket", data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del servidor WebSocket");
  });
}
// Creamos el contexto
export const NotificationContext = createContext({
  totalUnreadNotification: 0,
  handleNewNotification: () => {},
});



// Proveedor del contexto
export const NotificationProvider = (props) => {
  // const { user} = useAuth();
//   console.log("user", user)
//   const USER_ID = user.id
// console.log("user", USER_ID)
//   const ROL = user.rol
  const { children } = props;
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  const [sound, setSound] = useState(null);
  // if (!socket) {
  //   socket = io(baseURL);

  //   socket.on("connect", () => {
  //     console.log("Conectado al servidor WebSocket");
  //     socket.emit("authenticate", { USER_ID, ROL}); // Sustituye con tu lógica de autenticación
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Desconectado del servidor WebSocket");
  //   });

    // socket.on("count-notification", (data) => {
    //   console.log("Cantidad de count entrante:ssss", data);
    //   handleNewNotification(data);
    // });
  // }

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

  // Inicializamos el socket y configuramos los listeners
  useEffect(() => {
    // Inicializar socket si aún no está inicializado


    // Limpiamos el listener cuando se desmonta el componente
    return () => {
      // if (socket) {
      //   socket.off("count-notification");
      // }
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

// import { createContext, useEffect, useState } from "react";
// import playNotificationSound from "../../src/utils/functiones/functions";
// import { socket } from "../utils/socket";

// // Creamos el contexto
// export const NotificationContext = createContext({
//   totalUnreadNotification: 0,
//   handleNewNotification: () => {},
// });

// // Proveedor del contexto
// export const NotificationProvider = (props) => {
//   const { children } = props;
//   const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
//   const [sound, setSound] = useState(null);

//   // Manejamos las notificaciones
//   const handleNewNotification = (data) => {
//     if (data > totalUnreadNotification) {
//       playNotificationSound(setSound);
//       setTotalUnreadNotification(data);
//     } else if (data < totalUnreadNotification) {
//       setTotalUnreadNotification(data);
//     } else {
//       console.log("No hay nuevas notificaciones");
//     }
//   };

//   useEffect(() => {
//     const handleDefaulNotification = (data) => {
//       console.log("cantidad de count entrante: ", data);
//       setTotalUnreadNotification(data);
//     };

//     // const handleNotification = (data) => {
//     //   handleNewNotification(data);
//     // };

//     //Escuchamos los eventos del socket
//     if (socket) {
//     socket.on("count-notification", (data)=>{
//       console.log("cantidad de count entrante: ", data);
//     });
//     // socket.on("send-notification-to-user", handleNotification);
//     console.log("paso count ");
//      }

//     return () => {
//       if (socket) {
//         // socket.off("send-notification-to-user", handleNotification);
//         socket.off("count-notification", handleDefaulNotification);
//       }
//       if (sound) {
//         sound.unloadAsync(); // Descargar el sonido si está cargado
//       }
//     };
//   }, [sound, totalUnreadNotification]);

//   return (
//     <NotificationContext.Provider
//       value={{ totalUnreadNotification, setTotalUnreadNotification }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };
