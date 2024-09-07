import CustomStack from "../../../components/ui/Components/customStack";
import TabViewTop from "../../../components/ui/(DIRECTOR)/reportes/pagerView";

export const ReportView = () => {
  const screens = [
    {
      name: "report-statisc",
      component: TabViewTop,
      hideHeader: true,
    },
  ];
  return (
    <>
      <CustomStack initialRouteName="ListScreen" screens={screens} />
    </>
  );
};
