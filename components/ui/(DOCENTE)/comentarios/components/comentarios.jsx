import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import { DividerLine } from "../../../Components/dividerline/dividerLine";
import { useComentarioDocenteSalon, useSalonAll } from "../../../../../src/hooks/customHooks";
import { getComentarioDocenteDocente } from "../../../../../src/services/fetchData/fetchComentario";
import { userData } from "../../../../../src/hooks/use/userData";
import { ChildFilter } from "../../../(SUPERVISOR)/components/chid/chidFilter";
import { ModalComponente } from "../../../Components/customModal";
import { Reset_Filter } from "../../../(SUPERVISOR)/components/button/buttonReset&Filter";
import { CustomSeachBar } from "../../../(DIRECTOR)/comentario/components/seachBar";
import { NofilterSelected } from "../../../Components/unregistered/noRegistration";
import { ListReportDefault } from "../../../(SUPERVISOR)/reportes/components/listDefault";
import { ListComentarioDocenteSalonDefault } from "./listDefault";
import ListFilterReport from "../../../(SUPERVISOR)/reportes/components/listFilter";
import ListSelectItem from "../../../(SUPERVISOR)/reportes/components/listSelectItem";
import ListFilterComentario from "./filterSalon";

export const IndexComentarioDocente = () => {
  const { CEDULA } = userData();
  const salonAll = useSalonAll();

  const [reportdefault, setReportDefault] = useState([]); // lista que se muestra por defecto
  const [list, setList] = useState([]); // lista de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null); //
  const [searchText, setSearchText] = useState(""); // para buscar en searchBar
  const [selectedItem, setSelectedItem] = useState(null); // item de la lista  seleccionado

  const [additionalData, setAdditionalData] = useState([]);
  const [modalSelect, setModalSelect] = useState(false); // estado del modal
  const [temporarySelection, setTemporarySelection] = useState(null); // obtiene el item temporal mientras se le aplica en el boton de filtrar


  const fetchComentarioDocenteCedula= useCallback(async () => {
    try {
      const res = await getComentarioDocenteDocente(CEDULA);
      console.log(res, "fetchComentarioDocenteCedula");
      setReportDefault(res);
    } catch (error) {
      setReportDefault([])
    }
  }, [CEDULA]);

  useFocusEffect(
    useCallback(() => {
      fetchComentarioDocenteCedula();
    }, [fetchComentarioDocenteCedula])
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    const Maping = { salon: salonAll };
    setList(Maping[option] || []);
    setModalSelect(true);
  };

  useEffect(() => {
    if (searchText === "" && selectedOption) {
      handleOptionSelect(selectedOption);
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

  const handleItemPress = (item, isSelected) => {
    if (isSelected) {
      setTemporarySelection(item);
    } else {
      setTemporarySelection(null);
    }
  };

  const comentarioDocenteSalon = useComentarioDocenteSalon(CEDULA,selectedItem ? selectedItem.id : 0);
//revisar bug cuando comentarioDocenteSalon es vacio
  useEffect(() => {
    if (selectedItem && selectedOption === "salon") {
      setAdditionalData(comentarioDocenteSalon);
    }
  }, [selectedItem, selectedOption, comentarioDocenteSalon]);

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
      <SafeAreaView>
        <ChildFilter
          selectedItem={selectedItem}
          title="Salones "
          action={() => handleOptionSelect("salon")}
        />

        {/* //informacion que se mostrara por default */}
        {!selectedOption && (
          <FlatList
            data={reportdefault}
            style={styles.list}
            renderItem={({ item }) => <ListComentarioDocenteSalonDefault data={item} />}
            keyExtractor={(item) =>item.id.toString()
            }
            ListEmptyComponent={
              <NofilterSelected/>
            }
          />
        )}

        {/* //informacion que se mostrara segun el filtro seleccionado */}
        {selectedItem && (
          <>
            {selectedOption === "salon" && additionalData && (
              <>
                <FlatList
                  data={additionalData}
                  style={styles.list}
                  renderItem={({ item }) => <ListFilterComentario data={item} />}
                  keyExtractor={(item) =>item.id.toString()
                  }
                  ListEmptyComponent={<NofilterSelected />}
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
        title={`Seleccione ${selectedOption}`}
        canCloseModal={true}
        childrenStatic={
          <CustomSeachBar
            searchText={searchText}
            setSearchText={setSearchText}
            selectedOption={selectedOption}
          />
        }
      >
        <DividerLine />

        {/* //lista desplegable segun el filtro seleccionado*/}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          {selectedOption &&
            list.map((item) => (
              <ListFilterReport
                data={item}
                temporarySelection={temporarySelection}
                key={item.id.toString()}
                selectedOption={selectedOption}
                onPress={handleItemPress}
              />
            ))}

          <DividerLine />
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