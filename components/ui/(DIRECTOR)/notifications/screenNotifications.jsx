import CustomStack from "../../Components/customStack";
import { ColorItem } from "../../../styles/StylesGlobal";
import Notification from "../../Components/notifications/contentTabView";
import { NotificacionView } from "../../Components/notifications/notificationMoreView";
const NotificationStackScreen = () => {
  const screen = [
    {
      name: "NotificationScreen",
      component: Notification,
      title: "Notificaciones",
    },
    {
      name: "NotificationView",
      component: NotificacionView,
      title: "Detalles de la Notificación",
      headerStyle: {
        backgroundColor: ColorItem.MediumGreen,
      },
      headerTitleStyle: {
        color: "#fff",
      },
    },
  ];
  return <CustomStack initialRouteName="NotificationScreen" screens={screen} />;
};

export default NotificationStackScreen;
