import { ListDocente } from "./listDocente";
import { RegistrarDocente } from "./register";
import CustomStack from "../../Components/view/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";

export const IndexDocente = () => {
  const screens = [
    {
      name: "ListScreen",
      component: ListDocente,
      title: "Lista",
      headerRight: (navigation) => <Buttonright icon={IconAddCircle} navigation={navigation}/>
      ,
    },
    {
      name: "FormScreen",
      component: RegistrarDocente,
      title: "Registrar Docente",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
