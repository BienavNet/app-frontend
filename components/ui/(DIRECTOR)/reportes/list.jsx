import { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import ListItem from "./listaitem";
import { styles } from "../../../styles/StylesGlobal";
import { PopupMenu } from "../../Components/popupMenu";
import {
  getReportClase2,
  getReportSalon2,
} from "../../../../src/services/fetchData/fetchReporte";
import { ListViewDefault } from "./ListDefault";
import { ListFilterSalones } from "./components/listFilterSalon";
import { ListFilterClases } from "./components/listFilterClases";
import {
  useClasesAll,
  useReporteAll,
  useSalonAll,
} from "../../../../src/hooks/customHooks";
import { ModalComponente } from "../../Components/customModal";
import { ChildFilter, ChildFilterX } from "../../(SUPERVISOR)/components/chid/chidFilter";
import { CustomSeachBar } from "../comentario/components/seachBar";
import {
  NofilterSelected,
  NotRegistration,
} from "../../Components/unregistered/noRegistration";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ReportView_Filter = () => {
  const [searchText, setSearchText] = useState("");
  const reportAll = useReporteAll();
  const classAll = useClasesAll();
  const salonAll = useSalonAll();
  const [selectedItem, setSelectedItem] = useState([]);
  const [list, setList] = useState([]); // list con la información de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [additionalData, setAdditionalData] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    setSelectedItem(null);
    setShowSearchBar(true);
    const maping = {
      salones: salonAll,
      clases: classAll,
    };
    setList(maping[option] || []);
    setShowModal(true);
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
          if (selectedOption === "salones") {
            data = await getReportSalon2(selectedItem.id);
          } else if (selectedOption === "clases") {
            data = await getReportClase2(selectedItem.id);
          }
          setAdditionalData(data);
        } catch (error) {
          setAdditionalData([]);
        }
      }
    };

    fetchAdditionalData();
  }, [selectedItem, selectedOption]);
  const filClassRoom = [
    {
      id: "clases",
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
      id: "salones",
      title: "salones",
      icon: (
        <MaterialCommunityIcons name="home-modern" size={24} color="black" />
      ),
      action: () => handleOptionSelect("salones"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-end">
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

        {showSearchBar && (
          <ModalComponente
            modalStyle={{
              height: "80%",
            }}
            modalVisible={showmodal}
            canCloseModal={true}
            title={`Seleccione ${selectedOption}`}
            animationType="slide"
            transparent={true}
            handleCloseModal={handleSearchBarClear}
            childrenStatic={
              <CustomSeachBar
                handleSearchBarClear={handleSearchBarClear}
                searchText={searchText}
                selectedOption={selectedOption}
                setSearchText={setSearchText}
              />
            }
          >
            {/* //lista desplegable segun el filtro seleccionado*/}
            {selectedOption &&
              !selectedItem &&
              (Array.isArray(list) && list.length > 0 ? (
                list.map((item, index) => (
                  <ListItem
                    key={item.id}
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
        {showSearchBar ? "" : <PopupMenu topM={150} opcions={filClassRoom} />}
      </View>

      {/* //informacion que se mostrara por default */}
      {!selectedOption && (
        <FlatList
          data={reportAll}
          renderItem={({ item }) => <ListViewDefault data={item} />}
          keyExtractor={(item) => item.reporte_id.toString()}
          ListEmptyComponent={<NotRegistration />}
        />
      )}

      {selectedItem && (
        <>
          {selectedOption === "salones" && additionalData && (
            <FlatList
              data={additionalData}
              renderItem={({ item }) => <ListFilterSalones data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<NofilterSelected />}
            />
          )}
          {selectedOption === "clases" && additionalData && (
            <FlatList
              data={additionalData}
              // style={styles.list}
              renderItem={({ item }) => <ListFilterClases data={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<NofilterSelected />}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};
