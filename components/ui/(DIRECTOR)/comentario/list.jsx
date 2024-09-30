import {
  DeleteComentarioOne,
  getComentarioAll,
  getComentarioOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListItemComentario } from "../../Components/customListComentario";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ColorItem } from "../../../styles/StylesGlobal";
import { PopupMenu } from "../../Components/popupMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getSalon } from "../../../../src/services/fetchData/fetchSalon";
import { getDocenteAll } from "../../../../src/services/fetchData/fetchDocente";
import {
  getComentarioDocenteDocente,
  getComentarioSalonOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListSelectItem } from "./components/listSelect";
import { ListFilterComentarioDocente } from "./components/listFilterDocente";
import { ListFilterComentarioSalon } from "./components/listFilterSalon";
import { useDocenteAll, useSalonAll } from "../../../../src/hooks/customHooks";

export const ListComentario = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const salonAll = useSalonAll();
  const docenteall = useDocenteAll();
  const [additionalData, setAdditionalData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  
  const handleOrderClick = () => {
    console.log("Ordenar por...");
  };

  // const fetchDocenteAll = useCallback(async () => {
  //   try {
  //     const res = await getDocenteAll();
  //     setDocenteAll(res);
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // }, []);

  // const fetchSalonALL = useCallback(async () => {
  //   try {
  //     const res = await getSalon();
  //     setSalonAll(res);
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchDocenteAll();
  //   }, [fetchDocenteAll])
  // );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);

    switch (selectedOption) {
      case "docente":
        setList(docenteall);
        break;
      case "salon":
        setList(salonAll);
        break;
      default:
        setList([]);
    }
  };

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
    } else if (selectedOption === "salon") {
      setList(
        salonAll.filter(
          (i) =>
            i.nombre.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            i.numero_salon.toString().indexOf(searchText) > -1
        )
      );
    }
  }, [searchText, selectedOption]);

  const opciones = [
    {
      title: "docente",
      icon: <FontAwesome5 name="user-circle" size={24} color="black" />,
      action: () => handleOptionSelect("docente"),
    },
    {
      title: "salon",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salon"),
    },
  ];

  const handleSearchBarClear = () => {
    setSearchText("");
    setShowSearchBar(false);
    setSelectedOption(null);
    setSelectedItem(null);
    setList([]);
  };
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setList([]);
  };
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem) {
        try {
          let data;
          if (selectedOption === "docente") {
            data = await getComentarioDocenteDocente(selectedItem.cedula);
          } else if (selectedOption === "salon") {
            data = await getComentarioSalonOne(selectedItem.id);
          }
          setAdditionalData(data);
        } catch (error) {
          throw Error("Error fetching additional data:", error);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {showSearchBar && (
          <View style={styles.searchArea}>
            <SearchBar
              platform="android"
              containerStyle={styles.search}
              inputContainerStyle={{ backgroundColor: "#fff" }}
              onChangeText={(t) => setSearchText(t)}
              placeholder={`Buscar ${selectedOption}`}
              placeholderTextColor={ColorItem.DeepFir}
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
                size={24}
                color={ColorItem.DeepFir}
              />
            </TouchableOpacity>
          </View>
        )}
        {showSearchBar ? "" : <PopupMenu opcions={opciones} />}
      </View>
      <>
        {selectedOption && !selectedItem && (
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <ListSelectItem
                onPress={() => handleItemPress(item)}
                data={item}
                selectedOption={selectedOption}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text
              //  style={styles.noResultsText}
              >
                No coinciden los resultados
              </Text>
            }
          />
        )}
      </>

      {selectedItem && (
        <>
          {selectedOption === "docente" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => <ListFilterComentarioDocente data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noResultsText}>No hay resultados.</Text>
              }
            />
          )}

          {selectedOption === "salon" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => <ListFilterComentarioSalon data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noResultsText}>No hay resultados.</Text>
              }
            />
          )}
        </>
      )}

      {!selectedOption && (
        <ListItemComentario
          getDataAll={getComentarioAll}
          getDataOne={getComentarioOne}
          deleteData={DeleteComentarioOne}
          modalTitle="Comentarios"
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
});
