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
// import { FlatList, Text } from "react-native";
import { ListItemSelectHorario } from "./component/listSelect";
// import { ListFilterHorarioDocente } from "./component/listFilterdocente";
// import { ListFilterHorario2 } from "./component/listFilterHorario";
import { ModalComponente } from "../../Components/customModal";
import { CustomSeachBar } from "../comentario/components/seachBar";
// import { styles } from "../../../styles/StylesGlobal";
import { ChildFilterOutline } from "../../(SUPERVISOR)/components/chid/chidFilter";
import { View } from "react-native";

export const ListHorario = ({
  // selectedFilters,
  setSelectedItem,
  showSearchBar,
  selectedOption,
  searchText,
  list,
  // selectedItem,
  setSearchText,
  // handleSearchBarClear,
  handleItemPress,
  setMultipleSelectedItem,
  multipleSelectedItem,
  showModal,
  applyFilter,
  temporalSelectedItem,
  setTemporalSelectedItem,
  multipleSelectedOption,
  setMultipleSelectedOption,
  filters, opciones, handleOptionSelect
}) => {
  console.log("selecteditem list.jsx", multipleSelectedItem, selectedOption);

  const [additionalData, setAdditionalData] = useState([]);
  const fetchAdditionalData = async () => {
    let { docente, horario, dia } = filters;
    try {
      if (selectedOption == "docente") {
        docente = await getDetailHorarioDocente(docente);
      } else if (selectedOption === "horario") {
        horario = await getDetailHorario2(horario);
      } else if (selectedOption === "dia") {
        dia = await getDetailHorarioDia(docente, dia);
      }
      setAdditionalData([docente, horario, dia] || []);
    } catch (error) {
      setAdditionalData([]);
    }
  };
  useEffect(() => {
    fetchAdditionalData();
  }, [filters]);

  return (
    <>
      {Object.keys(multipleSelectedItem).length > 0 && (
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {multipleSelectedOption.length > 0 && additionalData && (
            <ChildFilterOutline
              opciones={opciones}
              handleOptionSelect={handleOptionSelect}
              // action={handleSearchBarClear}
            />
          )}
        </View>
      )}

      <ListItemComponentHorario
        // filteredData={filteredData}
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
          // title={`Seleccione ${selectedOption}`}
          modalVisible={showModal}
          transparent={true}
          canCloseModal={true}
          // handleCloseModal={handleSearchBarClear}
          childrenStatic={
            <CustomSeachBar
              searchText={searchText}
              // handleSearchBarClear={handleSearchBarClear}
              selectedOption={selectedOption}
              setSearchText={setSearchText}
            />
          }
        >
          {selectedOption &&
            !multipleSelectedItem &&
            list.map((item) => (
              <ListItemSelectHorario
                key={
                  selectedOption.includes("docente") &&
                  selectedOption.includes("dia")
                    ? `${item.id}_${item.dia}`
                    : selectedOption.includes("docente")
                    ? `${item.docente_id}-${item.apellido}.${item.nombre}/${item.cedula}`
                    : selectedOption.includes("horario")
                    ? `${item.docente_id}-${item.apellido}.${item.nombre}/${item.asignatura}.${item.cedula}`
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

// <ListItemSelectHorario
//   key={
//     selectedOption === "docente" && selectedOption === "dia"
//       ? `${item.id}/_${item.dia}` // Si es docente y se seleccionó un día
//       : selectedOption === "docente"
//       ? `${item.docente_id}-${item.apellido}.${item.nombre}/${item.cedula}` // Si solo es docente
//       : selectedOption === "horario"
//       ? `${item.docente_id}-${item.apellido}.${item.nombre}/${item.asignatura}.${item.cedula}` // Si es horario
//       : undefined
//   }
//   onPress={() => handleItemPress(item)}
//   data={item}
//   selectedOption={selectedOption}
// />

{
  /* {selectedItem && (
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          {selectedOption.length > 0 && additionalData && 
            selectedOption.map((option) => (
              <ChildFilterOutline
                key={option} // Añade una clave para cada filtro
                title={option}
                selectedItem={selectedItem}
                action={() => handleFilterSelect(option)} // Limpia el filtro al hacer clic
              />
            ))} */
}
{
  /* {selectedOption && additionalData && (
            <ChildFilterOutline
            key={option}
              title={selectedOption}
              selectedItem={selectedItem}
              action={handleSearchBarClear}
            />
          )} */
}
{
  /* </View>
      )} */
}

// if (selectedOption === "docente") {
//   data = await getDetailHorarioDocente(selectedItem.cedula);
//   setAdditionalData(data);
// } else if (selectedOption === "horario") {
//   data = await getDetailHorario2(selectedItem.id);
// } else if (selectedOption === "dia") {
// }

// const handleFilterSelect = (option) => {
//   setSelectedItem((prev) => {
//     if (prev.includes(option)) {
//       return prev.filter((item) => item !== option);
//     } else {
//       return [...prev, option];
//     }
//   });
// };

// const handleFilterSelect = (option) => {
//   setSelectedItem((prev) => {
//     if (Array.isArray(prev)) {
//       if (prev.includes(option)) {
//         return prev.filter((item) => item !== option);
//       } else {
//         return [...prev, option];
//       }
//     } else {
//       return [option];
//     }
//   });
// };

// // const filteredData = selectedOption && selectedItem ? additionalData : [];
// const filteredData = additionalData.filter((item) => {
//   return (
//     selectedOption.includes(item.docente) && selectedOption.includes(item.dia)
//   );
// });

// {Object.keys(selectedItem) // Mapea solo las claves presentes en selectedItem
//   .filter((key) => selectedItem[key] !== null && selectedItem[key] !== undefined) // Filtra solo las claves que tienen valores no nulos
//   .map((key) => (
//     <ChildFilterOutline
//       key={key} // Aquí usamos la clave como key
//       title={key} // El título será la clave, por ejemplo, 'docente', 'dia' o 'horario'
//       selectedItem={selectedItem}
//       action={() => handleFilterSelect(key)} // Manejar el filtro basado en la clave seleccionada
//     />
//   ))}

// {/* {selectedItem && (
//   <View style={{ marginHorizontal: 10 }}>
//     {Array.isArray(selectedOption) &&
//       selectedOption.length > 0 &&
//       additionalData &&
//       selectedOption.map((option) => (
//         <ChildFilterOutline
//           key={option}
//           title={option}
//           selectedItem={selectedItem}
//           action={() => handleFilterSelect(option)}
//         />
//       ))}
//   </View>
// )} */}
// const handleFilterSelect = (option) => {
//   setSelectedItem((prev) => ({
//     ...prev,
//     [option]: prev[option] ? null : list.find((item) => item[option]) // Actualiza solo el campo seleccionado
//   }));
// };

// const handleOptionChange = (option) => {
//   (prev) => {
//     // Si 'prev' ya es un array, verificamos si contiene la opción seleccionada
//     if (Array.isArray(prev)) {
//       // Verificar si la opción ya está seleccionada
//       if (!prev.includes(option)) {
//         return [...prev, option]; // Agregar la nueva opción
//       } else {
//         return prev; // Si ya está seleccionada, no hacer nada
//       }
//     } else {
//       // Si no es un array, inicializamos uno con la opción seleccionada
//       return [option];
//     }
//   };
// };
