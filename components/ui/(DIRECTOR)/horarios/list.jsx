import { useEffect, useState } from "react";
import {
  DeleteDetailHorarioOne,
  getDetailHorario2,
  getDetailHorarioDocente,
} from "../../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteHorarioOne,
  getHorarioAll,
  getHorarioOne,
} from "../../../../src/services/fetchData/fetchHorarios";
import { ListItemComponentHorario } from "../../Components/customListHorario";
import { SearchBar } from "@rneui/themed";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { ColorItem } from "../../../styles/StylesGlobal";
import { ListItemSelectHorario } from "./component/listSelect";
import { ListFilterHorarioDocente } from "./component/listFilterdocente";
import { ListFilterHorario2 } from "./component/listFilterHorario";
export const ListHorario = ({
  showSearchBar,
  searchText,
  selectedOption,
  setList,
  setSearchText,
  selectedItem,
  setSelectedItem,
  handleSearchBarClear,
  handleOptionSelect,
  list,horarioAll,docenteall
  
}) => {
  const [additionalData, setAdditionalData] = useState([]);
  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
    } else if (selectedOption === "docente") {
      setList(
        docenteall.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.apellido.toString().indexOf(searchText.toLowerCase()) > -1
        )
      );
    } else if (selectedOption === "horario") {
      setList(
        horarioAll.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setList([]);
  };
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem && selectedOption) {
        try {
          let data;
          if (selectedOption === "docente") {
            data = await getDetailHorarioDocente(selectedItem.cedula);
            setAdditionalData(data);
          } 
          // else if (selectedOption === "horario") {
          //   data = await getDetailHorario2(selectedItem.id);
          // }
          if (data) { // Solo actualiza si data tiene contenido
            setAdditionalData(data);
            console.log("entro a data");
          } else {

            setAdditionalData([]); // Si no hay datos, asegúrate de limpiar el estado
            console.log("entro a sin data");
          }
        } catch (error) {
          throw Error("Error fetching additional data:", error);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);
  return (
    <>
      {showSearchBar && (
        <View style={styles.searchArea}>
          <SearchBar
            platform="android"
            containerStyle={styles.search}
            inputContainerStyle={{ backgroundColor: "#fff" }}
            onChangeText={(t) => setSearchText(t)}
            placeholder={`Buscar ${selectedOption}`}
            placeholderTextColor={ColorItem.DeepFir}
            cancelButtonTitle="Cancel"
            value={searchText}
            onCancel={handleSearchBarClear}
            onClear={handleSearchBarClear}
          />

          {/* terminar componente de cancelar searchBar */}
        </View>
      )}
    
        {selectedOption && !selectedItem && (
          <FlatList
            data={list}
            // style={styles.listFromSearchBar}
            renderItem={({ item }) => (
              <ListItemSelectHorario
                onPress={() => handleItemPress(item)}
                data={item}
                selectedOption={selectedOption}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text
              >
                No coinciden los resultados
              </Text>
            }
          />
        )}
    
      {selectedItem && (
        <>
        {console.log("options", selectedOption, additionalData)}
          {selectedOption === "docente" && additionalData && (
            <>
              <FlatList
                data={additionalData}
                style={styles.list}
                renderItem={({ item }) => (
                  <ListFilterHorarioDocente data={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <Text style={styles.noResultsText}>No hay resultados.</Text>
                }
              />
            </>
          )}
          {selectedOption === "horario" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => <ListFilterHorario2 data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noResultsText}>No hay resultados.</Text>
              }
            />
          )}
        </>
      )}

      {!selectedOption && (
        <ListItemComponentHorario
          deleteDataAsociated={DeleteDetailHorarioOne}
          getDataAll={getHorarioAll}
          getDataOne={getHorarioOne}
          deleteData={DeleteHorarioOne}
          modalTitle="Horario"
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  searchArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    width: "100%",
    height: "10%",
  },
  search: {
    borderBottomWidth: 1,
    borderBottomColor: ColorItem.KellyGreen,
    backgroundColor: "transparent",
    height: "100%",
    width: "80%",
    fontSize: 19,
  },
});
