import { useEffect } from "react";
import { Authenticated } from "../../src/hooks/Authenticated";
import { useAuth } from "../../src/hooks/useAuth";
import { initSockets, socket } from "../../src/utils/socket";
import { HomeDirector } from "./director/index";
import { HomeDocente } from "./docente/index";
import { HomeSupervisor } from "./supervisor/index";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/" />;
  const userId = user.id;
  const rol = user.rol;

  useEffect(() => {
    initSockets(userId, rol);
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket desconectado");
      }
    };
  }, [userId, rol]);

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender = HomeDirector;
      break;
    case "supervisor":
      ComponentToRender = HomeSupervisor;
      break;
    case "docente":
      ComponentToRender = HomeDocente;
      break;
    default:
      return <Redirect href="/" />;
  }
  return (
    <Authenticated>
      <ComponentToRender />
    </Authenticated>
  );
}
