import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItem from "./listaitem";
import { ColorItem } from "../../../styles/StylesGlobal";
import { SearchBar } from "@rneui/themed";
import { PopupMenu } from "../../Components/popupMenu";
import {
  getReportAll,
  getReportClase2,
  getReportSalon2,
} from "../../../../src/services/fetchData/fetchReporte";
import { useFocusEffect } from "@react-navigation/native";
import { ListViewDefault } from "./ListDefault";
import { getSalon } from "../../../../src/services/fetchData/fetchSalon";
import { getClasesAll } from "../../../../src/services/fetchData/fetchClases";
import { ListFilterSalones } from "./components/listFilterSalon";
import { ListFilterClases } from "./components/listFilterClases";

export const ReportView_Filter = () => {
  const [searchText, setSearchText] = useState("");
  const [reportAll, setReportAll] = useState([]);
  const [classAll, setClassAll] = useState([]);
  const [salonAll, setSalonAll] = useState([]);

  const [selectedItem, setSelectedItem] = useState([]);
  const [list, setList] = useState([]); // list con la información de los datos filtrados

  const [selectedOption, setSelectedOption] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [additionalData, setAdditionalData] = useState([]);

  const fetchReportAll = useCallback(async () => {
    try {
      const res = await getReportAll();
      setReportAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  const fetchClassAll = useCallback(async () => {
    try {
      const res = await getClasesAll();
      setClassAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  const fetchSalonALL = useCallback(async () => {
    try {
      const res = await getSalon();
      setSalonAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReportAll();
      fetchSalonALL();
      fetchClassAll();
    }, [fetchReportAll, fetchSalonALL, fetchClassAll])
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);

    switch (selectedOption) {
      case "salones":
        setList(salonAll);
        break;
      case "clases":
        setList(classAll);
        break;
      default:
        setList([]);
    }
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption); // Mostrar todos si no hay búsqueda
    } else if (selectedOption === "salones") {
      setList(
        salonAll.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1
        )
      );
    } else if (selectedOption === "clases") {
      setList(
        classAll.filter(
          (i) =>
            i.asignatura.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1 ||
            i.docente_nombre.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1 ||
            i.docente_apellido.toLowerCase().indexOf(searchText.toLowerCase()) >
              -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const opciones = [
    {
      title: "clases",
      icon: (
        <MaterialCommunityIcons
          name="google-classroom"
          size={24}
          color="black"
        />
      ),
      action: () => handleOptionSelect("clases"),
    },
    {
      title: "salones",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salones"),
    },
  ];

  const handleOrderClick = () => {
    let newList = [...list];
    if (selectedOption === "salones") {
      newList.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      );
    } else if (selectedOption === "clases") {
      newList.sort((a, b) =>
        a.horario > b.horario ? 1 : b.horario > a.horario ? -1 : 0
      );
    }

    setList(newList);
  };

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false); // Ocultar el SearchBar cuando se presiona la "X"
    setSelectedOption(null); // Resetear la opción seleccionada
    setSelectedItem(null); // Asegurarse de que no haya un ítem seleccionado
    setList([]); // Limpiar la lista
  };
  const handleItemPress = (item) => {
    setSelectedItem(item); // Establecer el ítem seleccionado
    // setSearchText("");
    setList([]);
    // setShowSearchBar(false); // Ocultar el SearchBar
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem) {
        try {
          let data;
          if (selectedOption === "salones") {
            data = await getReportSalon2(selectedItem.id);
          } else if (selectedOption === "clases") {
            data = await getReportClase2(selectedItem.id);
          }
          setAdditionalData(data);
        } catch (error) {
          throw Error("Error fetching additional data:", error);
        }
      }
    };

    fetchAdditionalData();
  }, [selectedItem, selectedOption]); // Dependencias para volver a ejecutar el efecto

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
              cancelButtonTitle="Cancel"
              value={searchText}
              onCancel={handleSearchBarClear}
              onClear={handleSearchBarClear}
            />
            <TouchableOpacity
              onPress={handleOrderClick}
              style={styles.orderButton}
            >
              <MaterialCommunityIcons
                name="order-alphabetical-ascending"
                size={32}
                color={ColorItem.DeepFir}
              />
            </TouchableOpacity>
          </View>
        )}
        {showSearchBar ? "" : <PopupMenu opcions={opciones} />}
      </View>

      {/* //informacion que se mostrara por default */}
      {!selectedOption && (
        <FlatList
          data={reportAll}
          style={styles.list}
          renderItem={({ item }) => <ListViewDefault data={item} />}
          keyExtractor={(item) => item.reporte_id.toString()}
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
            <ListItem
              onPress={() => handleItemPress(item)}
              data={item}
              selectedOption={selectedOption}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>
              No coinciden los resultados
            </Text>
          }
        />
      )}

      {selectedItem && (
        <>
          {selectedOption === "salones" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListFilterSalones data={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
                }
              />
              {/* {additionalData.length > 0 ? (

                // additionalData.map((item, index) => (
                //   <ListFilterSalones
                //   data={item}

                //   />
                //   // <BoxView key={index}>
                //   //   <View
                //   //     style={{
                //   //       marginTop: 5,
                //   //       marginHorizontal: 8,
                //   //       justifyContent: "space-between",
                //   //       flexDirection: "row",
                //   //     }}
                //   //   >
                //   //     <Text style={styles.detailsText}>
                //   //       {capitalizeFirstLetter(item.nombre)}{" "}
                //   //       {capitalizeFirstLetter(item.apellido)}
                //   //     </Text>
                //   //     <DateChip
                //   //       item={new Date(item.fecha).toLocaleDateString()}
                //   //     />
                //   //   </View>

                //   //   <View style={{ flexDirection: "row", marginHorizontal: 8 }}>
                //   //     <Text style={styles.detailsText}>
                //   //       {truncateText(item.asignatura, 15)}
                //   //     </Text>
                //   //   </View>

                //   //   <View
                //   //     style={{
                //   //       marginBottom: 5,
                //   //       marginHorizontal: 8,
                //   //       justifyContent: "space-between",
                //   //       flexDirection: "row",
                //   //     }}
                //   //   >
                //   //     <View
                //   //       style={{
                //   //         width: "80%",
                //   //         flexDirection: "row",
                //   //       }}
                //   //     >
                //   //       <FontAwesome
                //   //         style={{
                //   //           marginTop: 2,
                //   //           marginHorizontal: 10,
                //   //         }}
                //   //         name="commenting"
                //   //         size={20}
                //   //         color={ColorItem.TarnishedSilver}
                //   //       />
                //   //       <TooltipText
                //   //         text={item.comentario}
                //   //         truncateLength={15}
                //   //       />
                //   //     </View>
                //   //     <View
                //   //       style={{
                //   //         width: "20%",
                //   //       }}
                //   //     >
                //   //       <StatusCircle item={item.estado} />
                //   //     </View>
                //   //   </View>
                //   // </BoxView>
                // ))
              ) : (
                <BoxView>
                  <Text style={styles.noResultsText}>
                    No hay datos adicionales
                  </Text>
                </BoxView>
              )} */}
            </>
          )}
          {console.log(
            "additional data verifique si es doblete -------------> ",
            additionalData
          )}
          {selectedOption === "clases" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => <ListFilterClases data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noResultsText}>No hay resultados.</Text>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchArea: {
    backgroundColor: "transparent",
    width: "100%",
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
  orderButton: {
    width: 32,
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  listFromSearchBar: {
    maxHeight: 300,
    marginTop: 5,
    marginHorizontal: 20,
    Width: "40%",
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  noResultsText: {
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
});
