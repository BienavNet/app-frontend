import SimpleDatePicker from "../../Components/customSimpleDatePicker";
import { InfoHorario } from "./component/info/infoHorario";
import { SearchView } from "./component/searchMore&viewValue";
import useToastMessage from "../../../share/ToasNotification";
import moment from "../../../../src/utils/InstanceMoment";
import { NotRegistration } from "../../Components/unregistered/noRegistration";
import { useNavigation, useRoute } from "@react-navigation/native";

export const ScreenDetailHour = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { showToast, APP_STATUS } = useToastMessage();
  const { selectedItem, value } = route.params;

  // console.log("Screen Detail selectedItem, value:", value, JSON.stringify(selectedItem));

  // Función para obtener fechas seleccionadas del mes actual
  const handleDateSelected = (selectedItem) =>
    selectedItem?.horarios
      ?.map((horario) => moment(horario.fecha))
      .filter((fecha) => fecha.month() === moment().month()) || [];

  const handleDateChange = (newDate) => {
    console.log("New Date Selected:", newDate);
    navigation.setParams({
      onValue: newDate
    })
    // navigation.setOptions({
    //   onValue: (callback) => callback(newDate),
    // });
  };

  // Modal de carga con navegación
  const handleOpenSecondModal = () => {
    showToast({
      message: "Cargando datos... en espera...",
      type: "warning",
      id: APP_STATUS.LOADING,
      onClose: () =>
        navigation.navigate("SubInfoHours", {
          selectedDate: selectedItem,
        }),
    });
  };

  return (
    <>
      {selectedItem ? (
        <>
          <InfoHorario selectedItem={selectedItem} />
          <SearchView value={value} handleOpenSecondModal={handleOpenSecondModal} />
          <SimpleDatePicker
            onDateChange={handleDateChange}
            selectedDate={handleDateSelected(selectedItem)}
            viewSelectDate={selectedItem?.horarios.find((horario) =>
              moment(horario.fecha).isSame(value, "day")
            )}
          />
        </>
      ) : (
        <NotRegistration />
      )}
    </>
  );
};
// export const ScreenDetailHour = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { showToast, APP_STATUS } = useToastMessage();
//   const { selectedItem, value } = route.params;
  
//   console.log("Screen Detail selectedItem, value: " + value   +  JSON.stringify(selectedItem) );
//   const handleDateSelected = (selectedItem) => {
//     const allHorariosSelected = selectedItem?.horarios
//       .map((horarios) => {
//         const fecha = moment(horarios.fecha);
//         return fecha;
//       })
//       .filter((horarios) => {
//         const currentMonth = moment().month(); // Se obtiene el mes actual usando moment
//         return horarios.month() === currentMonth; // Solo comparamos el mes
//       });
//     return allHorariosSelected;
//   };
//   const handleDateChange = (newDate) => {
//     console.log(newDate, "date New changes : ")
//     const parentNavigator = navigation.getParent();
//     console.log(parentNavigator, "parent navigator : ")
//     if (parentNavigator?.setOptions) {
//       parentNavigator.setOptions({
//         onValue: (callback) => callback(newDate),
//       });
//     }
//   };
  
//   const handleOpenSecondModal = () => {
//     return showToast({
//       message: "Cargando datos.... en espera......",
//       type: "warning",
//       id: APP_STATUS.LOADING,
//       onClose: () =>
//         navigation.navigate("SubInfoHours", {
//           selectedDate: selectedItem,
//         }),
//     });
//   };

//   return (
//     <>
//       {selectedItem ? (
//         <>
//           <InfoHorario selectedItem={selectedItem} />

//           <SearchView value={value} handleOpenSecondModal={handleOpenSecondModal}/>

//           <SimpleDatePicker 
//           onDateChange={handleDateChange}
//             selectedDate={handleDateSelected(selectedItem)}
//             viewSelectDate={selectedItem?.horarios.find((horario) => moment(horario.fecha).isSame(value, "day"))}
//           />
//         </>
//       ) : (
//         <NotRegistration />
//       )}
//     </>
//   );
// };
