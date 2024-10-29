import CustomStack from "../../Components/customStack";
import { Clasesregistro } from "./components/indexClasesRegistro";

export const RegistroClases = () => {
  const screens = [
    {
      name: "ClasesRegistro",
      component: Clasesregistro,
      title: "Mis Clases",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
