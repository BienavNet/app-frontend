import {
  DeleteComentarioOne,
  getComentarioAll,
  getComentarioOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListItemComentario } from "../../Components/customListComentario";
import { FlatList, View } from "react-native";
import { styles } from "../../../styles/StylesGlobal";
import { PopupMenu } from "../../Components/popupMenu";
import { useState, useEffect } from "react";
import {
  getComentarioDocenteDocente,
  getComentarioSalonOne,
} from "../../../../src/services/fetchData/fetchComentario";
import { ListSelectItem } from "./components/listSelect";
import { ListFilterComentarioDocente } from "./components/listFilterDocente";
import { ListFilterComentarioSalon } from "./components/listFilterSalon";
import { useDocenteAll, useSalonAll } from "../../../../src/hooks/customHooks";
import { CustomSeachBar } from "./components/seachBar";
import { ChildFilterX } from "../../(SUPERVISOR)/components/chid/chidFilter";
import { NofilterSelected } from "../../Components/unregistered/noRegistration";
import { FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import { ModalComponente } from "../../Components/Modals/customModal";

export const ListComentario = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const salonAll = useSalonAll();
  const docenteall = useDocenteAll();
  const [additionalData, setAdditionalData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
    const Mapping ={
      docente:docenteall,
      salon:salonAll
    }
    setList(Mapping[option] || []);
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
          setAdditionalData(data || []);
        } catch (error) {
          setAdditionalData([]);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);
  
  const filDocenClass = [
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
            {selectedOption && additionalData && (
              <ChildFilterX
                title={selectedOption}
                selectedItem={selectedItem}
                action={handleSearchBarClear}
              />
            )}
          </>
        )}
        <PopupMenu rightM={10} topM={100} opcions={filDocenClass} />
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
              ListEmptyComponent={<NofilterSelected />}
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
              ListEmptyComponent={<NofilterSelected />}
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
              <NofilterSelected />
            ))}
        </ModalComponente>
      )}
    </>
  );
};
