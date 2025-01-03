import { Authenticated } from "../../src/hooks/Authenticated";
import { useAuth } from "../../src/hooks/use/useAuth";
import { HomeDirector } from "./director/index";
import { HomeDocente } from "./docente/index";
import { HomeSupervisor } from "./supervisor/index";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/" />;

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender =HomeDirector ;
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
