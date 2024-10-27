import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";
import { View } from "react-native";
import { PopupMenu } from "../../Components/popupMenu";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  useDocenteAll,
  useHorarioAll,
} from "../../../../src/hooks/customHooks";
import diasArray from "./json/dias.json";

export const IndexHorario = () => {
  const horarioAll = useHorarioAll();
  const dias = diasArray.map((d) => ({ id: d.id, dia: d.dia }));
  const docenteall = useDocenteAll();

  const [searchText, setSearchText] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);

  const [filters, setFilters] = useState({ horario: 0, docente: 0 }); //filtros API
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const handleOptionSelect = (option) => {
    setSearchText("");
    setSelectedOption(option);
    setMultipleSelectedOption((prev) => {
      if (prev.includes(option) && multipleSelectedItem[option]) {
        return prev; // Si ambas condiciones son verdaderas, no elimina la opción
      } else {
        return [...prev, option]; // Si alguna de las condiciones no se cumple, la añade
      }
    });
    const optionMapping = {
      docente: docenteall,
      horario: horarioAll,
      dia: dias,
    };
    setList(optionMapping[option] || []);
    setModalSelect(true);
  };

  const [opciones, setOpciones] = useState([
    {
      isSelected: false,
      id: "docente",
      title: "docente",
      icon: <FontAwesome5 name="user-circle" size={24} color="black" />,
      action: "docente",
    },
    {
      isSelected: false,
      id: "horario",
      title: "horario",
      icon: <MaterialCommunityIcons name="timetable" size={24} color="black" />,
      action: "horario",
    },
  ]);

  useEffect(() => {
    if (selectedOption && selectedOption.includes("docente")) {
      setOpciones((prevOpciones) => [
        ...prevOpciones.filter((opcion) => opcion.title !== "dia"),
        {
          isSelected: false,
          id: "dia",
          title: "dia",
          icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
          action: "dia",
        },
      ]);
    } else {
      setOpciones((prevOpciones) =>
        prevOpciones.filter((opcion) => opcion.title !== "dia")
      );
    }
  }, [selectedOption]);

  const handleItemPress = (item, isSelected) => {
    setTemporalSelectedItem((prev) => ({
      ...prev,
      [selectedOption]: isSelected ? item : null,
    }));
  };

  const removeFilter = (Idkey) => {
    // Actualizamos las opciones (marcamos como no seleccionadas)
    const updatedOpciones = opciones.map((opt) =>
      opt.id === Idkey ? { ...opt, isSelected: false } : opt
    );

    setMultipleSelectedItem((prev) => {
      const updated = { ...prev };

      if (updated[Idkey]) {
        delete updated[Idkey];
      }
      const updatedFilters = {
        salon: updated.salones && updated.salones.id ? updated.salones.id : 0,
        dia: updated.dia && updated.dia.id ? updated.dia.id : 0,
        horario:
          updated.horarios && updated.horarios.id ? updated.horarios.id : 0,
      };
      setFilters(updatedFilters);
      setOpciones(updatedOpciones);
      alert("Estado actualizado");
      return updated;
    });
  };

  const applyFilter = () => {
    const hasTemporarySelection = Object.keys(temporalSelectedItem).length > 0;
    if (hasTemporarySelection || Object.keys(multipleSelectedItem).length > 0) {
      setMultipleSelectedItem((prev) => ({
        ...prev,
        ...temporalSelectedItem,
      }));

      const updatedOpciones = opciones.map((opt) =>
        multipleSelectedOption.includes(opt.id)
          ? { ...opt, isSelected: true }
          : opt
      );

      const updatedFilters = {
        salon: temporalSelectedItem.salones
          ? temporalSelectedItem.salones.id
          : multipleSelectedItem.salones?.id || 0,
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horarios
          ? temporalSelectedItem.horarios.id
          : multipleSelectedItem.horarios?.id || 0,
      };

      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
      fetchFilteredClasses();
      setModalSelect(false);
      setTemporalSelectedItem({});
    } else {
      alert("Debe seleccionar al menos un filtro antes de aplicar.");
    }
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "docente") {
      setList(
        docenteall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toString().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "horario") {
      setList(
        horarioAll.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const ListHorarioScreen = (props) => (
    <ListHorario
      {...props}
      opciones={opciones}
      filters={filters}
      showModal={showModal}
      selectedOption={selectedOption}
      searchText={searchText}
      list={list}
      applyFilter={applyFilter}
      temporalSelectedItem={temporalSelectedItem}
      setTemporalSelectedItem={setTemporalSelectedItem}
      setMultipleSelectedItem={setMultipleSelectedItem}
      multipleSelectedOption={multipleSelectedOption}
      setMultipleSelectedOption={setMultipleSelectedOption}
      multipleSelectedItem={multipleSelectedItem}
      handleOptionSelect={handleOptionSelect}
      // selectedItem={selectedItem}
      // // selectedFilters={selectedFilters}
      // setSelectedItem={setSelectedItem}
      showSearchBar={showSearchBar}
      setSearchText={setSearchText}
      // handleSearchBarClear={handleSearchBarClear}
      handleItemPress={handleItemPress}
    />
  );

  const screens = [
    {
      name: "ListScreen",
      component: ListHorarioScreen,
      title:
        Object.keys(multipleSelectedItem).length > 0 && selectedOption
          ? `Filtro por ${selectedOption}`
          : "Listado",
      headerRight: (navigation) => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PopupMenu rightM={50} opcions={opciones} />
            <Buttonright icon={IconAddCircle} navigation={navigation} />
          </View>
        );
      },
    },
    {
      name: "FormScreen",
      component: RegisterHorario,
      title: "Registrar Horario",
    },
  ];

  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};

// if (selectedOption === "dia") {
//   setAdditionalData((prevData) => ({ ...prevData, dia: item }));
// }

// if(selectedItem){
//   if(selectedOption === "docente"){
//     setSelectedFilters((prevFilters) => ({...prevFilters, [selectedOption]: item}))
//   }
// }

// if(selectedOption === "docente"){
//   setSelectedItem((prevSelectedItem) => prevSelectedItem ? [...prevSelectedItem, item] : item);
//   // setSelectedItem((prevSelectedItem) =>[...prevSelectedItem, item])
// }
// else{
//   setSelectedItem(item);
// }
// useEffect(() => {
//   if (selectedOption === "docente") {
//     setOpciones((prevOpciones) => [...prevOpciones.filter((opcion) => opcion.title !== "dia"),
//       {
//         title: "dia",
//         icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
//         action: () => handleOptionSelect("dia"),
//       },
//     ]);
//   } else {
//     setOpciones((prevOpciones) => prevOpciones.filter((opcion) => opcion.title !== "dia"));
//   }
// }, [selectedOption]);

// const [selectedFilters, setSelectedFilters] = useState({ docente: null, dia: null }); // Usamos un objeto para almacenar el filtro del doncente y dia
// // console.log("selectedFilters", selectedFilters);

// if (selectedOption && typeof selectedOption === "string") {
//   // Si ya hay un filtro seleccionado, convertirlo en array y agregar el nuevo filtro
//   setSelectedOption([selectedOption, option]);
// } else if (selectedOption && Array.isArray(selectedOption)) {
//   // Si ya hay múltiples filtros seleccionados, añadir otro filtro
//   setSelectedOption((prevOptions) =>
//     prevOptions.includes(option) ? prevOptions : [...prevOptions, option]
//   );
// } else {
//   // Si no hay filtros seleccionados, establecer el nuevo como string
//   setSelectedOption(option);
// }
// setSelectedOption(option);

//>>>>>>>>>>>>< sirve
// if (selectedOption === "docente" || selectedOption === "dia") {
//   setSelectedItem((prevFilters) => ({ ...prevFilters,[selectedOption]: item, })); // Agrega o actualiza el valor seleccionado
// } else if (selectedOption === "horario") {
//   setSelectedItem({ horario: item }); // Solo mantiene el valor del horario y resetea los demás
// }

// setSelectedItem((prevFilters) => ({ ...prevFilters, [selectedOption]: item }));

// setSelectedItem((prevFilters) => ({...prevFilters, [selectedOption]: item}))
// if (Object.keys(selectedItem).length > 0 && selectedOption === "docente"){
//   setSelectedItem((prevFilters) => ({...prevFilters, [selectedOption]: item}))
//   console.log("Selected item typeof " , typeof selectedItem);
//   console.log("Selected item ", selectedItem)
// }
// // if (selectedOption && selectedOption.includes("docente")) {
// //   setSelectedItem((prevSelectedItem) =>
// //     Array.isArray(prevSelectedItem)
// //       ? [...prevSelectedItem, item]
// //       : [item]
// //   );
// // } else {
// //   setSelectedItem(item); // Asigna como string si es una sola opción
// // }

// setSelectedItem(null)
//   setSelectedOption(option)
// if(selectedOption === "docente"){
//   setSelectedOption(option)
//   console.log(typeof selectedOption,"XXXXXXXXXXX- typeof selected option");
// }
//   setSearchText("");
//   setShowSearchBar(true);
// setSelectedItem(null);
// if (option === "horario") {
//   setSelectedOption(option);
//   console.log("setSelectedOption entro horario", option);
//   setSelectedItem(null);  // Reiniciar el item seleccionado
// } else if (option === "docente") {
//   console.log("setSelectedOption docente", option);
//   setSelectedOption(option);
//   setSelectedItem(null)
// } else if (option === "dia" && selectedOption.includes("docente")) {
//   setSelectedOption((prev) => [...prev, "dia"]);
//   console.log("setSelectedOption entro a dia y docente", option);
// }

// if (selectedItem && selectedItem.length > 0) {
//   if (option !== "docente") {
//     setSelectedItem(null); // Establecer a null si la opción no es "docente"
//   }
// } else {
//   // Resetear selectedItem a null si no tiene valor
//   setSelectedItem(null);
// }

//  setSelectedItem(option);

//  if (selectedOption === "docente") {
//   setSelectedOption((prevFilters) => ({ ...prevFilters,[selectedOption]: item, })); // Agrega o actualiza el valor seleccionado
// } else if (selectedOption === "horario") {
//   setSelectedOption(option);
// }

// if(selectedOption && selectedOption === "docente"){
//   setSelectedItem((prevFilters) => ({...prevFilters, [selectedOption]: [item]}));
// }

// else if (selectedOption === "dia" && selectedItem.docente) {
//   setSelectedItem((prevFilters) => ({
//     ...prevFilters,
//     dia: item,
//   }));

//   // Si la opción es "horario", solo se almacena el valor de horario sin combinar con otros valores
// }

// const handleOptionSelect = (option) => {
//   console.log(selectedItem, "selectedItem handleOptionSelect")
//   if (option === "docente") {
//     setSelectedOption("docente");

//   } else if (option === "horario") {
//     setSelectedOption("horario");
//   }

//  if(selectedOption === "docente"){
//   if (option === "dia") {
//     console.log("datos del selectedItem", selectedItem);
//     console.log("datos del selectedItem.docente", selectedItem.docente);
//     if (selectedItem && selectedItem.docente) {
//       setSelectedOption((prevOptions) => [...prevOptions, "dia"]);
//     } else {
//       alert("Por favor, selecciona un docente primero.");
//       return; // Detenemos la ejecución aquí
//     }
//   }
//  }
//   // else if (option === "dia") {
//   //   console.log("Option si entro a dia para XXXXXX " + selectedItem.docente )
//   //   if (selectedItem && selectedItem.docente) {
//   //     setSelectedOption((prevOptions) => [...prevOptions, "dia"]);
//   //   } else {
//   //     alert("Por favor, selecciona un docente primero.");
//   //   }
//   // }

//   setSearchText("");
//   setShowSearchBar(true);

//   switch (option) {
//     case "docente":
//       setList(docenteall);
//       break;
//     case "horario":
//       setList(horarioAll);
//       break;
//     case "dia":
//       setList(dias);
//       break;
//     default:
//       setList([]);
//   }
//   setShowModal(true);
// };

// const handleOptionSelect = (option) => {
//   console.log(selectedItem, "selectedItem handleOptionSelect");

//   // Actualizar el valor de selectedOption
//   if (option === "docente") {
//     setSelectedOption("docente");
//     setList(docenteall);
//   } else if (option === "horario") {
//     setSelectedOption("horario");
//     setList(horarioAll);
//   } else if (option === "dia") {
//   if (selectedItem && selectedItem.docente) {
//     setSelectedOption((prev) => {
//       // Agrega "dia" si no está ya en el array
//       if (!prev.includes("dia")) {
//         return [...prev, "dia"];
//       }
//       return prev; // No hacer nada si ya está
//     });
//     // if (selectedItem && selectedItem.docente) {
//     //   console.log(selectedOption, "selected option entrnado en day zxxxxxxxxxxs");
//     //   setSelectedOption((prev) => [...prev, option]);
//       setList(dias);
//     } else {
//       alert("Por favor, selecciona un docente primero.");
//       return; // Detenemos la ejecución aquí si no hay un docente seleccionado
//     }
//   }

//   setSearchText("");
//   setShowSearchBar(true);
//   setShowModal(true);
// };
