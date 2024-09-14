import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { getReportSupervisorCedulaSalon, getReportSupervisorID } from "../../../../src/services/fetchData/fetchReporte";
import { useAuth } from "../../../../src/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem } from "../../../styles/StylesGlobal";
import { getSupervisorCedula } from "../../../../src/services/fetchData/fetchSupervisor";
import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { PopupMenu } from "../../Components/popupMenu";
import ListFilterReport from "./components/listFilter";
import { ListReportDefault } from "./components/listDefault";
import { getSalon } from "../../../../src/services/fetchData/fetchSalon";
import ListSelectItem from "./components/listSelectItem";
export const ViewReportSup = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  const [reportdefault, setReportDefault] = useState([]);
  const [list, setList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [salonAll, setSalonAll] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  console.log("additionalData", additionalData)


  const fetchSalonAll = useCallback(async () => {
    try {
      const res = await getSalon();
      console.log("response del all salon", res);
      setSalonAll(res);
    } catch (error) {
      throw Error("Failted to get SupervisorID", error);
    }
  }, []);

  const fetchReportSupervisorID = useCallback(async () => {
    try {
      const res = await getSupervisorCedula(CEDULA);
      const supervisorID = res[0]?.supervisor_id;
      if (supervisorID) {
        try {
          const res = await getReportSupervisorID(supervisorID);
          setReportDefault(res);
        } catch (error) {
          throw Error("Failted to get reportSupervisorID", error);
        }
      }
    } catch (error) {
      throw Error("Failted to get SupervisorID", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReportSupervisorID();
      fetchSalonAll();
    }, [fetchReportSupervisorID, fetchSalonAll])
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
      default:
        setList([]);
    }
  };

  const opciones = [
    {
      title: "salones",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salones"),
    },
  ];


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
    }
  }, [searchText, selectedOption]);

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false); 
    setSelectedOption(null); 
    setSelectedItem(null); 
    setList([]);
  };
  const handleItemPress = (item) => {
    setSelectedItem(item); // Establecer el ítem seleccionado
    setList([]);
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem) {
        try {
          let data;
          if (selectedOption === "salones") {
            data = await getReportSupervisorCedulaSalon(CEDULA, selectedItem.id);
            console.log(data, "datos del reposrte supervisor cedula y salon");
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
          </View>
        )}
        {showSearchBar ? "" : <PopupMenu opcions={opciones} />}
      </View>

      {/* //informacion que se mostrara por default */}
      {!selectedOption && (
        <FlatList
          data={reportdefault}
          style={styles.list}
          renderItem={({ item }) => <ListReportDefault data={item} />}
          keyExtractor={(item) => (`${item.reporte_id.toString()}-${item.clase_id.toString()}`)}
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
            <ListFilterReport
              data={item}
              selectedOption={selectedOption}
              onPress={() => handleItemPress(item)}
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

      {selectedItem && (
        <>
          {selectedOption === "salones" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => <ListSelectItem data={item} />}
                keyExtractor={(item) => `${item.clase.toString()}-${item.docente_id}`}
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
  },  searchArea: {
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
});
