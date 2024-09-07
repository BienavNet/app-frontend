import { ListComentario } from "./list";
import CustomStack from "../../Components/customStack";
export const IndexComentario = () => {
  const screens = [
    {
      hideHeader: "false",
      name: "ListScreen",
      component: ListComentario,
      title: "Listado",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
