
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
// import { getHorarioDocente } from "../../../../../src/services/fetchData/fetchHorarios";
// import { useAuth } from "../../../../../src/hooks/useAuth";
// import { useFocusEffect } from "expo-router";
// import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
// import { StatusCircle } from "../../../(DIRECTOR)/reportes/components/StatusCircle";
import { userData } from "../../../../../src/hooks/use/userData";
import { useComentarioDocente } from "../../../../../src/hooks/customHooks";

export const IndexHorarioDefault = () => {
  const { CEDULA } = userData();
  const comentariosdata = useComentarioDocente(CEDULA);
  const [expandedId, setExpandedId] = useState(null);
  console.log(comentariosdata, "comentarios x teacher");

  // const fetchComentarioDocente = useCallback(async () => {
  //   try {
  //     const res = await getHorarioDocente(CEDULA);
  //     setComentarioData(res);
  //   } catch (error) {
  //     throw Error("Error a fetching comentario", error);
  //   }
  // }, [CEDULA]);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchComentarioDocente();
  //   }, [fetchComentarioDocente])
  // );

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return comentariosdata.map((i, j) => (
    <ListItem.Accordion
      key={i.id_class}
      content={
        <>
          {/* <Icon name="place" size={30} /> */}
          <ListItem.Content>
            <BoxView>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    paddingRight: 30,
                  }}
                >
                  <ListItem.Title style={styles.itemP2}>
                    {capitalizeFirstLetter(truncateText(i.asignatura, 10))}
                  </ListItem.Title>
                </View>
                <View>
                  <Text style={styles.itemP2}>{i.dia}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></View>
              <View
                style={{
                  marginBottom: 5,
                }}
              >
                {/* <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                }}
              >
                <FontAwesome
                  style={{
                    marginTop: 2,
                    marginHorizontal: 10,
                  }}
                  name="commenting"
                  size={20}
                  color={ColorItem.TarnishedSilver}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: "#999999",
                    textAlign: "center",
                  }}
                >
                  {truncateText(data.comentario, 15)}
                </Text>
              </View> */}
              </View>
            </BoxView>
          </ListItem.Content>
        </>
      }
      isExpanded={expandedId === i.id_class}
      onPress={() => handlePress(i.id_class)}
    >
      <ListItem bottomDivider>
        <ListItem.Content>
          <BoxView
            style={{
              borderLeftColor: ColorItem.GreenSymphony,
              padding: 4,
              borderLeftWidth: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ListItem.Title>
                  {capitalizeFirstLetter(i.asignatura)} {i.numero_salon}
                </ListItem.Title>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 13, marginRight: 10 }}>
                  {new Date(
                    `${i.fecha.split("T")[0]}T${i.hora_inicio}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={{ fontSize: 13 }}>
                  {new Date(
                    `${i.fecha.split("T")[0]}T${i.hora_fin}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                // marginHorizontal: 8,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View><Text>{i.dia}</Text></View>
            </View>
          </BoxView>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  ));
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
});


// import { useState } from "react";
// import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

// const IndexHorarioDefault = () => {
//   const [blocks, setBlocks] = useState([
//     { id: 1, row: 1, col: 1, status: "disponible" }, // Salón 1
//     { id: 2, row: 1, col: 3, status: "ocupado" }, // Salón 2
//     { id: 3, row: 1, col: 3, status: "reservado" }, // Salón 3
//     { id: 4, row: 1, col: 5, status: "mantenimiento" }, // Salón 4
//     { id: 5, row: 1, col: 5, status: "disponible" }, // Salón 5
//   ]);


//   const [blocks2, setBlocks2] = useState([
//     { id: 1, row: 1, col: 1, status: "disponible" }, // Salón 1
//     { id: 2, row: 1, col: 2, status: "ocupado" }, // Salón 2
//     { id: 3, row: 1, col: 3, status: "reservado" }, // Salón 3
//     { id: 4, row: 1, col: 4, status: "mantenimiento" }, // Salón 4
//     { id: 5, row: 1, col: 5, status: "disponible" }, // Salón 5
//     { id: 6, row: 1, col: 6, status: "seleccionado" }, // Salón 6
//     // Añadir más salones
//   ]);

//   const [blocks3, setBlocks3] = useState([
//     { id: 1, row: 1, col: 1, status: "disponible" }, // Salón 1
//     { id: 2, row: 1, col: 2, status: "ocupado" }, // Salón 2
//     { id: 3, row: 1, col: 3, status: "reservado" }, // Salón 3
//     { id: 4, row: 1, col: 4, status: "mantenimiento" }, // Salón 4
//     { id: 5, row: 1, col: 5, status: "disponible" }, // Salón 5
//     { id: 6, row: 1, col: 6, status: "seleccionado" }, // Salón 6
//     // Añadir más salones
//   ]);

//   const handleBlockPress = (index) => {
//     const updatedBlocks = [...blocks];
//     updatedBlocks[index].status =
//       updatedBlocks[index].status === "disponible"
//         ? "seleccionado"
//         : "disponible";
//     setBlocks(updatedBlocks);
//   };

//   const renderRow = (rowNumber) => {
//     return (
//       <>
//         <View
//           style={styles.row}
//         >
//             <>
//               {blocks
//                 .filter((block) => block.row === rowNumber)
//                 .map((block, index) => (
//                   <TouchableOpacity
//                     key={block.id}
//                     style={[
//                       styles.block,
//                       block.status === "disponible" && styles.disponible,
//                       block.status === "seleccionado" && styles.seleccionado,
//                       block.status === "reservado" && styles.reservado,
//                       block.status === "mantenimiento" && styles.mantenimiento,
//                       block.status === "ocupado" && styles.ocupado,
//                     ]}
//                     onPress={() => handleBlockPress(index)}
//                     disabled={
//                       block.status === "ocupado" ||
//                       block.status === "mantenimiento"
//                     }
//                   >
//                     <Text style={styles.blockText}>Salón {block.id}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "column",
//             }}
//           >
//             <>
//               {blocks2
//                 .filter((block) => block.row === rowNumber)
//                 .map((block, index) => (
//                   <TouchableOpacity
//                     key={block.id}
//                     style={[
//                       styles.block,
//                       block.status === "disponible" && styles.disponible,
//                       block.status === "seleccionado" && styles.seleccionado,
//                       block.status === "reservado" && styles.reservado,
//                       block.status === "mantenimiento" && styles.mantenimiento,
//                       block.status === "ocupado" && styles.ocupado,
//                     ]}
//                     onPress={() => handleBlockPress(index)}
//                     disabled={
//                       block.status === "ocupado" ||
//                       block.status === "mantenimiento"
//                     }
//                   >
//                     <Text style={styles.blockText}>Salón {block.id}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </>
//           </View>
//           <View
//             style={{
//               flexDirection: "column",
//             }}
//           >
//             <>
//               {blocks3
//                 .filter((block) => block.row === rowNumber)
//                 .map((block, index) => (
//                   <TouchableOpacity
//                     key={block.id}
//                     style={[
//                       styles.block,
//                       block.status === "disponible" && styles.disponible,
//                       block.status === "seleccionado" && styles.seleccionado,
//                       block.status === "reservado" && styles.reservado,
//                       block.status === "mantenimiento" && styles.mantenimiento,
//                       block.status === "ocupado" && styles.ocupado,
//                     ]}
//                     onPress={() => handleBlockPress(index)}
//                     disabled={
//                       block.status === "ocupado" ||
//                       block.status === "mantenimiento"
//                     }
//                   >
//                     <Text style={styles.blockText}>Salón {block.id}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </>
//           </View>
//         </View>
//       </>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Renderizando cada fila */}
//       {renderRow(1)}
//       {/* {renderRow(2)}
//       {renderRow(3)}
//       {renderRow(10)}
//       {renderRow(21)}
//       {renderRow(32)} */}
//       {/* Añadir más filas según sea necesario */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     padding: 10,
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 10,
//   justifyContent:"space-between",
//     backgroundColor:"red"
//   },
//   block: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 2,
//     borderRadius: 5,
//   },
//   disponible: {
//     backgroundColor: "green",
//   },
//   seleccionado: {
//     backgroundColor: "yellow",
//   },
//   reservado: {
//     backgroundColor: "red",
//   },
//   mantenimiento: {
//     backgroundColor: "gray",
//   },
//   ocupado: {
//     backgroundColor: "orange",
//   },
//   blockText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default IndexHorarioDefault;

// // import { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// // } from "react-native";

// // export const IndexHorarioDefault = () => {
// //   // Definimos el estado de cada bloque o asiento (opcional, si deseas manejar interacción)
// //   const [blocks, setBlocks] = useState([
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 2, col: 1, status: "reservado" },
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 3, col: 3, status: "reservado" },
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 2, col: 1, status: "reservado" },
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 2, col: 1, status: "reservado" },
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 3, col: 3, status: "reservado" },
// //     { row: 1, col: 1, status: "disponible" }, // ejemplo de bloques
// //     { row: 1, col: 2, status: "seleccionado" },
// //     { row: 2, col: 1, status: "reservado" },
// //     // Añadir más bloques con diferentes filas y columnas
// //   ]);

// //   // Funcion para manejar la interacción si es necesario
// //   const handleBlockPress = (index) => {
// //     // Aquí puedes manejar cambios de estado al tocar
// //     const updatedBlocks = [...blocks];
// //     updatedBlocks[index].status = updatedBlocks[index].status === "disponible"? "seleccionado": "disponible";
// //     setBlocks(updatedBlocks);
// //   };

// //   const renderBlocks = () => {
// //     // Generar la visualización en cuadrícula según las coordenadas del bloque
// //     return blocks.map((block, index) => (
// //       <TouchableOpacity
// //         key={index}
// //         style={[
// //           styles.block,
// //           block.status === "disponible" && styles.disponible,
// //           block.status === "seleccionado" && styles.seleccionado,
// //           block.status === "reservado" && styles.reservado,
// //           block.status === "mantenimiento" && styles.mantenimiento,
// //           block.status === "ocupado" && styles.ocupado,
// //         ]}
// //         onPress={() => handleBlockPress(index)}
// //         disabled={
// //           block.status === "ocupado" || block.status === "mantenimiento"
// //         }
// //       />
// //     ));
// //   };

// //   return (
// //     //completado, cancelado, pendiente

// //     //mantenimiento {todos}, ocupado{x los demas}, disponible {x mi}, reservado {}
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <View style={styles.legend}>
// //         <View
// //           style={{
// //             padding: 10,
// //             flexDirection: "row",
// //           }}
// //         >
// //           <View
// //             style={{
// //               width: "95%",
// //               flexDirection: "row",
// //               justifyContent: "space-around",
// //             }}
// //           >
// //             <View style={[styles.legendItem, styles.reservado]} />
// //             <Text>Reservado (R)</Text>

// //             <View style={[styles.legendItem, styles.ocupado]} />
// //             <Text>Ocupado (O)</Text>
// //             <View style={[styles.legendItem, styles.seleccionado]} />
// //             <Text>Seleccionado (S)</Text>

// //           </View>
// //         </View>
// //         <View
// //           style={{
// //             width: "90%",
// //             justifyContent: "space-around",
// //             flexDirection: "row",
// //           }}
// //         >
// //           <View
// //             style={{
// //               flexDirection: "row",
// //             }}
// //           >
// //             <View style={[styles.legendItem, styles.disponible]} />
// //             <Text>Disponible (D)</Text>
// //           </View>

// //           <View
// //             style={{
// //               flexDirection: "row",
// //             }}
// //           >
// //             <View style={[styles.legendItem, styles.mantenimiento]} />
// //             <Text>Mantenimiento (M)</Text>

// //           </View>
// //         </View>
// //       </View>
// //       <Text style={styles.title}>Filtrar por tiempo: 20 Jul 2024</Text>
// //       <View style={styles.grid}>{renderBlocks()}</View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 10,
// //     backgroundColor: "#f5f5f5",
// //     alignItems: "center",
// //   },
// //   title: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginBottom: 15,
// //   },
// //   grid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "center",
// //   },
// //   block: {
// //     width: 40, // Ajusta el tamaño según tus necesidades
// //     height: 40,
// //     margin: 5,
// //     borderRadius: 5,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   disponible: {
// //     backgroundColor: "#4caf50", // Verde
// //   },
// //   seleccionado: {
// //     backgroundColor: "#ffeb3b", // Amarillo
// //   },
// //   reservado: {
// //     backgroundColor: "#ff9800", // Naranja
// //   },
// //   ocupado: {
// //     backgroundColor: "#f44336", // Rojo
// //   },
// //   mantenimiento: {
// //     backgroundColor: "#9e9e9e", // Gris
// //   },
// //   legend: {
// //     flexDirection: "column",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     marginTop: 10,
// //     width: "100%",
// //   },
// //   legendItem: {
// //     width: 20,
// //     height: 20,
// //     marginRight: 5,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //     borderRadius: 3,
// //   },
// // });

// // export default IndexHorarioDefault;
