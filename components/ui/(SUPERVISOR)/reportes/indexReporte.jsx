import CustomStack from "../../Components/customStack";
import { ViewReportSup } from "./reportView";

export const IndexReportesSupervisor = () => {
  const screens = [
    {
      name: "ListReportScreen",
      component: ViewReportSup,
      title: "Reportes ",
    },
  ];
  return <CustomStack initialRouteName="ListReportScreen" screens={screens} />;
};
