import { TabsHome } from "../../../components/share/navigations/tabsHome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IndexReportesSupervisor } from "../../../components/ui/(SUPERVISOR)/reportes/indexReporte";
import { IndexClases } from "../../../components/ui/(SUPERVISOR)/clases/indexClases";
import { DrawerHome } from "../../../components/share/navigations/DrawerNavigation";
import { IndexListSupervisor } from "../../../components/ui/(SUPERVISOR)/Home/screenHome";

export const IndexSupervisor = (props) => {
  const SIZE = 26;
  const tabsSupervisor = [
    {
      name: "Dashboard",
      component: IndexListSupervisor,
      options: {
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="house" size={SIZE} color={color} />
        ),
      },
    },
  ];
  return <TabsHome tabsConfig={tabsSupervisor} />;
};
export const HomeSupervisor = () => {
  const supervisorDrawerScreens = [
    {
      name: "Home",
      component: IndexSupervisor,
      options: {
        drawerIcon: ({ color }) => (
          <FontAwesome6 name="house" size={26} color={color} />
        ),
      },
    },
    {
      name: "Reportes",
      component: IndexReportesSupervisor,
      options: {
        drawerIcon: ({ color }) => (
          <FontAwesome6
            name="file-circle-exclamation"
            size={26}
            color={color}
          />
        ),
      },
    },
    {
      name: "Clases",
      component: IndexClases,
      options: {
        drawerIcon: ({ color }) => (
          <MaterialIcons name="class" size={26} color={color} />
        ),
      },
    },
  ];
  return (
      <DrawerHome drawerScreens={supervisorDrawerScreens} />
  );
};
