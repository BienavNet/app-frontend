import { ListSalones } from "./list";
import { UpdateSalon } from "./update";
import CustomStack from "../../Components/view/customStack";

export const IndexSalones = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSalones,
      title: "Salones de la Facultad de Sistemas",
    },
    {
      name: "FormScreen",
      component: UpdateSalon,
      title: "Actualizar Salon",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
