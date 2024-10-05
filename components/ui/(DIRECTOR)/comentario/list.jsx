import {
  DeleteComentarioOne,
  getComentarioAll,
  getComentarioOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListItemComentario } from "../../Components/customListComentario";
import { FlatList, View, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { styles } from "../../../styles/StylesGlobal";
import { PopupMenu } from "../../Components/popupMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  getComentarioDocenteDocente,
  getComentarioSalonOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListSelectItem } from "./components/listSelect";
import { ListFilterComentarioDocente } from "./components/listFilterDocente";
import { ListFilterComentarioSalon } from "./components/listFilterSalon";
import { useDocenteAll, useSalonAll } from "../../../../src/hooks/customHooks";
import { ModalComponente } from "../../Components/customModal";
import { CustomSeachBar } from "./components/seachBar";
import {
  ChildFilter,
  ChildFilterOutline,
} from "../../(SUPERVISOR)/components/chid/chidFilter";
import { ListItem } from "@react-native-material/core";
export const ListComentario = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const salonAll = useSalonAll();
  const docenteall = useDocenteAll();
  const [additionalData, setAdditionalData] = useState([]);
  console.log(additionalData, "setAdditionalData");
  const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
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
    setShowModal(false);
  };
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setList([]);
    setShowModal(false);
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
          setAdditionalData([]);
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
        {selectedItem && (
        <>
          {selectedOption && additionalData &&(
 <ChildFilterOutline
 title={selectedOption}
 selectedItem={selectedItem}
 action={handleSearchBarClear}
/>
          )}
          </>
        )}
        <PopupMenu opcions={opciones} />
      </View>

      {selectedItem && (
        <>
          {selectedOption === "docente" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => (
                <ListFilterComentarioDocente data={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      padding: 10,
                      fontSize:16,
                      fontWeight: "semibold",
                      textAlign: "center",
                    }}
                  >
                    No hay resultados para el filtro seleccionado.
                  </Text>
                </View>
              }
            />
          )}

          {selectedOption === "salon" && additionalData && (
            <FlatList
              data={additionalData}
              style={styles.list}
              renderItem={({ item }) => (
                <ListFilterComentarioSalon data={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      padding: 10,
                      fontSize:16,
                      fontWeight: "semibold",
                      textAlign: "center",
                    }}
                  >
                    No hay resultados para el filtro seleccionado.
                  </Text>
                </View>
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

      {showSearchBar && (
        <ModalComponente
          handleCloseModal={handleSearchBarClear}
          modalStyle={{ height: "90%" }}
          canCloseModal={true}
          title={`Seleccione un ${selectedOption}`}
          modalVisible={showModal}
          animationType="slide"
          transparent={false}
          childrenStatic={
            <CustomSeachBar
              handleSearchBarClear={handleSearchBarClear}
              searchText={searchText}
              selectedOption={selectedOption}
              setSearchText={setSearchText}
            />
          }
        >
          {selectedOption &&
            !selectedItem &&
            (Array.isArray(list) && list.length > 0 ? (
              list.map((item, index) => (
                <ListSelectItem
                  key={item.id || index}
                  onPress={() => handleItemPress(item)}
                  data={item}
                  selectedOption={selectedOption}
                />
              ))
            ) : (
              <View
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      padding: 10,
                      fontSize:16,
                      fontWeight: "semibold",
                      textAlign: "center",
                    }}
                  >
                    No hay resultados para el filtro seleccionado.
                  </Text>
                </View>
            ))}
        </ModalComponente>
      )}
    </>
  );
};
