import { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { styles } from "../../../styles/StylesGlobal";
import { getClaseSupervisorSalonHorarioDia } from "../../../../src/services/fetchData/fetchClases";
import { ListClassDefault } from "./components/listDefault";
import ListSelectItemFilterClases from "./components/lisSelectedItem";
import { ListClassSalon } from "./components/listSalon";
import { ClassFilter } from "./components/modal/modalClassFilter";
import {
  useDays,
  useHorarioAll,
  useSalonAll,
} from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ScrollMultipleFilterClass } from "./components/carouselFilter/CarouselFilter";
import { NofilterSelected } from "../../Components/unregistered/noRegistration";

export const ListClassView = () => {
  const { CEDULA } = userData();
  const [classbysupervisor, setClassBySupervisor] = useState([]); // Datos mostrados por defecto
  // Opciones de filtros
  const [filters, setFilters] = useState({ salon: 0, dia: 0, horario: 0 }); //filtros API
  const [additionalData, setAdditionalData] = useState([]); // los datos que se additional de acuerdo al filtro
  const [modalSelect, setModalSelect] = useState(false); //modal
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]); //lists de las opciones

  // manejo de selecciones
  const [multipleSelectedOption, setMultipleSelectedOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multipleSelectedItem, setMultipleSelectedItem] = useState({});
  const [temporalSelectedItem, setTemporalSelectedItem] = useState({});

  const [opciones, setOpciones] = useState([
    {
      isSelected: false,
      id: "salones",
      title: "Salones",
      action: "salones",
    },
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

  const salonAll = useSalonAll();
  const diall = useDays();
  const horarioAll = useHorarioAll();

  const fetchFilteredClasses = async () => {
    const { salon, dia, horario } = filters;

    try {
      const response = await getClaseSupervisorSalonHorarioDia(
        CEDULA,
        salon,
        dia,
        horario
      );
      if (!salon && !dia && !horario) {
        setClassBySupervisor(response);
      } else {
        setAdditionalData(response);
      }
    } catch (error) {
      console.error("Error fetching filtered classes:", error);
    }
  };
  useEffect(() => {
    fetchFilteredClasses();
  }, [filters]);

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
      salones: salonAll,
      dia: diall,
      horarios: horarioAll,
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
        horario: updated.horarios && updated.horarios.id ? updated.horarios.id : 0, 
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
//
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-end" style={{
        // top: 30
      }}>
        {/* Aqui es donde se debe de editar para arreglar los filtros de las clases de los supervisores */}
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
          removeFilter={removeFilter}
        /> 
      </View>

      {/* Información mostrada por defecto */}
      {!Object.keys(multipleSelectedItem).length && (
        <FlatList
          data={classbysupervisor}
          style={styles.list}
          renderItem={({ item }) => <ListClassDefault data={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<NofilterSelected />}
        />
      )}

      {/* Lista desplegable según el filtro seleccionado */}
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
          list.map((item) => {
            return (
              <ListSelectItemFilterClases
                temporalSelectedItem={temporalSelectedItem}
                multipleSelectedItems={multipleSelectedItem}
                key={item.id.toString()}
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
            <ListClassSalon data={item} type={selectedOption} />
          )}
          keyExtractor={(item) =>
            selectedOption === "salones"
              ? `${item.salon}-${item.id}`
              : selectedOption === "dia"
              ? `${item.id}-${item.dia}`
              : `${item.id}-H${item.horario}`
          }
          ListEmptyComponent={<NofilterSelected />}
        />
      )}
    </SafeAreaView>
  );
};