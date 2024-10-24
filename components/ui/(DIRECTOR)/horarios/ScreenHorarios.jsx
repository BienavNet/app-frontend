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


  const [selectedItem, setSelectedItem] = useState(null);
  console.log("selectedItem", selectedItem + "selectedItem TYPEPF",typeof selectedItem);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption", selectedOption);
  console.log("selectedOption.includes --> ", selectedOption.includes("docente"));
  const [list, setList] = useState([]);
  console.log("list", list);


  const handleSearchBarClear = () => {
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    // if (!selectedOption === "docente") {
    //   console.log("selectedOption en HANDELSEARCHBARCLEAR", selectedOption)
    //   setSelectedOption(null); // Limpiar si "docente" no está seleccionado
    // }
    // if (!selectedItem?.docente) {
    //   console.log("selectedItem en HANDELSEARCHBARCLEAR", selectedItem)
    //   setSelectedItem(null);
    // }
    
    setShowSearchBar(false);
    setShowModal(false);
   setList([]);
  };

  const handleOptionSelect = (option) => {
    console.log(selectedItem, "selectedItem handleOptionSelect");
  
    // Actualizar el valor de selectedOption
    if (option === "docente") {
      setSelectedOption("docente");
      setList(docenteall);
    } else if (option === "horario") {
      setSelectedOption("horario");
      setList(horarioAll);
    } else if (option === "dia") {
    if (selectedItem && selectedItem.docente) {
      setSelectedOption((prev) => {
        // Agrega "dia" si no está ya en el array
        if (!prev.includes("dia")) {
          return [...prev, "dia"];
        }
        return prev; // No hacer nada si ya está
      });
      // if (selectedItem && selectedItem.docente) {
      //   console.log(selectedOption, "selected option entrnado en day zxxxxxxxxxxs");
      //   setSelectedOption((prev) => [...prev, option]);
        setList(dias);
      } else {
        alert("Por favor, selecciona un docente primero.");
        return; // Detenemos la ejecución aquí si no hay un docente seleccionado
      }
    }
  
    setSearchText("");
    setShowSearchBar(true);
    setShowModal(true);
  };
 
  const [opciones, setOpciones] = useState([
    {
      title: "docente",
      icon: <FontAwesome5 name="user-circle" size={24} color="black" />,
      action: () => handleOptionSelect("docente"),
    },
    {
      title: "horario",
      icon: <MaterialCommunityIcons name="timetable" size={24} color="black" />,
      action: () => handleOptionSelect("horario"),
    },
  ]);

  useEffect(() => {
    if (selectedOption && selectedOption.includes("docente")) {
      setOpciones((prevOpciones) => [
        ...prevOpciones.filter((opcion) => opcion.title !== "dia"),
        {
          title: "dia",
          icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
          action: () => handleOptionSelect("dia"),
        },
      ]);
    } else {
      setOpciones((prevOpciones) =>
        prevOpciones.filter((opcion) => opcion.title !== "dia")
      );
    }
  }, [selectedOption]);

  const handleItemPress = (item) => {
    if (selectedOption === "docente") {
      setSelectedItem({docente:item});
      // setSelectedItem((prevFilters) => ({...prevFilters,[selectedOption]: item}));
    } else if (selectedOption === "horario") {
      setSelectedItem({horario: item});
    }

    setShowSearchBar(false);
    setList([]);
    setShowModal(true);
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
      showModal={showModal}
      selectedOption={selectedOption}
      searchText={searchText}
      list={list}
      selectedItem={selectedItem}
      // selectedFilters={selectedFilters}
      setSelectedItem={setSelectedItem}
      showSearchBar={showSearchBar}
      setSearchText={setSearchText}
      handleSearchBarClear={handleSearchBarClear}
      handleItemPress={handleItemPress}
    />
  );

  const screens = [
    {
      name: "ListScreen",
      component: ListHorarioScreen,
      title:
        selectedItem && selectedOption
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
