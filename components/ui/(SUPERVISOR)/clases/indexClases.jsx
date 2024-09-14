import CustomStack from "../../Components/customStack";
import { ListClassView } from "./listClaseView";

export const IndexClases = () => {
  const screens = [
    {
      name: "ListClasscreen",
      component: ListClassView,
      title: "Clases",
    },
  ];
  return <CustomStack initialRouteName="ListClasscreen" screens={screens} />;
};
