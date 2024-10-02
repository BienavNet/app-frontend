import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";
import { View } from "react-native";
import { useState } from "react";
import { PopupMenu } from "../../Components/popupMenu";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useDocenteAll,
  useHorarioAll,
} from "../../../../src/hooks/customHooks";

export const IndexHorario = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const horarioAll = useHorarioAll();
  const docenteall = useDocenteAll();
  const [list, setList] = useState([]);

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
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
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
      title: "Registrar Horario",
    },
  ];
  return <CustomStack initialRouteName="ListScreen" screens={screens} />;
};
