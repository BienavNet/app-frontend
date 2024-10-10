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
import { diasArray } from "../../../../src/utils/schemas/horarioSchema";
export const IndexHorario = () => {
  const horarioAll = useHorarioAll();
  const dias = diasArray
  console.log("dias de array", dias)
  const docenteall = useDocenteAll();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ docente: null, dia: null }); // Usamos un objeto para almacenar los filtros

  const handleSearchBarClear = () => {
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    setShowSearchBar(false);
    setShowModal(false);
    setList([]);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setShowSearchBar(true);
    setSelectedItem(null);
    switch (option) {
      case "docente":
        setList(docenteall);
        break;
      case "horario":
        setList(horarioAll);
        break;
      case "dia":
        setList(dias);
        break;
      default:
        setList([]);
    }
    setShowModal(true);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);

    // if (selectedOption === "dia") {
    //   setAdditionalData((prevData) => ({ ...prevData, dia: item }));
    // }
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [selectedOption]: item, // Aquí se actualiza el filtro que corresponde al `selectedOption` (docente, día, etc.)
    }));
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
      selectedFilters={selectedFilters}
      showSearchBar={showSearchBar}
      setSearchText={setSearchText}
      handleSearchBarClear={handleSearchBarClear}
      handleItemPress={handleItemPress}
    />
  );
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
    if (selectedOption === "docente") {
      setOpciones((prevOpciones) => [...prevOpciones.filter((opcion) => opcion.title !== "dia"), {
          title: "dia",
          icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
          action: () => handleOptionSelect("dia"),
        },
      ]);
    } else {
      setOpciones((prevOpciones) => prevOpciones.filter((opcion) => opcion.title !== "dia"));
    }
  }, [selectedOption]);
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
