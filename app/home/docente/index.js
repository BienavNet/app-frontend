import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { DashboardDocente } from "../../../components/ui/(DOCENTE)/home/Home";
import { RegistroClases } from "../../../components/ui/(DOCENTE)/clases/ScreenClases";
import { ScreenHorariosDocente } from "../../../components/ui/(DOCENTE)/horarios/screenHorarios";
import { ScreenComentarioDocente } from "../../../components/ui/(DOCENTE)/comentarios/screenComentarioDocente";

export const HomeDocente = () => {
  const docenteDrawerScreens = [
    {
      name: "Home",
      component: DashboardDocente,
      options: {
       drawerItemStyle: { display: "none" },
      },
    },
    {
      name: "Clases",
      component: RegistroClases,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
    {
      name: "Horarios",
      component: ScreenHorariosDocente,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
    {
      name: "Comentarios",
      component: ScreenComentarioDocente,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
  ];
  return <DrawerHome drawerScreens={docenteDrawerScreens} />;
};