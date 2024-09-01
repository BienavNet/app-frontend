import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { IndexSupervisor } from "../../../components/ui/(DIRECTOR)/supervisor/ScreenSupervisor";
import { IndexComentario } from "../../../components/ui/(DIRECTOR)/comentario/ScreenComentario";
import { TabsHome } from "../../../components/share/navigations/tabsHome";
import { IndexDocente } from "../../../components/ui/(DIRECTOR)/docentes/ScreenDocente";
import { IndexHorario } from "../../../components/ui/(DIRECTOR)/horarios/ScreenHorarios";
import { IndexSalones } from "../../../components/ui/(DIRECTOR)/salones/ScreenSalones";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReportView } from "./reportView";

const HomeScreen = (props) => {
  const SIZE = 26;
  const tabsDirector = [
    {
      name: "Dashboard",
      component: ReportView,
      options: {
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
        // tabBarBadge: 4,
      },
    },
    {
      name: "Docentes",
      component: IndexDocente,
      options: {
        headerShown: false,
        tabBarLabel: "Docentes",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="human-male-board"
            size={28}
            color={color}
          />
        ),
      },
    },
    {
      name: "Horarios",
      component: IndexHorario,
      options: {
        headerShown: false,
        tabBarLabel: "Horarios",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="calendar-days" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "Salones",
      component: IndexSalones,
      options: {
        headerShown: false,
        tabBarLabel: "Salones",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="landmark" size={SIZE} color={color} />
        ),
      },
    },
  ];
  return <TabsHome tabsConfig={tabsDirector} />;
};

export const HomeDirector = () => {
  const SIZE = 26;
  const directorDrawerScreens = [
    {
      name: "Home",
      component: HomeScreen,
      options: {
        drawerIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "Supervisor",
      component: IndexSupervisor,
      options: {
        drawerIcon: ({ color }) => (
          <MaterialIcons
            name="supervised-user-circle"
            size={SIZE}
            color={color}
          />
        ),
      },
    },
    {
      name: "Comentario",
      component: IndexComentario,
      options: {
        drawerIcon: ({ color }) => (
          <FontAwesome6 name="commenting" size={SIZE} color={color} />
        ),
      },
    },
  ];
  return <DrawerHome drawerScreens={directorDrawerScreens} />;
};
