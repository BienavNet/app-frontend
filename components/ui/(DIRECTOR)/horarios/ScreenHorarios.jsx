import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";
import { View } from "react-native";
import { useCallback, useState } from "react";
import { PopupMenu } from "../../Components/popupMenu";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { getDocenteAll } from "../../../../src/services/fetchData/fetchDocente";
import { getHorarioAll } from "../../../../src/services/fetchData/fetchHorarios";
import { useFocusEffect } from "@react-navigation/native";

export const IndexHorario = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  console.log("selectedItem selectedItem", selectedItem);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption indexhorario", selectedOption);
  const [horarioAll, setHorarioAll] = useState([]);
  const [docenteall, setDocenteAll] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  console.log("list de la opcion seleccionada", list);
  // const handleOrderClick = () => {
  //   console.log("Ordenar por...");
  // };

  const fetchDocenteAll = useCallback(async () => {
    try {
      const res = await getDocenteAll();
      setDocenteAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  const fetchHorarioALL = useCallback(async () => {
    try {
      const res = await getHorarioAll();
      setHorarioAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDocenteAll();
      fetchHorarioALL();
    }, [fetchDocenteAll, fetchHorarioALL])
  );


  const opciones = [
    {
      title: "docente",
      icon: <FontAwesome5 name="user-circle" size={24} color="black" />,
      action: () => handleOptionSelect("docente"),
    },
    {
      title: "horario",
      icon: <MaterialCommunityIcons name="timetable" size={24} color="black" />,
      action: () => handleOptionSelect("salon"),
    },
  ];

  const handleOptionSelect = (option) => {
    console.log("optiones selected <<<<<<<<", option);

    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
    console.log("optiones selectedOption >>>>>>>>>", selectedOption);
    switch (option) {
      case "docente":
        setList(docenteall);
        break;
      case "horario":
        setList(horarioAll);
        break;
      default:
        setList([]);
    }
  };
  
  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false);
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
  };
  const ListHorarioScreen = (props) => (
    <ListHorario
      {...props}
      showSearchBar={showSearchBar}
      searchText={searchText}
      selectedOption={selectedOption}
      setSearchText={setSearchText}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      handleSearchBarClear={handleSearchBarClear}
      list={list}
      setList={setList}
      handleOptionSelect={handleOptionSelect}
      horarioAll={horarioAll}
      docenteall={docenteall}
    />
  );
  const screens = [
    {
      name: "ListScreen",
      component: ListHorarioScreen,
      title: "Listado",
      headerRight: (navigation) => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {showSearchBar ? "" : <PopupMenu opcions={opciones} />}
            </View>

            <View>
              <Buttonright icon={IconAddCircle} navigation={navigation} />
            </View>
          </View>
        );
      },
    },
    {
      name: "FormScreen",
      component: RegisterHorario,
      title: "Registrar Clase",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
