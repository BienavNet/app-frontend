import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useAuth } from "../../../../src/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem } from "../../../styles/StylesGlobal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PopupMenu } from "../../Components/popupMenu";
import Feather from "@expo/vector-icons/Feather";
import { getClaseSupervisorSalonHorarioDia } from "../../../../src/services/fetchData/fetchClases";
import { getHorarioAll } from "../../../../src/services/fetchData/fetchHorarios";
import { getSalon } from "../../../../src/services/fetchData/fetchSalon";
import { ListClassDefault } from "./components/listDefault";
import { getSupervisor } from "../../../../src/services/fetchData/fetchSupervisor";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ListSelectItemFilterClases from "./components/lisSelectedItem";
import { SearchBar } from "@rneui/themed";
import { Chip } from "@rneui/themed";
import { ListClassDia } from "./components/listDia";
import { ListClassSalon } from "./components/listSalon";
import { ListClassHorario } from "./components/listHorario";
import { ListClassSupervisor } from "./components/listSupervisor";

export const ListClassView = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  const [appliedFilters, setAppliedFilters] = useState([]); // muestra la lista de los filtro que estan siendo seleccionado
  const [opciones, setOpciones] = useState([
    {
      id: "supervisor",
      title: "Supervisor",
      icon: <Feather name="user" size={24} color="black" />,
      action: () => handleOptionSelect("supervisor"),
    },
    {
      id: "salones",
      title: "Salones",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salones"),
    },
    {
      id: "horarios",
      title: "Horario",
      icon: <FontAwesome6 name="calendar-days" size={24} color="black" />,
      action: () => handleOptionSelect("horarios"),
    },
    {
      id: "dia",
      title: "Dia",
      icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
      action: () => handleOptionSelect("dia"),
    },
  ]); //opciones del menu

  const [list, setList] = useState([]); // guarda la informacion en la list del selectOption seleccionado
  const [selectedOption, setSelectedOption] = useState(null); // la opcion de filtro seleccionada
  console.log("selectedOption", selectedOption);
  const [showSearchBar, setShowSearchBar] = useState(false); // muestra o oculta el inputSearchBar
  const [searchText, setSearchText] = useState(""); // texto para busqueda por filtro
  const [selectedItem, setSelectedItem] = useState([]); // guarda el item que se ah seleccionado en la lista
  console.log("selectedItem", selectedItem);
  //  if(selectedItem){
  //   console.log("selectedItem supervisor", selectedItem[0].supervisor?.cedula);
  //   console.log("selectedItem supervisor", selectedItem?.supervisor?.cedula);
  //  }

  //clases por defecto del supervisor por id si no se le proporciona otro id del supervisor
  const [classbysupervisor, setClassBySupervisor] = useState([]);
  console.log("classbysupervisor", classbysupervisor);
  //opciones de filtros
  const [salonAll, setSalonAll] = useState(null); // cuando se a seleccionado el filtro salon
  const [diall, setDiaAll] = useState(null); // cuando se a seleccionado el filtro dia
  const [supervisorall, setSupervisorall] = useState(null); //cuando se a seleccionado el filtro supervisor
  const [horarioAll, setHorarioAll] = useState(null); //cuando se a seleccionado el filtro horario
  const [additionalData, setAdditionalData] = useState([]); // item del dato con filtro selectioando
  console.log("additionalData", additionalData);
  const Days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  const fetchSalonAll = useCallback(async () => {
    try {
      const res = await getSalon();
      setSalonAll(res);
    } catch (error) {
      throw Error("Failted to get salonall", error);
    }
  }, []);

  const fetchSupervisorAll = useCallback(async () => {
    try {
      const res = await getSupervisor();
      setSupervisorall(res);
    } catch (error) {
      throw Error("Failted to get Supervisorall", error);
    }
  }, []);

  const fetchDia = useCallback(async () => {
    try {
      const res = Days.map((item, i) => ({ Dia: item, id: i + 1 }));
      console.log("response del all fetchDia", res);
      setDiaAll(res);
    } catch (error) {
      throw Error("Failted to get days", error);
    }
  }, []);

  const fetchHorarioAll = useCallback(async () => {
    try {
      const res = await getHorarioAll();
      setHorarioAll(res);
    } catch (error) {
      throw Error("Failted to get horariosId", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSupervisorAll();
      fetchSalonAll();
      fetchHorarioAll();
      fetchDia();
    }, [fetchSupervisorAll, fetchHorarioAll, fetchSalonAll, fetchDia])
  );

  const manejarSeleccion = (opcionId) => {
    const opcionSeleccionada = opciones.find(
      (opcion) => opcion.id === opcionId
    );
    setAppliedFilters([...appliedFilters, opcionSeleccionada]);
    setOpciones(opciones.filter((opcion) => opcion.id !== opcionId));
  };

  const eliminarSeleccion = (opcionId) => {
    const opcionEliminada = appliedFilters.find(
      (opcion) => opcion.id === opcionId
    );
    setOpciones([...opciones, opcionEliminada]);
    setAppliedFilters(
      appliedFilters.filter((opcion) => opcion.id !== opcionId)
    );
  };

  const fetchFilteredClasses = useCallback(async () => {
    console.log("ENTROOOOOOOOO");
    try {
      console.log("ENTROOOOOOOOO2");
      console.log("selectedItem entro", selectedItem);
      let salon = 0;
      let dia = 0;
      let horario = 0;
      let cedula;
      if (selectedItem) {
        cedula = selectedItem[0].supervisor?.cedula
        salon = selectedItem.salon?.id || 0;
        dia = selectedItem.dia?.id || 0;
        horario = selectedItem.horario?.id || 0;
      }
      else{
        cedula = CEDULA;
      }
      const response = await getClaseSupervisorSalonHorarioDia(
        cedula,
        salon,
        dia,
        horario
      );
      if (salon === 0 && dia === 0 && horario === 0) {
        console.log("entro cuando es solo cedula", response);
        setClassBySupervisor(response); // Actualizar solo la data relacionada con el supervisor
      } else {
        console.log("algun filtro se abra aplicado", response);
        setAdditionalData(response); // Si hay algún filtro, actualizar los datos filtrados
      }
    } catch (error) {
      throw Error("Error fetching filtered classes:", error.message);
    }
  }, [CEDULA, selectedItem]);

  useEffect(() => {
    if (appliedFilters.length > 0 || selectedOption) {
      console.log("Hay filtros aplicados o una opción seleccionada");
      if (selectedItem.length > 0) {
        console.log("Elemento seleccionado: ", selectedItem);
        fetchFilteredClasses(); // Filtrar cuando hay elementos seleccionados
      }
    }
  }, [selectedItem, selectedOption, appliedFilters]);
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setShowSearchBar(true);
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

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false);
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
  };

  const handleItemPress = (item, option) => {
    if (selectedItem) {
      setSelectedItem([{ ...selectedItem, [option]: item }]);
    } else {
      setSelectedItem([{ [option]: item }]);
    }
  };

  // const handleItemPress = (item, selectedOption) => {
  //   console.log("ItemPress", item, selectedOption);
  //   console.log("entroselectedItem",selectedItem);
  //   if (selectedItem) {
  //     console.log("entro porque selecciono mas de 2 filtros");
  //     setSelectedItem([...selectedItem, { [selectedOption]: item }]);
  //   } else {
  //     console.log("entro porque es solo 1 filtro");
  //     setSelectedItem([{ [selectedOption]: item }]);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-end">
        {showSearchBar && (
          <View style={styles.searchArea}>
            <SearchBar
              platform="android"
              containerStyle={styles.search}
              loadingProps={{
                size: "small",
              }}
              onChangeText={(t) => setSearchText(t)}
              placeholder={`Buscar ${selectedOption}`}
              placeholderTextColor={ColorItem.DeepFir}
              cancelButtonTitle="Cance col"
              value={searchText}
              onCancel={handleSearchBarClear}
              onClear={handleSearchBarClear}
            />
          </View>
        )}
        {showSearchBar ? (
          ""
        ) : (
          <PopupMenu opcions={opciones} onSelect={manejarSeleccion} />
        )}
        {selectedOption && selectedItem ? (
          <PopupMenu opcions={opciones} onSelect={manejarSeleccion} />
        ) : (
          ""
        )}
      </View>
      <View className="flex-row justify-end">
        {selectedOption ? (
          <View
            style={{
              flexDirection: "row",
              marginRight: 10,
            }}
          >
            {appliedFilters.map((filter) => (
              <Chip
                icon={{
                  name: "close",
                  type: "font-awesome",
                  size: 15,
                  color: "lightblue",
                }}
                iconRight
                type="outline"
                containerStyle={{ marginVertical: 10, marginHorizontal: 5 }}
                key={filter.id}
                title={filter.title}
                onPress={() => eliminarSeleccion(filter.id)}
              />
            ))}
          </View>
        ) : null}
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
      {selectedOption && !selectedItem && (
        <FlatList
          data={list}
          style={styles.listFromSearchBar}
          renderItem={({ item }) => (
            <ListSelectItemFilterClases
              data={item}
              selectedOption={selectedOption}
              onPress={() => handleItemPress(item, selectedOption)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>
              No coinciden los resultados
            </Text>
          }
        />
      )}
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
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
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
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
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
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
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
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
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

// if (selectedItem) {
//   console.log("entro cuando selectedItem tiene filtros aplicado")
//   setSelectedItem((prevSelectedItems) => {
//     const existingFilterIndex = prevSelectedItems.findIndex(
//       (filter) => Object.keys(filter)[0] === selectedOption
//     );
//     const updatedSelectedItems = [...prevSelectedItems];
//     updatedSelectedItems[existingFilterIndex] = { [selectedOption]: item };
//     console.log(updatedSelectedItems, "updatedSelectedItems")
//     return updatedSelectedItems;
//   });
// }

// const handleItemPress = (item) => {
//   setSelectedItem(item)
//   console.log(item, "item selected");

//   // Verificamos si el filtro ya fue seleccionado
//   const existingFilterIndex = selectedItem?.findIndex(
//     (filter) => Object.keys(filter)[0] === selectedOption
//   );

//   if (existingFilterIndex >= 0) {
//     // Si ya existe el filtro, lo reemplazamos con el nuevo valor
//     const updatedSelectedItem = [...selectedItem];
//     updatedSelectedItem[existingFilterIndex] = { [selectedOption]: item };
//     setSelectedItem(updatedSelectedItem);
//   } else {
//     // Si no existe, agregamos un nuevo filtro al array
//     setSelectedItem((prev) => [...prev, { [selectedOption]: item }]);
//   }
// };
// const manejarSeleccion = (opcionId) => {
//   const opcionSeleccionada = opciones.find(
//     (opcion) => opcion.id === opcionId
//   );
//   setAppliedFilters([...appliedFilters, opcionSeleccionada]);
//   setOpciones(opciones.filter((opcion) => opcion.id !== opcionId));
// };
