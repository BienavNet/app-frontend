import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  getReportSupervisorCedulaSalon,
  getReportSupervisorID,
} from "../../../../src/services/fetchData/fetchReporte";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem } from "../../../styles/StylesGlobal";
import { getSupervisorCedula } from "../../../../src/services/fetchData/fetchSupervisor";
import { SearchBar } from "@rneui/themed";
import ListFilterReport from "./components/listFilter";
import { ListReportDefault } from "./components/listDefault";
import ListSelectItem from "./components/listSelectItem";
import { ModalComponente } from "../../Components/customModal";
import { Divider } from "@rneui/themed";
import { Reset_Filter } from "../components/button/buttonReset&Filter";
import { useSalonAll } from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ChildFilter } from "../components/chid/chidFilter";

export const ViewReportSup = () => {
  const { CEDULA } = userData();
  const [reportdefault, setReportDefault] = useState([]); // lista que se muestra por defecto
  const [list, setList] = useState([]); // lista de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null); //
  const [searchText, setSearchText] = useState(""); // para buscar en searchBar
  const [selectedItem, setSelectedItem] = useState(null); // item de la lista  seleccionado
  const salonAll = useSalonAll(); // recupero la lista de todos los salones
  const [additionalData, setAdditionalData] = useState([]);
  const [modalSelect, setModalSelect] = useState(false); // estado del modal
  const [temporarySelection, setTemporarySelection] = useState(null); // obtiene el item temporal mientras se le aplica en el boton de filtrar

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
  }, [CEDULA]);

  useFocusEffect(
    useCallback(() => {
      fetchReportSupervisorID();
      // fetchSalonAll();
    }, [fetchReportSupervisorID])
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    switch (option) {
      case "salones":
        setList(salonAll);
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
    }
  }, [searchText, selectedOption]);

  const handleItemPress = (item, isSelected) => {
  console.log("item : ",item + " is selected : ", isSelected)
    if (isSelected) {
      setTemporarySelection(item); // Si se selecciona, guarda el ítem
    } else {
      setTemporarySelection(null);
    }
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem && selectedOption) {
        try {
          let data;
          if (selectedOption === "salones") {
            data = await getReportSupervisorCedulaSalon(CEDULA, selectedItem.id);
            console.log(data, "datos del reporte supervisor cedula y salon");
          }
          setAdditionalData(data);
        } catch (error) {
          throw Error("Error fetching additional data:", error);
        }
      }
    };

    fetchAdditionalData();
  }, [selectedItem, selectedOption]); // Dependencias para volver a ejecutar el efecto

  const handleCloseSelectOption = async () => {
    setModalSelect(false);
    setSearchText("");
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
  };

  const applyFilter = () => {
    if (temporarySelection) {
      setSelectedItem(temporarySelection);
      setModalSelect(false);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ChildFilter
          selectedItem={selectedItem}
          title="Salones "
          action={() => handleOptionSelect("salones")}
        />

        {/* //informacion que se mostrara por default */}
        {!selectedOption && (
          <FlatList
            data={reportdefault}
            style={styles.list}
            renderItem={({ item }) => <ListReportDefault data={item} />}
            keyExtractor={(item) =>
              `${item.reporte_id.toString()}-${item.clase_id.toString()}`
            }
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No hay resultados.</Text>
            }
          />
        )}

        {/* //informacion que se mostrara segun el filtro seleccionado */}
        {selectedItem && (
          <>
            {selectedOption === "salones" && additionalData && (
              <>
                <FlatList
                  data={additionalData}
                  style={styles.list}
                  renderItem={({ item }) => <ListSelectItem data={item} />}
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

      <ModalComponente
        modalStyle={{ height: "75%" }}
        handleCloseModal={handleCloseSelectOption}
        animationType="slide"
        transparent={true}
        modalVisible={modalSelect}
        canCloseModal={true}
      >
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
          />
        </View>
        <Divider
          style={{
            paddingVertical: 5,
          }}
          width={1}
        />
        {/* //lista desplegable segun el filtro seleccionado*/}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >

          {selectedOption &&
            // !selectedItem &&
            list.map((item) => (
              <ListFilterReport
                data={item}
                temporarySelection={temporarySelection}
                key={item.id.toString()}
                selectedOption={selectedOption}
                onPress={handleItemPress}
              />
            ))}

          <Divider
            style={{
              paddingVertical: 5,
            }}
            width={1}
          />
          <View
            style={{
              paddingVertical: 15,
              flexDirection: selectedItem ? "row" : "column",
            }}
          >
            <View
              style={{
                width: selectedItem ? "50%" : "",
                paddingHorizontal: 5,
              }}
            >
              {selectedItem && (
                <Reset_Filter
                  backgroundColor={ColorItem.TarnishedSilver}
                  title="Borrar filtros"
                  colorText="#151515"
                  onPress={handleCloseSelectOption}
                />
              )}
            </View>

            <View
              style={{
                width: selectedItem ? "50%" : "100%",
                paddingHorizontal: 5,
              }}
            >
              <Reset_Filter
                backgroundColor={ColorItem.MediumGreen}
                title="Filtrar"
                colorText="white"
                onPress={applyFilter}
              />
            </View>
          </View>
        </View>
      </ModalComponente>
    </>
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
    justifyContent: "center",
    alignItems: "center",

    // flexDirection: "row",
    // alignItems: "center",
  },
  search: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: ColorItem.Zircon,
    flex: 1,
    fontSize: 19,
  },
});
