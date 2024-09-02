import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";

export const IndexHorario = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListHorario,
      title: "Listado",
      headerRight: (navigation) => <Buttonright icon={IconAddCircle} navigation={navigation}/>
    },
    {
      name: "FormScreen",
      component: RegisterHorario,
      title: "Registrar Clase",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
