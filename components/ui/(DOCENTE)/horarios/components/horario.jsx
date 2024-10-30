import { Alert, ScrollView } from "react-native";
import { IndexHorarioDefault } from "./indexDefault";
import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { userData } from "../../../../../src/hooks/use/userData";
import { ScrollMultipleFilterClass } from "../../../(SUPERVISOR)/clases/components/carouselFilter/CarouselFilter";
import {
  getDetailHorario2,
  getDetailHorarioDia,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  useDays,
  useHorarioDocenteCedula,
} from "../../../../../src/hooks/customHooks";
import { ClassFilter } from "../../../(SUPERVISOR)/clases/components/modal/modalClassFilter";
import ListSelectItemDocenteHorario from "./listSelectedItem";
import { NofilterSelected } from "../../../Components/unregistered/noRegistration";
import { ListDocenteHorarioFilters } from "./listHorarioFilter";
import { styles } from "../../../../styles/StylesGlobal";

export const IndexHorarioDocente = () => {
  const { CEDULA } = userData();
  const horarioxdocente = useHorarioDocenteCedula(CEDULA);
  const diall = useDays();
  const [filters, setFilters] = useState({ dia: 0, horario: 0 }); //filtros API
  const [additionalData, setAdditionalData] = useState([]); // los datos que se additional de acuerdo al filtro
  console.log(additionalData, "horario aditionalData");
  const [modalSelect, setModalSelect] = useState(false); //modal
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  // manejo de selecciones
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  console.log(multipleSelectedOption, "--------------- multipleSelectedOption");
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption, "------------------ selectedOption");
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      isSelected: false,
      id: "horarios",
      title: "Horarios",
      action: "horarios",
    },
    {
      isSelected: false,
      id: "dia",
      title: "Días",
      action: "dia",
    },
  ]);

  const fetchHorario = async () => {
    const { dia, horario } = filters;
    try {
      if (horario && !dia) {
        const response = await getDetailHorario2(horario);
        setAdditionalData(response);
      } else if (dia && !horario) {
        const response = await getDetailHorarioDia(CEDULA, dia);
        setAdditionalData(response);
      }
    } catch (error) {
      setAdditionalData([]);
    }
  };

  useEffect(() => {
    fetchHorario();
  }, [filters]);

  const handleOptionSelect = (option) => {
    setSearchText("");

    // Verifica si el usuario intenta seleccionar 'día' cuando el filtro 'horarios' ya está seleccionado
    if (option === "dia" && multipleSelectedItem.horarios) {
      return Alert.alert(
        "Desea borrar el filtro?",
        "Para filtrar por día, debes borrar el filtro del HORARIO establecido.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setMultipleSelectedOption((prev) =>
                prev.filter((f) => f !== "horarios")
              );
              removeFilter("horarios");
              OptionSelect(option);
            },
          },
        ]
      );
    }

    // Verifica si el usuario intenta seleccionar 'horarios' cuando el filtro 'día' ya está seleccionado
    if (option === "horarios" && multipleSelectedItem.dia) {
      return Alert.alert(
        "Desea borrar el filtro?",
        "Para filtrar por horario, debes borrar el filtro del DÍA establecido.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setMultipleSelectedOption((prev) =>
                prev.filter((f) => f !== "dia")
              );
              removeFilter("dia");
              OptionSelect(option);
            },
          },
        ]
      );
    }

    OptionSelect(option); // Si no hay conflicto con filtros previos, selecciona el nuevo filtro
  };

  const OptionSelect = (option) => {
    setSelectedOption(option);

    setMultipleSelectedOption((prev) => {
      if (prev.includes(option) && multipleSelectedItem[option]) {
        return prev;
      } else {
        return [...prev, option];
      }
    });

    const optionMapping = {
      dia: diall,
      horarios: horarioxdocente,
    };

    setList(optionMapping[option] || []);
    setModalSelect(true);
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
        dia: updated.dia && updated.dia.id ? updated.dia.id : 0,
        horario:
          updated.horarios && updated.horarios.id ? updated.horarios.id : 0,
      };
      setFilters(updatedFilters);
      setOpciones(updatedOpciones);
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
          : { ...opt, isSelected: false }
      );

      const updatedFilters = {
        dia: temporalSelectedItem.dia
          ? temporalSelectedItem.dia.id
          : multipleSelectedItem.dia?.id || 0,
        horario: temporalSelectedItem.horarios
          ? temporalSelectedItem.horarios.id
          : multipleSelectedItem.horarios?.id || 0,
      };

      setOpciones(updatedOpciones);
      setFilters(updatedFilters);
      setModalSelect(false);
      setTemporalSelectedItem({});
    } else {
      alert("Debe seleccionar al menos un filtro antes de aplicar.");
    }
  };
  return (
    <View>
      <View className="flex-row justify-end">
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
          removeFilter={removeFilter}
        />
      </View>

      {/* // la lista que se mostrara por default */}
      {!Object.keys(multipleSelectedItem).length && (
        <ScrollView>
          <IndexHorarioDefault />
        </ScrollView>
      )}

      {/* // la lista que se muestra cuando se selecciona un filtro */}
      <ClassFilter
        removeFilter={removeFilter}
        setModalSelect={setModalSelect}
        modalSelect={modalSelect}
        searchText={searchText}
        applyFilter={applyFilter}
        temporalSelectedItem={temporalSelectedItem}
        setTemporalSelectedItem={setTemporalSelectedItem}
        setMultipleSelectedItem={setMultipleSelectedItem}
        multipleSelectedOption={multipleSelectedOption}
        setMultipleSelectedOption={setMultipleSelectedOption}
        multipleSelectedItem={multipleSelectedItem}
        setSearchText={setSearchText}
        selectedOption={selectedOption}
      >
        {multipleSelectedOption.length > 0 &&
          list.length > 0 &&
          list.map((item, index) => {
            const uniqueKey =
              selectedOption === "horario"
                ? `${item.id_class}_${item.fecha}_${index}`
                : `${item.Dia}_${index}`;
            return (
              <ListSelectItemDocenteHorario
                temporalSelectedItem={temporalSelectedItem}
                multipleSelectedItems={multipleSelectedItem}
                key={uniqueKey}
                data={item}
                selectedOption={selectedOption}
                onPress={handleItemPress}
              />
            );
          })}
      </ClassFilter>

      {/* Información filtrada */}
      {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <FlatList
          data={additionalData}
          style={styles.list}
          renderItem={({ item }) => (
            <ListDocenteHorarioFilters data={item} type={selectedOption} />
          )}
          keyExtractor={(item, index) =>
            selectedOption === "horarios"
              ? `${item.id_class}_${item.fecha}_${index}`
              : `${item.Dia}_${index}`
          }
          ListEmptyComponent={<NofilterSelected />}
        />
      )}
    </View>
  );
};
