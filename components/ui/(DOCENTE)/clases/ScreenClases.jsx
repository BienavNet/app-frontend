import CustomStack from "../../Components/view/customStack";
import { Clasesregistro } from "./components/indexClasesRegistro";

export const RegistroClases = () => {
  const screens = [
    {
      name: "ClasesRegistro",
      component: Clasesregistro,
      title: "Mis Registros",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
