import { View, StyleSheet, ScrollView } from "react-native";
import { ModalComponente } from "../../../../Components/customModal";
import { Divider, SearchBar } from "@rneui/themed";
import { Reset_Filter } from "../../../components/button/buttonReset&Filter";
import { ColorItem } from "../../../../../styles/StylesGlobal";
import { DividerLine } from "../../../../Components/dividerline/dividerLine";

export const ClassFilter = ({
  selectedOption,
  temporarySelection,
  applyFilter,
  selectedItem,
  searchText,
  handleCloseSelectOption,
  handleItemPress,
  children,
  modalSelect,
  setSearchText,
}) => {
  return (
    <ModalComponente
      modalStyle={{ height: "75%" }}
      handleCloseModal={handleCloseSelectOption}
      animationType="slide"
      transparent={true}
      modalVisible={modalSelect}
      canCloseModal={true}
    >
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
      <DividerLine />
      
      {/* //lista desplegable segun el filtro seleccionado*/}
      <View
        style={{
          paddingVertical: 10,
          maxHeight:360,
          minHeight:360,
        }}
      >
          {children}
      </View>

      <DividerLine/>

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
    </ModalComponente>
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
  search: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: ColorItem.Zircon,
    flex: 1,
    fontSize: 19,
  },
});
