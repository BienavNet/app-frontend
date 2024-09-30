import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { ColorItem } from "../../../styles/StylesGlobal";
import { getClaseSupervisorSalonHorarioDia } from "../../../../src/services/fetchData/fetchClases";
import { ListClassDefault } from "./components/listDefault";
import ListSelectItemFilterClases from "./components/lisSelectedItem";
import { ListClassDia } from "./components/listDia";
import { ListClassSalon } from "./components/listSalon";
import { ListClassHorario } from "./components/listHorario";
import { ListClassSupervisor } from "./components/listSupervisor";
import { ClassFilter } from "./components/modal/modalClassFilter";
import {
  useDays,
  useHorarioAll,
  useSalonAll,
  useSupervisorAll,
} from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ScrollFilterClass } from "./components/carouselFilter/CarouselFilter";

export const ListClassView = () => {
  const [modalSelect, setModalSelect] = useState(false); // estado del modal
  const [temporarySelection, setTemporarySelection] = useState(null); // obtiene el item temporal mientras se le aplica en el boton de filtrar
  const { CEDULA } = userData();
  const [appliedFilters, setAppliedFilters] = useState([]); // muestra la lista de los filtro que estan siendo seleccionado
  const [list, setList] = useState([]);
  const handleCloseSelectOption = () => {
    setModalSelect(false);
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
  };
  const [selectedOption, setSelectedOption] = useState(null); // la opcion de filtro seleccionado en el menu
  const [searchText, setSearchText] = useState(""); // texto para busqueda por filtro
  const [selectedItem, setSelectedItem] = useState(null); // guarda el item que se a sido seleccionado en la lista
  const [classbysupervisor, setClassBySupervisor] = useState([]); //clases por defecto del supervisor por id si no se le proporciona otro id del supervisor

  //opciones de filtros
  const salonAll = useSalonAll(); // cuando se a seleccionado el filtro salon
  const diall = useDays(); // cuando se a seleccionado el filtro dia
  const supervisorall = useSupervisorAll();
  const horarioAll = useHorarioAll(); //cuando se a seleccionado el filtro horario
  const [additionalData, setAdditionalData] = useState([]); // item del dato con filtro selectioando
  console.log("item del dato con filtro selectioando", additionalData);
  const [opciones, setOpciones] = useState([
    {
      id: "supervisor",
      title: "Supervisor ",
      action: () => handleOptionSelect("supervisor"),
    },
    {
      id: "salones",
      title: "Salones ",
      action: () => handleOptionSelect("salones"),
    },
    {
      id: "horarios",
      title: "Horario ",
      action: () => handleOptionSelect("horarios"),
    },
    {
      id: "dia",
      title: "Dia ",
      action: () => handleOptionSelect("dia"),
    },
  ]);

  useEffect(() => {
    const fetchFilteredClasses = async () => {
      console.log("ENTROOOOOOOOO");
      try {
        console.log("ENTROOOOOOOOO2");
        let salon = 0;
        let dia = 0;
        let horario = 0;
        let cedula = CEDULA;

        // Verifica si selectedItem no es null/undefined y es un array con elementos
        if (selectedOption) {
          console.log("Hay una opción seleccionada: ", selectedOption);

          // Verifica si `selectedItem` tiene elementos
          if (selectedItem && selectedItem.length > 0) {
            console.log("selectedItem entro 2", selectedItem);
            cedula = selectedItem[0]?.supervisor?.cedula || CEDULA;
            salon = selectedItem[0]?.salon?.id || 0;
            dia = selectedItem[0]?.dia?.id || 0;
            horario = selectedItem[0]?.horario?.id || 0;
          }
        }

        const response = await getClaseSupervisorSalonHorarioDia(
          cedula,
          salon,
          dia,
          horario
        );
        if (salon === 0 && dia === 0 && horario === 0) {
          setClassBySupervisor(response); // Actualizar solo la data relacionada con el supervisor
        } else {
          console.log("algun filtro se abra aplicado", response);
          setAdditionalData(response); // Si hay algún filtro, actualizar los datos filtrados
        }
      } catch (error) {
        throw Error("Error fetching filtered classes:", error.message);
      }
    };
    fetchFilteredClasses();
  }, [CEDULA, selectedOption, selectedItem]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");

    switch (option) {
      case "supervisor":
        setList(supervisorall);
        break;
      case "salones":
        setList(salonAll);
        break;
      case "dia":
        setList(diall);
        break;
      case "horarios":
        setList(horarioAll);
        break;
      default:
        setList([]);
    }
    setModalSelect(true);
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "salones") {
      setList(
        salonAll.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1
        )
      );
    } else if (selectedOption === "dia") {
      setList(
        diall.filter(
          (i) => i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "supervisor") {
      setList(
        supervisorall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toLowerCase().indexOf(searchText.toLowerCase())
        )
      );
    } else if (selectedOption === "horarios") {
      setList(
        horarioAll.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  // const onItemSelect = (item) => {
  //   setSelectedItem(item);
  //   handleItemPress(selectedItem, item);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-end">
        <ScrollFilterClass opciones={opciones} selectedItem={selectedItem} />
      </View>
      {/* //informacion que se mostrara por default */}
      {!selectedOption && (
        <FlatList
          data={classbysupervisor}
          style={styles.list}
          renderItem={({ item }) => <ListClassDefault data={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No hay resultados.</Text>
          }
        />
      )}

      {/* //lista desplegable segun el filtro seleccionado*/}
      <ClassFilter
        modalSelect={modalSelect}
        temporarySelection={temporarySelection}
        selectedOption={selectedOption}
        // applyFilter={applyFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        // handleItemPress={handleItemPress}
        selectedItem={selectedItem}
        handleCloseSelectOption={handleCloseSelectOption}
      >
        {selectedOption &&
          list.map(
            (item) => (
              <ListSelectItemFilterClases
                key={item.id.toString()}
                data={item}
                selectedOption={selectedOption}
                // onPress={handleItemPress}
                // // onPress={() => onItemSelect(item)}
              />
            )
            // <FlatList
            //   data={list}
            //   style={styles.listFromSearchBar}
            //   renderItem={({ item }) => (

            //   )}
            //   keyExtractor={(item) => item.id.toString()}
            //   ListEmptyComponent={
            //     <Text style={styles.noResultsText}>
            //       No coinciden los resultados
            //     </Text>
            //   }
            // />
          )}
      </ClassFilter>

      {/* //informacion de los filtros */}
      {selectedItem && (
        <>
          {selectedOption === "salones" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListClassSalon data={item} />}
                keyExtractor={(item) =>
                  `${item.clase.toString()}-${item.docente_id}`
                }
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>
                    No hay resultados por salones.
                  </Text>
                }
              />
            </>
          )}
          {selectedOption === "dia" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListClassDia data={item} />}
                keyExtractor={(item) =>
                  `${item.clase.toString()}-${item.docente_id}`
                }
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>
                    No hay resultados por dias.
                  </Text>
                }
              />
            </>
          )}
          {selectedOption === "horarios" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListClassHorario data={item} />}
                keyExtractor={(item) =>
                  `${item.clase.toString()}-${item.docente_id}`
                }
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>
                    No hay resultados por horario.
                  </Text>
                }
              />
            </>
          )}
          {selectedOption === "supervisor" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListClassSupervisor data={item} />}
                keyExtractor={(item) =>
                  `${item.clase.toString()}-${item.docente_id}`
                }
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>
                    No hay resultados por supervisor.
                  </Text>
                }
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 8,
    marginVertical: 8,
    flex: 1,
  },
  itemP1: {
    fontSize: 20,
    color: ColorItem.TarnishedSilver,
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemAsig: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#999999",
    textAlign: "left",
  },
  itemP2: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#999999",
    textAlign: "center",
  },
  itemP3: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
  itemLeft: {
    fontSize: 16,
    color: ColorItem.TarnishedSilver,
    fontWeight: "bold",
  },
  searchArea: {
    backgroundColor: "transparent",
    width: "85%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    borderBottomWidth: 1,
    borderBottomColor: ColorItem.KellyGreen,
    backgroundColor: "transparent",
    marginRight: 30,
    flex: 1,
    height: "100%",
    fontSize: 19,
  },
});
