// import { ScrollViewScreen } from "./components/MomoHeader";
import CustomStack from "../../Components/view/customStack";
import { ModalRegisterReporte } from "../components/modal/ModalRegisterReporte";
import { CarListDocentes } from "../components/cars/CarsListDocente";

export const IndexListSupervisor = () => {
  const screens = [
    {
      name: "ListSupervisor",
      component: CarListDocentes,
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
