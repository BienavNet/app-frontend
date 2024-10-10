import { createContext, useEffect, useState } from "react";
import { playNotificationSound } from "../../src/utils/functiones/functions";
import io from "socket.io-client";
import { showNotification } from "../utils/PERMISSIONS/push.notification/viewnotification";
import useNotificationPermissions from "../utils/PERMISSIONS/push.notification/expo.notification";
import { userData } from "../hooks/use/userData";

const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
let socket = null;
socket = io(baseURL);

function initSockets(userId, rol) {
  const permissionGranted = useNotificationPermissions();

  if (permissionGranted) {
  socket.on("connect", () => {
  socket.emit("authenticate", { userId, rol });
  });
  }
  socket.on("disconnect", () => {
    console.log("Desconectado del servidor WebSocket");
  });
}
// Creamos el contexto
export const NotificationContext = createContext();

// Proveedor del contexto
export const NotificationProvider = (props) => {
  const {children} = props;
  const {ROL, ID } = userData();
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
  const [sound, setSound] = useState(null);
  initSockets(ID,ROL);

  socket.on("count-notification", (data) => {
            console.log("Cantidad de count entrante:ssss", data);
            handleNewNotification(data);
          });

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
    return () => {  
      if (sound) {
        socket.off("count-notification");
        sound.unloadAsync(); // Descargar el sonido si está cargado
      }
    };
  }, [totalUnreadNotification]);
  return (
    <NotificationContext.Provider value={{ totalUnreadNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// import { createContext, useEffect, useState } from "react";
// import { playNotificationSound } from "../../src/utils/functiones/functions";
// import io from "socket.io-client";
// import { showNotification } from "../utils/PERMISSIONS/push.notification/viewnotification";
// import useNotificationPermissions from "../utils/PERMISSIONS/push.notification/expo.notification";

// const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
// let socket = null;
// export const NotificationContext = createContext();

// export const NotificationProvider = (props) => {
//   const { userId, rol, children } = props;
//   console.log("props del contexto websocket", props);
//   const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
//   const [sound, setSound] = useState(null);
//   const permissionGranted = useNotificationPermissions();

//   useEffect(() => {
//     if (permissionGranted && userId && rol) {
//       socket = io(baseURL);
//       socket.on("connect", () => {
//         console.log("Conectado al servidor WebSocket");
//         socket.emit("authenticate", { userId, rol });
//       });

//       socket.on("count-notification", (data) => {
//         console.log("Cantidad de notificaciones entrantes:", data);
//         handleNewNotification(data); // Manejar la nueva notificación
//       });

//       socket.on("disconnect", () => {
//         console.log("Desconectado del servidor WebSocket");
//       });
//     }

//     return () => {
//       // Limpiar y desconectar el socket al desmontar el contexto o cuando cambie el usuario
//       if (socket) {
//         socket.disconnect();
//       }
//       if (sound) {
//         sound.unloadAsync(); // Descargar el sonido si está cargado
//       }
//     };
//   }, [permissionGranted, userId, rol]); // Reconfigurar cuando cambie el usuario o permisos

//   // Manejamos las notificaciones
//   const handleNewNotification = (data) => {
//     if (data > totalUnreadNotification) {
//       playNotificationSound(setSound); // Reproducir sonido de notificación
//       showNotification("Nueva notificación", `Tienes ${data} notificaciones no leídas.`); // Mostrar notificación push
//       setTotalUnreadNotification(data); // Actualizar el número de notificaciones
//     } else if (data < totalUnreadNotification) {
//       setTotalUnreadNotification(data); // Actualizar solo si han disminuido
//     } else {
//       console.log("No hay nuevas notificaciones");
//     }
//   };

//   return (
//     <NotificationContext.Provider value={{ totalUnreadNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// import { createContext, useEffect, useState } from "react";
// import {playNotificationSound} from "../../src/utils/functiones/functions";
// import io from "socket.io-client";
// import { showNotification } from "../utils/PERMISSIONS/push.notification/viewnotification";
// import useNotificationPermissions from "../utils/PERMISSIONS/push.notification/expo.notification";

// const baseURL = process.env.EXPO_PUBLIC_URLWEBSOCKET;
// let socket = null;
// socket = io(baseURL);

// export function initSockets(userId, rol) {
//   socket.on("connect", () => {
//   socket.emit("authenticate", { userId, rol });
//   });
  
//   socket.on("disconnect", () => {
//     console.log("Desconectado del servidor WebSocket");
//   });
// }
// // Creamos el contexto
// export const NotificationContext = createContext();

// // Proveedor del contexto
// export const NotificationProvider = (props) => {
//   const { children } = props;
//   const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
//   const [sound, setSound] = useState(null);
//   const permissionGranted = useNotificationPermissions();


//     socket.on("count-notification", (data) => {
//       console.log("Cantidad de count entrante:ssss", data);
//       handleNewNotification(data);
//     });

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
//     return () => {  
//       if (sound) {
//         socket.off("count-notification");
//         sound.unloadAsync(); // Descargar el sonido si está cargado
//       }
//     };
//   }, [totalUnreadNotification]);

//   return (
//     <NotificationContext.Provider
//       value={{ totalUnreadNotification}}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };