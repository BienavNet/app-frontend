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
import { FlatList, Text } from "react-native";
import { ListItemSelectHorario } from "./component/listSelect";
import { ListFilterHorarioDocente } from "./component/listFilterdocente";
import { ListFilterHorario2 } from "./component/listFilterHorario";
import { ModalComponente } from "../../Components/customModal";
import { CustomSeachBar } from "../comentario/components/seachBar";
import { styles } from "../../../styles/StylesGlobal";
import { ChildFilterOutline } from "../../(SUPERVISOR)/components/chid/chidFilter";
import { View } from "react-native";

export const ListHorario = ({
  selectedFilters,
  showSearchBar,
  selectedOption,
  searchText,
  list,
  selectedItem,
  setSearchText,
  handleSearchBarClear,
  handleItemPress,
  showModal,
}) => {
  console.log("selectedFilters", selectedFilters)
  const [additionalData, setAdditionalData] = useState([]);
console.log(additionalData, "additionalData")
console.log(list, "list")

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedItem && selectedOption) {
        try {
          let data;
          if (selectedOption === "docente") {
            data = await getDetailHorarioDocente(selectedItem.cedula);
            setAdditionalData(data);
          } else if (selectedOption === "horario") {
            data = await getDetailHorario2(selectedItem.id);
          }
          setAdditionalData(data || []);
        } catch (error) {
          setAdditionalData([]);
        }
      }
    };
    fetchAdditionalData();
  }, [selectedItem, selectedOption]);
  
  const filteredData = selectedOption && selectedItem ? additionalData : [];
  console.log("filterer", filteredData)
  return (
    <>
      {selectedItem && (
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {selectedOption && additionalData && (
            <ChildFilterOutline
              title={selectedOption}
              selectedItem={selectedItem}
              action={handleSearchBarClear}
            />
          )}
        </View>
      )}

      <ListItemComponentHorario
        filteredData={filteredData}
        deleteDataAsociated={DeleteDetailHorarioOne}
        getDataAll={getHorarioAll}
        getDataOne={getHorarioOne}
        deleteData={DeleteHorarioOne}
        modalTitle="Horario"
      />
      {showSearchBar && (
        <ModalComponente
          modalStyle={{
            height: "85%",
          }}
          animationType="slide"
          title={`Seleccione ${selectedOption}`}
          modalVisible={showModal}
          transparent={true}
          canCloseModal={true}
          handleCloseModal={handleSearchBarClear}
          childrenStatic={
            <CustomSeachBar
              searchText={searchText}
              handleSearchBarClear={handleSearchBarClear}
              selectedOption={selectedOption}
              setSearchText={setSearchText}
            />
          }
        >
         
          {console.log(list, "list QQQQQQQQQ")}
          {selectedOption &&
            !selectedItem &&
            list.map((item) => (
              <ListItemSelectHorario
                key={
                  selectedOption === "docente" && selectedOption === "dia"
                  ? `${item}` // Si es docente y se seleccionó un día
                  : selectedOption === "docente"
                  ? `${item.docente_id}-${item.apellido}.${item.nombre}/${item.cedula}` // Si solo es docente
                  : selectedOption === "horario"
                  ? `${item.docente_id}-${item.apellido}.${item.nombre}R${item.asignatura}.${item.cedula}` // Si es horario
                  : undefined
                }
                onPress={() => handleItemPress(item)}
                data={item}
                selectedOption={selectedOption}
              />
            ))}
        </ModalComponente>
      )}
    </>
  );
};
