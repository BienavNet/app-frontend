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


const Days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const ListClassView = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  const [appliedFilters, setAppliedFilters] = useState([]);
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
      icon: <MaterialCommunityIcons name="home-modern" size={24} color="black" />,
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
      title: "Día",
      icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
      action: () => handleOptionSelect("dia"),
    },
  ]);
  const [list, setList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [classBySupervisor, setClassBySupervisor] = useState([]);
  const [salonAll, setSalonAll] = useState(null);
  const [diaAll, setDiaAll] = useState(null);
  const [supervisorAll, setSupervisorAll] = useState(null);
  const [horarioAll, setHorarioAll] = useState(null);
  const [additionalData, setAdditionalData] = useState([]);

  const fetchSalonAll = useCallback(async () => {
    try {
      const res = await getSalon();
      setSalonAll(res);
    } catch (error) {
      console.error("Failed to get salonAll:", error);
    }
  }, []);

  const fetchSupervisorAll = useCallback(async () => {
    try {
      const res = await getSupervisor();
      setSupervisorAll(res);
    } catch (error) {
      console.error("Failed to get supervisorAll:", error);
    }
  }, []);

  const fetchHorarioAll = useCallback(async () => {
    try {
      const res = await getHorarioAll();
      setHorarioAll(res);
    } catch (error) {
      console.error("Failed to get horarioAll:", error);
    }
  }, []);

  const fetchDia = useCallback(async () => {
    try {
      const res = Days.map((item, i) => ({ Dia: item, id: i + 1 }));
      setDiaAll(res);
    } catch (error) {
      console.error("Failed to get days:", error);
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

  useEffect(() => {
    const fetchFilteredClasses = async () => {
      try {
        let salon = 0;
        let dia = 0;
        let horario = 0;
        let cedula = CEDULA;

        if (selectedOption) {
          if (selectedItem && selectedItem.length > 0) {
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
          setClassBySupervisor(response);
        } else {
          setAdditionalData(response);
        }
      } catch (error) {
        console.error("Error fetching filtered classes:", error.message);
      }
    };

    fetchFilteredClasses();
  }, [CEDULA, selectedOption, selectedItem]);

  const manejarSeleccion = (opcionId) => {
    const opcionSeleccionada = opciones.find(opcion => opcion.id === opcionId);
    setAppliedFilters(prevFilters => [...prevFilters, opcionSeleccionada]);
    setOpciones(prevOptions => prevOptions.filter(opcion => opcion.id !== opcionId));
  };

  const eliminarSeleccion = (opcionId) => {
    const opcionEliminada = appliedFilters.find(opcion => opcion.id === opcionId);
    setOpciones(prevOptions => [...prevOptions, opcionEliminada]);
    setAppliedFilters(prevFilters => prevFilters.filter(opcion => opcion.id !== opcionId));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setShowSearchBar(true);

    setAppliedFilters(prevFilters => {
      const isAlreadyApplied = prevFilters.find(filter => filter.id === option);
      if (isAlreadyApplied) {
        return prevFilters;
      }
      const newFilter = opciones.find(opcion => opcion.id === option);
      return [...prevFilters, newFilter];
    });

    switch (option) {
      case "supervisor":
        setList(supervisorAll);
        break;
      case "salones":
        setList(salonAll);
        break;
      case "dia":
        setList(diaAll);
        break;
      case "horarios":
        setList(horarioAll);
        break;
      default:
        setList([]);
    }
    setSelectedItem(null);
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "salones") {
      setList(
        salonAll?.filter(
          (i) =>
            i.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            i.numero_salon.toString().includes(searchText)
        ) || []
      );
    } else if (selectedOption === "dia") {
      setList(
        diaAll?.filter(
          (i) => i.Dia.toLowerCase().includes(searchText.toLowerCase())
        ) || []
      );
    } else if (selectedOption === "supervisor") {
      setList(
        supervisorAll?.filter(
          (i) =>
            i.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            i.apellido.toLowerCase().includes(searchText.toLowerCase())
        ) || []
      );
    } else if (selectedOption === "horarios") {
      setList(
        horarioAll?.filter(
          (i) =>
            i.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            i.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
            i.asignatura.toLowerCase().includes(searchText.toLowerCase())
        ) || []
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

  const onItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-end">
        {showSearchBar && (
          <View style={styles.searchArea}>
            <SearchBar
              platform="ios"
              placeholder="Buscar..."
              onChangeText={setSearchText}
              value={searchText}
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInput}
            />
          </View>
        )}
        <PopupMenu
          options={opciones}
          onSelect={handleOptionSelect}
          showSearchBar={showSearchBar}
          handleSearchBarClear={handleSearchBarClear}
        />
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          switch (selectedOption) {
            case "supervisor":
              return (
                <ListClassSupervisor
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              );
            case "salones":
              return (
                <ListClassSalon
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              );
            case "dia":
              return (
                <ListClassDia
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              );
            case "horarios":
              return (
                <ListClassHorario
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              );
            default:
              return (
                <ListClassDefault
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              );
          }
        }}
      />

      {/* Aquí se agregan los filtros aplicados */}
      <View style={styles.filtersContainer}>
        {appliedFilters.map(filter => (
          <Chip
            key={filter.id}
            title={filter.title}
            icon={filter.icon}
            onPress={() => eliminarSeleccion(filter.id)}
            containerStyle={styles.chipContainer}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

// const handleItemPress = (prevItems, item) => {
//   // Comprobar si el ítem ya está seleccionado para evitar duplicados
//   const exists = prevItems.some((selectedItem) => selectedItem.id === item.id);
//   if (!exists) {
//     return [...prevItems, item]; // Crear una nueva copia del array con el nuevo ítem
//   }
//   return prevItems; // No hacer nada si ya está seleccionado
// };

// export const ListClassView = () => {
//   const { user } = useAuth();
//   const CEDULA = user.cedula;
//   const [appliedFilters, setAppliedFilters] = useState([]); // muestra la lista de los filtro que estan siendo seleccionado
//   console.log(
//     "muestra la lista de los filtro que estan siendo seleccionado",
//     appliedFilters
//   );
//   const [opciones, setOpciones] = useState([
//     {
//       id: "supervisor",
//       title: "Supervisor",
//       icon: <Feather name="user" size={24} color="black" />,
//       action: () => handleOptionSelect("supervisor"),
//     },
//     {
//       id: "salones",
//       title: "Salones",
//       icon: (
//         <MaterialCommunityIcons name="home-modern" size={24} color="black" />
//       ),
//       action: () => handleOptionSelect("salones"),
//     },
//     {
//       id: "horarios",
//       title: "Horario",
//       icon: <FontAwesome6 name="calendar-days" size={24} color="black" />,
//       action: () => handleOptionSelect("horarios"),
//     },
//     {
//       id: "dia",
//       title: "Dia",
//       icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
//       action: () => handleOptionSelect("dia"),
//     },
//   ]); //opciones del menu

//   const [list, setList] = useState([]); // guarda la informacion en la list del selectOption seleccionado
//   console.log(
//     "guarda la informacion en la list del selectOption seleccionado",
//     list
//   );
//   const [selectedOption, setSelectedOption] = useState(null); // la opcion de filtro seleccionado en el menu
//   console.log("la opcion de filtro seleccionado", selectedOption);
//   const [showSearchBar, setShowSearchBar] = useState(false); // muestra o oculta el inputSearchBar
//   const [searchText, setSearchText] = useState(""); // texto para busqueda por filtro
//   const [selectedItem, setSelectedItem] = useState(null); // guarda el item que se a sido seleccionado en la lista
//   console.log(
//     "guarda el item que se ah seleccionado en la lista",
//     selectedItem
//   );
//   //clases por defecto del supervisor por id si no se le proporciona otro id del supervisor
//   const [classbysupervisor, setClassBySupervisor] = useState([]);
//   //opciones de filtros
//   const [salonAll, setSalonAll] = useState(null); // cuando se a seleccionado el filtro salon
//   const [diall, setDiaAll] = useState(null); // cuando se a seleccionado el filtro dia
//   const [supervisorall, setSupervisorall] = useState(null); //cuando se a seleccionado el filtro supervisor
//   const [horarioAll, setHorarioAll] = useState(null); //cuando se a seleccionado el filtro horario
//   const [additionalData, setAdditionalData] = useState([]); // item del dato con filtro selectioando
//   console.log("item del dato con filtro selectioando", additionalData);
//   const Days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

//   const fetchSalonAll = useCallback(async () => {
//     try {
//       const res = await getSalon();
//       setSalonAll(res);
//     } catch (error) {
//       throw Error("Failted to get salonall", error);
//     }
//   }, []);

//   const fetchSupervisorAll = useCallback(async () => {
//     try {
//       const res = await getSupervisor();
//       setSupervisorall(res);
//     } catch (error) {
//       throw Error("Failted to get Supervisorall", error);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchSupervisorAll();
//       fetchSalonAll();
//       fetchHorarioAll();
//       fetchDia();
//     }, [fetchSupervisorAll, fetchHorarioAll, fetchSalonAll, fetchDia])
//   );
//   useEffect(() => {
//     const fetchFilteredClasses = async () => {
//       console.log("ENTROOOOOOOOO");
//       try {
//         console.log("ENTROOOOOOOOO2");
//         let salon = 0;
//         let dia = 0;
//         let horario = 0;
//         let cedula = CEDULA;

//         // Verifica si selectedItem no es null/undefined y es un array con elementos
//         if (selectedOption) {
//           console.log("Hay una opción seleccionada: ", selectedOption);

//           // Verifica si `selectedItem` tiene elementos
//           if (selectedItem && selectedItem.length > 0) {
//             console.log("selectedItem entro 2", selectedItem);
//             cedula = selectedItem[0]?.supervisor?.cedula || CEDULA;
//             salon = selectedItem[0]?.salon?.id || 0;
//             dia = selectedItem[0]?.dia?.id || 0;
//             horario = selectedItem[0]?.horario?.id || 0;
//           }
//         }

//         const response = await getClaseSupervisorSalonHorarioDia(
//           cedula,
//           salon,
//           dia,
//           horario
//         );
//         if (salon === 0 && dia === 0 && horario === 0) {
//           setClassBySupervisor(response); // Actualizar solo la data relacionada con el supervisor
//         } else {
//           console.log("algun filtro se abra aplicado", response);
//           setAdditionalData(response); // Si hay algún filtro, actualizar los datos filtrados
//         }
//       } catch (error) {
//         throw Error("Error fetching filtered classes:", error.message);
//       }
//     };
//     fetchFilteredClasses();
//   }, [CEDULA, selectedOption, selectedItem]);

//   const fetchDia = useCallback(async () => {
//     try {
//       const res = Days.map((item, i) => ({ Dia: item, id: i + 1 }));
//       console.log("response del all fetchDia", res);
//       setDiaAll(res);
//     } catch (error) {
//       throw Error("Failted to get days", error);
//     }
//   }, []);

//   const fetchHorarioAll = useCallback(async () => {
//     try {
//       const res = await getHorarioAll();
//       setHorarioAll(res);
//     } catch (error) {
//       throw Error("Failted to get horariosId", error);
//     }
//   }, []);

//   const manejarSeleccion = (opcionId) => {
//     const opcionSeleccionada = opciones.find(opcion => opcion.id === opcionId);
//     setAppliedFilters(prevFilters => [...prevFilters, opcionSeleccionada]);
//     setOpciones(prevOptions => prevOptions.filter(opcion => opcion.id !== opcionId));
//   };

//   const eliminarSeleccion = (opcionId) => {
//     const opcionEliminada = appliedFilters.find(opcion => opcion.id === opcionId);
//     setOpciones(prevOptions => [...prevOptions, opcionEliminada]);
//     setAppliedFilters(prevFilters => prevFilters.filter(opcion => opcion.id !== opcionId));
//   };

//   const handleOptionSelect = (option) => {
//     console.log("select option: " + option);
//     setSelectedOption(option);
//     console.log("selected option: " + selectedOption);
//     setSearchText("");
//     setShowSearchBar(true);


//     setAppliedFilters(prevFilters => {
//       // Verifica si el filtro ya está en appliedFilters
//       const isAlreadyApplied = prevFilters.find(filter => filter.id === option);
//       if (isAlreadyApplied) {
//         // Si ya está aplicado, no hacemos nada
//         return prevFilters;
//       }
//       // Si no está aplicado, añade el nuevo filtro
//       const newFilter = opciones.find(opcion => opcion.id === option);
//       return [...prevFilters, newFilter];
//     });

    
//     switch (option) {
//       case "supervisor":
//         setList(supervisorall);
//         break;
//       case "salones":
//         setList(salonAll);
//         break;
//       case "dia":
//         setList(diall);
//         break;
//       case "horarios":
//         setList(horarioAll);
//         break;
//       default:
//         setList([]);
//     }
//     setSelectedItem(null);
//   };

//   useEffect(() => {
//     if (searchText === "" && selectedOption) {
//       handleOptionSelect(selectedOption);
//     } else if (selectedOption === "salones") {
//       setList(
//         salonAll.filter(
//           (i) =>
//             i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
//             i.numero_salon.toString().indexOf(searchText) > -1
//         )
//       );
//     } else if (selectedOption === "dia") {
//       setList(
//         diall.filter(
//           (i) => i.Dia.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//         )
//       );
//     } else if (selectedOption === "supervisor") {
//       setList(
//         supervisorall.filter(
//           (i) =>
//             i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
//             i.apellido.toLowerCase().indexOf(searchText.toLowerCase())
//         )
//       );
//     } else if (selectedOption === "horarios") {
//       setList(
//         horarioAll.filter(
//           (i) =>
//             i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
//             i.apellido.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
//             i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1
//         )
//       );
//     }
//   }, [searchText, selectedOption]);

//   const handleSearchBarClear = () => {
//     setSearchText("");
//     setShowSearchBar(false);
//     setSelectedOption(null);
//     setSelectedItem(null);
//     setList([]);
//   };

//   // const handleItemPress = (item) => {
//   //   setSelectedItem((prevSelectedItem) => {
//   //     const updatedItem = { [selectedOption]: item };
//   //     console.log(updatedItem, "updatedItem");
//   //     // Si `selectedItem` es null, simplemente devuelve el nuevo ítem
//   //     if (!prevSelectedItem || prevSelectedItem.length === 0) {
//   //       return [updatedItem];
//   //     }
//   //     // Verifica si ya hay un ítem de este tipo en `selectedItem`
//   //     const index = prevSelectedItem.findIndex((i) => i[selectedOption]);
//   //     console.log(index, "index");
//   //     // Si ya existe, reemplaza el ítem existente
//   //     if (index !== -1) {
//   //       const newSelectedItem = [...prevSelectedItem];
//   //       console.log(newSelectedItem, "newSelectedItem");
//   //       newSelectedItem[index] = updatedItem;
//   //       return newSelectedItem;
//   //     }
//   //     // Si no existe, añade el nuevo ítem
//   //     return [...prevSelectedItem, updatedItem];
//   //   });
//   // };
//   // const handleItemPress = (item) => {
//   //   setSelectedItem((prevItems) => {
//   //     // Comprobar si el ítem ya está seleccionado para evitar duplicados
//   //     const exists = prevItems.some((selectedItem) => selectedItem.id === item.id);
//   //     if (!exists) {
//   //       return [...prevItems, item]; // Crear una nueva copia del array con el nuevo ítem
//   //     }
//   //     return prevItems; // No hacer nada si ya está seleccionado
//   //   });
//   // };
//   // Función que maneja la selección de un ítem
//   const onItemSelect = (item) => {
//     setSelectedItem(item);
//      handleItemPress(selectedItem, item)
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View className="flex-row justify-end">
//         {showSearchBar && (
//           <View style={styles.searchArea}>
//             <SearchBar
//               platform="android"
//               containerStyle={styles.search}
//               loadingProps={{
//                 size: "small",
//               }}
//               onChangeText={(t) => setSearchText(t)}
//               placeholder={`Buscar ${selectedOption}`}
//               placeholderTextColor={ColorItem.DeepFir}
//               cancelButtonTitle="Cancel"
//               value={searchText}
//               onCancel={handleSearchBarClear}
//               onClear={handleSearchBarClear}
//             />
//           </View>
//         )}
//         {showSearchBar ? (
//           ""
//         ) : (
//           <PopupMenu opcions={opciones} onSelect={manejarSeleccion} />
//         )}
//         {selectedOption && selectedItem ? (
//           <PopupMenu opcions={opciones} onSelect={manejarSeleccion} />
//         ) : (
//           ""
//         )}
//       </View>
//       <View className="flex-row justify-end">
//         {selectedOption ? (
//           <View
//             style={{
//               flexDirection: "row",
//               marginRight: 10,
//             }}
//           >
//             {appliedFilters.map((filter) => (
//               <Chip
//                 icon={{
//                   name: "close",
//                   type: "font-awesome",
//                   size: 15,
//                   color: "lightblue",
//                 }}
//                 iconRight
//                 type="outline"
//                 containerStyle={{ marginVertical: 10, marginHorizontal: 5 }}
//                 key={filter.id}
//                 title={filter.title}
//                 onPress={() => eliminarSeleccion(filter.id)}
//               />
//             ))}
//           </View>
//         ) : null}
//       </View>

//       {/* //informacion que se mostrara por default */}
//       {!selectedOption && (
//         <FlatList
//           data={classbysupervisor}
//           style={styles.list}
//           renderItem={({ item }) => <ListClassDefault data={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           ListEmptyComponent={
//             <Text style={styles.noResultsText}>No hay resultados.</Text>
//           }
//         />
//       )}

//       {/* //lista desplegable segun el filtro seleccionado*/}
//       {selectedOption && !selectedItem && (
//         <FlatList
//           data={list}
//           style={styles.listFromSearchBar}
//           renderItem={({ item }) => (
//             <ListSelectItemFilterClases
//               data={item}
//               selectedOption={selectedOption}
//               onPress={() => onItemSelect(item)}
//             />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           ListEmptyComponent={
//             <Text style={styles.noResultsText}>
//               No coinciden los resultados
//             </Text>
//           }
//         />
//       )}

//       {/* //informacion de los filtros */}
//       {selectedItem && (
//         <>
//           {selectedOption === "salones" && additionalData && (
//             <>
//               <FlatList
//                 data={additionalData}
//                 style={styles.list}
//                 renderItem={({ item }) => <ListClassSalon data={item} />}
//                 keyExtractor={(item) =>
//                   `${item.clase.toString()}-${item.docente_id}`
//                 }
//                 ListEmptyComponent={
//                   <Text style={styles.noResultsText}>
//                     No hay resultados por salones.
//                   </Text>
//                 }
//               />
//             </>
//           )}
//           {selectedOption === "dia" && additionalData && (
//             <>
//               <FlatList
//                 data={additionalData}
//                 style={styles.list}
//                 renderItem={({ item }) => <ListClassDia data={item} />}
//                 keyExtractor={(item) =>
//                   `${item.clase.toString()}-${item.docente_id}`
//                 }
//                 ListEmptyComponent={
//                   <Text style={styles.noResultsText}>
//                     No hay resultados por dias.
//                   </Text>
//                 }
//               />
//             </>
//           )}
//           {selectedOption === "horarios" && additionalData && (
//             <>
//               <FlatList
//                 data={additionalData}
//                 style={styles.list}
//                 renderItem={({ item }) => <ListClassHorario data={item} />}
//                 keyExtractor={(item) =>
//                   `${item.clase.toString()}-${item.docente_id}`
//                 }
//                 ListEmptyComponent={
//                   <Text style={styles.noResultsText}>
//                     No hay resultados por horario.
//                   </Text>
//                 }
//               />
//             </>
//           )}
//           {selectedOption === "supervisor" && additionalData && (
//             <>
//               <FlatList
//                 data={additionalData}
//                 style={styles.list}
//                 renderItem={({ item }) => <ListClassSupervisor data={item} />}
//                 keyExtractor={(item) =>
//                   `${item.clase.toString()}-${item.docente_id}`
//                 }
//                 ListEmptyComponent={
//                   <Text style={styles.noResultsText}>
//                     No hay resultados por supervisor.
//                   </Text>
//                 }
//               />
//             </>
//           )}
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export const ListClassView = () => {
//   const { user } = useAuth();
//   const CEDULA = user.cedula;
//   const [appliedFilters, setAppliedFilters] = useState([]); // Lista de filtros aplicados
//   const [opciones, setOpciones] = useState([
//     {
//       id: "supervisor",
//       title: "Supervisor",
//       icon: <Feather name="user" size={24} color="black" />,
//       action: () => handleOptionSelect("supervisor"),
//     },
//     {
//       id: "salones",
//       title: "Salones",
//       icon: <MaterialCommunityIcons name="home-modern" size={24} color="black" />,
//       action: () => handleOptionSelect("salones"),
//     },
//     {
//       id: "horarios",
//       title: "Horario",
//       icon: <FontAwesome6 name="calendar-days" size={24} color="black" />,
//       action: () => handleOptionSelect("horarios"),
//     },
//     {
//       id: "dia",
//       title: "Dia",
//       icon: <FontAwesome5 name="calendar-day" size={24} color="black" />,
//       action: () => handleOptionSelect("dia"),
//     },
//   ]); 

//   const [list, setList] = useState([]); 
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchText, setSearchText] = useState(""); 
//   const [selectedItem, setSelectedItem] = useState(null);
  
//   const [classbysupervisor, setClassBySupervisor] = useState([]); 
//   const [salonAll, setSalonAll] = useState(null);
//   const [diall, setDiaAll] = useState(null);
//   const [supervisorall, setSupervisorall] = useState(null);
//   const [horarioAll, setHorarioAll] = useState(null);
//   const [additionalData, setAdditionalData] = useState([]); 

//   const Days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

//   const fetchAllData = useCallback(async () => {
//     try {
//       const [salones, supervisors, horarios] = await Promise.all([
//         getSalon(),
//         getSupervisor(),
//         getHorarioAll(),
//       ]);
//       setSalonAll(salones);
//       setSupervisorall(supervisors);
//       setHorarioAll(horarios);
//       const dias = Days.map((item, i) => ({ Dia: item, id: i + 1 }));
//       setDiaAll(dias);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchAllData();
//     }, [fetchAllData])
//   );

//   const fetchFilteredClasses = useCallback(async () => {
//     let salon = appliedFilters.find(f => f.id === "salones")?.item?.id || 0;
//     let dia = appliedFilters.find(f => f.id === "dia")?.item?.id || 0;
//     let horario = appliedFilters.find(f => f.id === "horarios")?.item?.id || 0;
//     let cedula = appliedFilters.find(f => f.id === "supervisor")?.item?.cedula || CEDULA;

//     try {
//       const response = await getClaseSupervisorSalonHorarioDia(cedula, salon, dia, horario);
//       if (!salon && !dia && !horario) {
//         setClassBySupervisor(response); 
//       } else {
//         setAdditionalData(response); 
//       }
//     } catch (error) {
//       console.error("Error fetching filtered classes", error);
//     }
//   }, [appliedFilters, CEDULA]);

//   useEffect(() => {
//     fetchFilteredClasses();
//   }, [appliedFilters, fetchFilteredClasses]);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setShowSearchBar(true);
//     switch (option) {
//       case "supervisor":
//         setList(supervisorall);
//         break;
//       case "salones":
//         setList(salonAll);
//         break;
//       case "dia":
//         setList(diall);
//         break;
//       case "horarios":
//         setList(horarioAll);
//         break;
//       default:
//         setList([]);
//     }
//     setSelectedItem(null);
//   };

//   const manejarSeleccion = (opcionId, item) => {
//     const opcionSeleccionada = opciones.find(opcion => opcion.id === opcionId);
//     const newFilter = { id: opcionId, item: item };
//     setAppliedFilters(prevFilters => {
//       const existingFilter = prevFilters.find(f => f.id === opcionId);
//       if (existingFilter) {
//         return prevFilters.map(f => f.id === opcionId ? newFilter : f);
//       } else {
//         return [...prevFilters, newFilter];
//       }
//     });
//   };

//   const eliminarSeleccion = (opcionId) => {
//     setAppliedFilters(prevFilters => prevFilters.filter(opcion => opcion.id !== opcionId));
//   };

//   const handleSearch = useCallback(() => {
//     if (searchText && selectedOption) {
//       const filteredList = list.filter(item => 
//         item.nombre.toLowerCase().includes(searchText.toLowerCase())
//       );
//       setList(filteredList);
//     }
//   }, [searchText, list]);

//   useEffect(() => {
//     handleSearch();
//   }, [searchText, handleSearch]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View className="flex-row justify-end">
//         {showSearchBar && (
//           <SearchBar
//             platform="android"
//             containerStyle={styles.search}
//             onChangeText={setSearchText}
//             placeholder={`Buscar ${selectedOption}`}
//             value={searchText}
//             onClear={() => setSearchText('')}
//           />
//         )}
//         {!showSearchBar && <PopupMenu opcions={opciones} onSelect={handleOptionSelect} />}
//       </View>

//       {appliedFilters.length > 0 && (
//         <View style={{ flexDirection: "row", marginRight: 10 }}>
//           {appliedFilters.map(filter => (
//             <Chip
//               key={filter.id}
//               title={filter.item.nombre || filter.title}
//               onPress={() => eliminarSeleccion(filter.id)}
//             />
//           ))}
//         </View>
//       )}

//       <FlatList
//         data={selectedOption ? list : classbysupervisor}
//         renderItem={({ item }) => (
//           <ListClassDefault 
//             data={item} 
//             onPress={() => manejarSeleccion(selectedOption, item)} 
//           />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </SafeAreaView>
//   );
// };
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

// const handleItemPress = (item, option) => {
//   const newSelectedItem = { ...selectedItem[0], [option]: item };
//   setSelectedItem([newSelectedItem]);
// };

// const handleItemPress = (item, option) => {
//   setSelectedItem((prevItems) => {
//     const newItem = { [option]: item };
//     return prevItems.length > 0 ? [...prevItems, newItem] : [newItem];
//   });
// };
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

// setSelectedItem([{ [selectedOption]: item }]);
// if (selectedItem) {
//   setSelectedItem([{ ...selectedItem, [option]: item }]);
// } else {
//   setSelectedItem([{ [option]: item }]);
// }
