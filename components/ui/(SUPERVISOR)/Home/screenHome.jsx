import { ScrollViewScreen } from "./components/MomoHeader";
import CustomStack from "../../Components/customStack";
import { ModalRegisterReporte } from "../components/modal/ModalRegisterReporte";

export const IndexListSupervisor = () => {
  const screens = [
    {
      name: "ListSupervisor",
      component: ScrollViewScreen,
      title: "",
      hideHeader: true,
    },
    {
      name: "RegistrarReporte",
      component: ModalRegisterReporte,
      title: "Registrar Reporte",
    },
  ];
  return <CustomStack initialRouteName="ListSupervisor" screens={screens} />;
};
