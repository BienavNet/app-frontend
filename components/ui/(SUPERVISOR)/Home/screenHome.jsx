import { CarListDocentes } from "../components/cars/CarsListDocente";
import { ScrollViewScreen } from "./components/MomoHeader";
export const ContentIndex = () => {
  return (
    <ScrollViewScreen>
      <CarListDocentes />
    </ScrollViewScreen>
  );
};

import CustomStack from "../../Components/customStack";
import { ModalRegisterReporte } from "../components/modal/ModalRegisterReporte";

export const IndexListSupervisor = () => {
  const screens = [
    {
      name: "ListSupervisor",
      component: ContentIndex,
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
