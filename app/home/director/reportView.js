import CustomStack from "../../../components/ui/Components/customStack";
import TabViewTop from "../../../components/ui/(DIRECTOR)/reportes/pagerView";

export const ReportView = () => {
 
  const screens = [
    {
      name: "report-statisc",
      component: TabViewTop,
      // title: "Listado",
      hideHeader: true,
    },
  ];
  return (
    <>
      <CustomStack initialRouteName="ListScreen" screens={screens} />
    </>
  );
};
// const styles = StyleSheet.create({
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 8,
//   },
//   chartContainer: {
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderRadius: 4,
//     borderColor: "#7F7F7F",
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//   },
// });
