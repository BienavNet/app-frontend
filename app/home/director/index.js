import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { IndexSupervisor } from "../../../components/ui/(DIRECTOR)/supervisor/ScreenSupervisor";
import { IndexComentario } from "../../../components/ui/(DIRECTOR)/comentario/ScreenComentario";
import { TabsHome } from "../../../components/share/navigations/tabsHome";
import { IndexDocente } from "../../../components/ui/(DIRECTOR)/docentes/ScreenDocente";
// import { IndexHorario } from "../../../components/ui/(DIRECTOR)/horarios/ScreenHorarios";
import { IndexSalones } from "../../../components/ui/(DIRECTOR)/salones/ScreenSalones";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import NotificationStackScreen from "../../../components/ui/(DIRECTOR)/notifications/screenNotifications";
import { ColorItem } from "../../../components/styles/StylesGlobal";
import { UseNavigationContainer } from "../../../components/share/navigations/Navigation.containe";
import TabViewTop from "../../../components/ui/(DIRECTOR)/reportes/pagerView";
import { ListHorario } from "../../../components/ui/(DIRECTOR)/horarios/list";
// import { ListItemComponentHorario } from "../../../components/ui/Components/customListHorario";
import { useSocket } from "../../../src/hooks/use/useSocket";
import { IndexHorario } from "../../../components/ui/(DIRECTOR)/horarios/view/ScreenHorarios";
const DrawerScreen = () => {
  const SIZE = 26;
  const directorDrawerScreens = [
    {
      name: "Home",
      component: TabScreen,
      options: {
        drawerIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "Docentes",
      component: IndexDocente,
      options: {
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="human-male-board"
            size={30}
            color={color}
          />
        ),
      },
    },
    {
      name: "Supervisores",
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
      name: "Comentarios",
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

const TabScreen = (props) => {
  const { totalUnreadNotification } = useSocket();
  const SIZE = 26;
  const tabsDirector = [
    {
      name: "Dashboard",
      component: TabViewTop,
      options: {
        headerShown: true,
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "Horarios",
      component: IndexHorario,
      options: {
        headerShown: true,
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
        headerShown: true,
        tabBarLabel: "Salones",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="landmark" size={SIZE} color={color} />
        ),
      },
    },
    {
      name: "NotificationStack",
      component: NotificationStackScreen,
      options: {
        tabBarBadgeStyle: {
          backgroundColor: ColorItem.DeepSkyBlue,
        },
        tabBarBadge: totalUnreadNotification ? totalUnreadNotification : 0,
        headerShown: false,
        tabBarLabel: "Alertas",
        tabBarIcon: ({ color }) => (
          <Ionicons name="notifications-sharp" size={30} color={color} />
        ),
      },
    },
  ];
  return <TabsHome tabsConfig={tabsDirector} />;
};

export const HomeDirector = () => {
  const screen = [
    {
      name: "DrawerScreensTabScreen",
      component: DrawerScreen,
    },
  ];

  return <UseNavigationContainer screenContainer={screen} />;
};
