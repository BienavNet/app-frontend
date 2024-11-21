import { useCallback, useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import {
  getReportSupervisorCedulaSalon,
  getReportSupervisorID,
} from "../../../../src/services/fetchData/fetchReporte";
import { useFocusEffect } from "@react-navigation/native";
import { ColorItem, styles } from "../../../styles/StylesGlobal";
import { getSupervisorCedula } from "../../../../src/services/fetchData/fetchSupervisor";
import ListFilterReport from "./components/listFilter";
import { ListReportDefault } from "./components/listDefault";
import ListSelectItem from "./components/listSelectItem";
import { ModalComponente } from "../../Components/customModal";
import { Reset_Filter } from "../components/button/buttonReset&Filter";
import { useSalonAll } from "../../../../src/hooks/customHooks";
import { userData } from "../../../../src/hooks/use/userData";
import { ChildFilter } from "../components/chid/chidFilter";
import { CustomSeachBar } from "../../(DIRECTOR)/comentario/components/seachBar";
import { DividerLine } from "../../Components/dividerline/dividerLine";
import { NofilterSelected } from "../../Components/unregistered/noRegistration";

export const ViewReportSup = () => {
  const { CEDULA } = userData();
  const salonAll = useSalonAll(); // hook de la lista de salons

  const [reportdefault, setReportDefault] = useState([]); // lista que se muestra por defecto
  const [list, setList] = useState([]); // lista de los datos filtrados
  const [selectedOption, setSelectedOption] = useState(null); //
  const [searchText, setSearchText] = useState(""); // para buscar en searchBar
  const [selectedItem, setSelectedItem] = useState(null); // item de la lista  seleccionado

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
          setReportDefault([]);
        }
      }
    } catch (error) {
      throw Error("Failted to get SupervisorID", error);
    }
  }, [CEDULA]);

  useFocusEffect(
    useCallback(() => {
      fetchReportSupervisorID();
    }, [fetchReportSupervisorID])
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText("");
    const Maping = { salones: salonAll };
    setList(Maping[option] || []);
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
    if (isSelected) {
      setTemporarySelection(item);
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
            data = await getReportSupervisorCedulaSalon(
              CEDULA,
              selectedItem.id
            );
          }
          setAdditionalData(data);
        } catch (error) {
          setAdditionalData([]);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);

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
            ListEmptyComponent={<NofilterSelected />}
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
        bottomStatic={
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
        </View>
      </ModalComponente>
    </>
  );
};
