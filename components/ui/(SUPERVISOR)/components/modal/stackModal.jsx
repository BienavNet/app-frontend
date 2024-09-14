
import CustomStack from "../../../Components/customStack";
import { ModalRegisterReporte } from "./ModalRegisterReporte";
const StackModalRegisterReport = () => {
  const screen = [
    {
      name: "RegisterReportScreen",
      component: ModalRegisterReporte,
      title: "Register Reporte",
    },
  ];
  return <CustomStack initialRouteName="RegisterReportScreen" screens={screen} />;
};

export default StackModalRegisterReport;
