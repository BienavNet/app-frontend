import { ListHorario } from "./list";
import { RegisterHorario } from "./register";
import CustomStack from "../../Components/customStack";
import Buttonright from "../../../share/button/buttonRightStack";
import { IconAddCircle } from "../../../../assets/icons/IconsGlobal";
import { View, Alert } from "react-native";
import { PopupMenu } from "../../Components/popupMenu";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  useDays,
  useDocenteAll,
  useHorarioAll,
} from "../../../../src/hooks/customHooks";

export const IndexHorario = () => {
  const horarioAll = useHorarioAll();
  const dias = useDays();
  const docenteall = useDocenteAll();
  const [searchText, setSearchText] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  // Opciones de filtros
  const [filters, setFilters] = useState({ docente: 0, dia: 0, horario: 0 });
  const [modalSelect, setModalSelect] = useState(false);
  const [list, setList] = useState([]);
  // manejo de selecciones
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      id: "docente",
      isSelected: false,
      title: "Docente",
      icon: <FontAwesome5 name="user-circle" size={24} color="black" />,
      action: "docente",
    },
    {
      id: "horario",
      isSelected: false,
      title: "Horario",
      icon: <MaterialCommunityIcons name="timetable" size={24} color="black" />,
      action: "horario",
    },
  ]);
  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "horario") {
      setList(
        horarioAll.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "dia") {
      setList(
        diall.filter(
          (i) => i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "docente") {
      setList(
        docenteall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toString().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleOptionSelect = (option) => {
    setSearchText("");
    const showAlertAndRemoveFilters = (message, filtersToRemove) => {
      Alert.alert("Desea borrar el filtro?", message, [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setMultipleSelectedOption((prev) =>
              prev.filter((f) => !filtersToRemove.includes(f))
            );
            filtersToRemove.forEach((filter) => removeFilter(filter));
            OptionSelect(option);
          },
        },
      ]);
    };

    if (option === "docente" && multipleSelectedItem.horario) {
      return showAlertAndRemoveFilters(
        "Para filtrar por docente, debes borrar el filtro del HORARIO establecido.",
        ["horario"]
      );
    }

    if (
      option === "horario" &&
      multipleSelectedItem.docente &&
      multipleSelectedItem.dia
    ) {
      return showAlertAndRemoveFilters(
        "Para filtrar por horario, se deben borrar el filtro del DOCENTE Y DIA establecido.",
        ["docente", "dia"]
      );
    }
    if (option === "horario" && multipleSelectedItem.docente) {
      return showAlertAndRemoveFilters(
        "Para filtrar por horario, debes borrar el filtro del DOCENTE establecido.",
        ["docente"]
      );
    }
    OptionSelect(option);
  };

  const OptionSelect = (option) => {
    setSelectedOption(option);
    setMultipleSelectedOption((prev) => {
      if (prev.includes(option)) {
        return prev;
      } else {
        return [...prev, option];
      }
    });
    const optionMapping = {
      docente: docenteall,
      horario: horarioAll,
      dia: dias,
    };
    setList(optionMapping[option] || []);
    setModalSelect(true);
    setShowSearchBar(true);
  };

  const handleItemPress = (item, isSelected) => {
    setTemporalSelectedItem((prev) => ({
      ...prev,
      [selectedOption]: isSelected ? item : null,
    }));
  };

  const removeFilter = (Idkey) => {
    const updatedOpciones = opciones.map((opt) =>
      opt.id === Idkey ? { ...opt, isSelected: false } : opt
    );

    setMultipleSelectedItem((prev) => {
      const updated = { ...prev };

      if (updated[Idkey]) {
        delete updated[Idkey];
      }
      const updatedFilters = {
        docente:
          updated.docente && updated.docente.cedula
            ? updated.docente.cedula
            : 0,
        dia: updated.dia && updated.dia.id ? updated.dia.id : 0,
        horario: updated.horario && updated.horario.id ? updated.horario.id : 0,
      };
      setFilters(updatedFilters);
      setOpciones(updatedOpciones);
      setShowSearchBar(false);
      setModalSelect(false);
      return updated;
    });
    setMultipleSelectedOption((prev) => prev.filter((opt) => opt !== Idkey));
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
        docente: temporalSelectedItem.docente
          ? temporalSelectedItem.docente.cedula
          : multipleSelectedItem.docente?.cedula || 0,
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horario
          ? temporalSelectedItem.horario.id
          : multipleSelectedItem.horario?.id || 0,
      };

      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
      setModalSelect(false);
      setTemporalSelectedItem({});
    } else {
      alert("Debe seleccionar al menos un filtro antes de aplicar.");
    }
  };

  useEffect(() => {
    if (filters.docente > 0) {
      setOpciones((prevOpciones) => {
        if (!prevOpciones.some((opcion) => opcion.id === "dia")) {
          return [
            ...prevOpciones,
            {
              id: "dia",
              isSelected: false,
              title: "Día",
              icon: (
                <FontAwesome5 name="calendar-day" size={24} color="black" />
              ),
              action: "dia",
            },
          ];
        }
        return prevOpciones;
      });
    } else {
      setOpciones((prevOpciones) =>
        prevOpciones.filter((opcion) => opcion.id !== "dia")
      );
    }
  }, [filters.docente]);

  const ListHorarioScreen = (props) => (
    <ListHorario
      {...props}
      modalSelect={modalSelect}
      removeFilter={removeFilter}
      opciones={opciones}
      filters={filters}
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
      showSearchBar={showSearchBar}
      setSearchText={setSearchText}
      setModalSelect={setModalSelect}
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
            <PopupMenu
              rightM={50}
              opcions={opciones}
              handleOptionSelect={handleOptionSelect}
            />
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
