import { ListSalones } from "./list";
import { UpdateSalon } from "./update";
import CustomStack from "../../Components/customStack";

export const IndexSalones = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSalones,
      title: "Listado",
    },
    {
      name: "FormScreen",
      component: UpdateSalon,
      title: "Actualizar Salon",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
