import { useEffect, useState } from "react";
import {
  DeleteDetailHorarioOne,
  getDetailHorario2,
  getDetailHorarioDia,
  getDetailHorarioDocente,
} from "../../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteHorarioOne,
  getHorarioAll,
  getHorarioOne,
} from "../../../../src/services/fetchData/fetchHorarios";
import { ListItemComponentHorario } from "../../Components/customListHorario";
import { ListItemSelectHorario } from "./component/listSelect";
import { ModalComponente } from "../../Components/customModal";
import { CustomSeachBar } from "../comentario/components/seachBar";
import { View, Alert } from "react-native";
import { Reset_Filter } from "../../(SUPERVISOR)/components/button/buttonReset&Filter";
import { ColorItem } from "../../../styles/StylesGlobal";

export const ListHorario = ({
  showSearchBar,
  selectedOption,
  searchText,
  list,
  setSearchText,
  removeFilter,
  handleItemPress,
  multipleSelectedItem,
  modalSelect,
  filters,
  opciones,
  handleOptionSelect,
  multipleSelectedOption,
  applyFilter,
  setMultipleSelectedOption,
  setModalSelect,
  temporalSelectedItem,
}) => {
  const [additionalData, setAdditionalData] = useState([]);
  const fetchAdditionalData = async () => {
    let { docente, horario, dia } = filters;

    try {
      let filteredData;
      if (
        selectedOption === "docente" &&
        multipleSelectedItem[selectedOption]
      ) {
        filteredData = await getDetailHorarioDocente(docente);
      }
      if (
        selectedOption === "horario" &&
        multipleSelectedItem[selectedOption]
      ) {
        filteredData = await getDetailHorario2(horario);
      }
      if (selectedOption === "dia" && multipleSelectedItem[selectedOption]) {
        filteredData = await getDetailHorarioDia(docente, dia);
      }
      setAdditionalData(filteredData || []);
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchAdditionalData();
  }, [filters]);

  const handleFilter = () => {
    const hasTemporalSelection = temporalSelectedItem[selectedOption]
      ? Object.keys(temporalSelectedItem[selectedOption]).length > 0
      : false;

    const hasExistingSelection = multipleSelectedItem[selectedOption]
      ? Object.keys(multipleSelectedItem[selectedOption]).length > 0
      : false;

    if (!hasTemporalSelection && !hasExistingSelection) {
      Alert.alert(
        "Selección requerida",
        "Para filtrar debe tener un item seleccionado"
      );
    } else {
      applyFilter();
    }
  };

  const closemodal = () => {
    if (!multipleSelectedItem[selectedOption]) {
      setMultipleSelectedOption((prev) =>
        prev.filter((option) => option !== selectedOption)
      );
    }
    setModalSelect(false);
  };

  return (
    <>
      <ListItemComponentHorario
        multipleSelectedItem={multipleSelectedItem}
        opciones={opciones}
        handleOptionSelect={handleOptionSelect}
        additionalData={additionalData}
        deleteDataAsociated={DeleteDetailHorarioOne}
        getDataAll={getHorarioAll}
        getDataOne={getHorarioOne}
        deleteData={DeleteHorarioOne}
        modalTitle="Horario"
      />

      {showSearchBar && (
        <ModalComponente
          modalStyle={{
            height: "80%",
          }}
          animationType="slide"
          title={`Seleccione ${selectedOption}`}
          modalVisible={modalSelect}
          transparent={true}
          canCloseModal={true}
          handleCloseModal={closemodal}
          childrenStatic={
            <CustomSeachBar
              searchText={searchText}
              selectedOption={selectedOption}
              setSearchText={setSearchText}
            />
          }
          linearDiviider={true}
          bottomStatic={
            <View
              style={{
                paddingVertical: 15,
                flexDirection:
                  multipleSelectedItem[selectedOption] &&
                  Object.keys(multipleSelectedItem[selectedOption]).length > 0
                    ? "row"
                    : "column",
              }}
            >
              <View
                style={{
                  width:
                    multipleSelectedItem[selectedOption] &&
                    Object.keys(multipleSelectedItem[selectedOption]).length > 0
                      ? "50%"
                      : "",
                  paddingHorizontal: 5,
                }}
              >
                {multipleSelectedItem[selectedOption] &&
                  Object.keys(multipleSelectedItem[selectedOption]).length >
                    0 && (
                    <Reset_Filter
                      backgroundColor={ColorItem.TarnishedSilver}
                      title="Borrar filtros"
                      colorText="#151515"
                      onPress={() => removeFilter(selectedOption)}
                    />
                  )}
              </View>

              <View
                style={{
                  width:
                    multipleSelectedItem[selectedOption] &&
                    Object.keys(multipleSelectedItem[selectedOption]).length > 0
                      ? "50%"
                      : "100%",
                  paddingHorizontal: 5,
                }}
              >
                <Reset_Filter
                  backgroundColor={ColorItem.MediumGreen}
                  title="Filtrar"
                  colorText="white"
                  onPress={handleFilter}
                />
              </View>
            </View>
          }
        >
          {multipleSelectedOption.length > 0 &&
            list.length > 0 &&
            list.map((item) => (
              <ListItemSelectHorario
                multipleSelectedItems={multipleSelectedItem}
                temporalSelectedItem={temporalSelectedItem}
                key={
                  selectedOption === "dia"
                    ? `${item.id}_${item.dia}`
                    : selectedOption === "docente"
                    ? `${item.docente_id}-${item.cedula}`
                    : selectedOption === "horario"
                    ? `${item.id}-${item.cedula}`
                    : undefined
                }
                onPress={handleItemPress}
                data={item}
                selectedOption={selectedOption}
              />
            ))}
        </ModalComponente>
      )}
    </>
  );
};
