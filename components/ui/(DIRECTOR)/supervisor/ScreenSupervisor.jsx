import { ListSupervisor } from "./list";
import { RegistrarSupervisor } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";

export const IndexSupervisor = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListSupervisor,
      title: "Lista",
      headerRight: (navigation) => <Buttonright icon={IconAddCircle} navigation={navigation}/>
    },
    {
      name: "FormScreen",
      component: RegistrarSupervisor,
      title: "Registrar Supervisor",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
