import  Notification  from "./contentNofitication"; // Componente de notificaciones
import CustomStack from "../../Components/customStack";
import { NotificacionView } from "./notificationView";
import { ColorItem } from "../../../styles/StylesGlobal";
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
      headerStyle:{
        backgroundColor:ColorItem.MediumGreen
      },
      headerTitleStyle:{
        color:"#fff"
      }
    },
  ];
  return <CustomStack initialRouteName="NotificationScreen" screens={screen} />;
};

export default NotificationStackScreen;
