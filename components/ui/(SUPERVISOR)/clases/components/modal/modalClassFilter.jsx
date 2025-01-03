import { View, Alert } from "react-native";
import { Reset_Filter } from "../../../components/button/buttonReset&Filter";
import { ColorItem } from "../../../../../styles/StylesGlobal";
import { CustomSeachBar } from "../../../../(DIRECTOR)/comentario/components/seachBar";
import { ModalComponente } from "../../../../Components/Modals/customModal";

export const ClassFilter = ({
  removeFilter,
  selectedOption,
  multipleSelectedItem,
  applyFilter,
  children,
  modalSelect,
  searchText,
  setSearchText,
  setModalSelect,
  setMultipleSelectedOption,
  temporalSelectedItem,
  setMultipleSelectedItem,
}) => {
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
    <ModalComponente
      linearDiviider={true}
      handleCloseModal={closemodal}
      modalStyle={{ height: "75%" }}
      animationType="slide"
      transparent={true}
      modalVisible={modalSelect}
      canCloseModal={true}
      title={`Seleccione ${selectedOption}`}
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
              Object.keys(multipleSelectedItem[selectedOption]).length > 0 && (
                <Reset_Filter
                  backgroundColor={ColorItem.TarnishedSilver}
                  title="Borrar filtros"
                  colorText="#151515"
                  onPress={()=> removeFilter(selectedOption)}
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
      <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
        {children}
      </View>
    </ModalComponente>
  );
};
