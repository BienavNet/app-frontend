import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { ListItem } from "@rneui/themed";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { StatusCircle } from "../../../(DIRECTOR)/reportes/components/StatusCircle";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
import { MaterialIcons } from "@expo/vector-icons";
export const ListClassSalon = ({ data, type }) => {

  // console.log("Data: --------------------------------------------- " + JSON.stringify(data) )
  // {"id":251,"horario":12,"salon":1,"supervisor":1,"estado":"pendiente","fecha":"2024-11-13T05:00:00.000Z","nombre_docente":"eduardo","apellido_docente":"coronel","numero_salon":112,"nombre_salon":"sala de programacion","asignatura":"CALCULO I","hora_inicio":"08:39:00","hora_fin":"12:30:00"}   
  const title = type === "salones" ? `${data.numero_salon} - ${data.categoria}` : type === "dia" ? data.dia : `${data.numero_salon} - ${data.categoria}`;
  const docenteName = `${capitalizeFirstLetter(data.nombre_docente)} ${capitalizeFirstLetter(data.apellido_docente)}`;
  const [expanded, setExpanded] = useState(false);
  const timeStart = new Date(`${data.fecha.split("T")[0]}T${data.hora_inicio}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeEnd = new Date(`${data.fecha.split("T")[0]}T${data.hora_fin}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <ListItem.Accordion
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
                      paddingRight: 15,
                    }}
                  >
                    <ListItem.Title style={styles.itemP2}>
                      {capitalizeFirstLetter(data.nombre_docente.substring(0, 1))}{". "}
                      {capitalizeFirstLetter(data.apellido_docente)}
                    </ListItem.Title>
                  </View>
                  <View
                    style={{
                      paddingRight: 15
                    }}
                  >
                    <Text style={styles.itemP2}>{data.asignatura.substring(0, 10)}{"..."}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemP2}>{data.fecha.substring(0, 10)}</Text>
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
                </View>
              </BoxView>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
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
                    {capitalizeFirstLetter(data.nombre_docente)}{" "}
                    {capitalizeFirstLetter(data.apellido_docente)}
                  </ListItem.Title>
                </View>
                <View>
                  <ListItem.Title>
                    {capitalizeFirstLetter(data.asignatura, 15)}
                  </ListItem.Title>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <ListItem.Title>
                    {data.numero_salon} - {data.categoria}
                  </ListItem.Title>
                </View>
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ fontSize: 13, marginRight: 10 }}>
                    {new Date(
                      `${data.fecha.split("T")[0]}T${data.hora_inicio}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text style={{ fontSize: 13 }}>
                    {new Date(
                      `${data.fecha.split("T")[0]}T${data.hora_fin}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <DateChip item={new Date(data.fecha).toLocaleDateString()} />
                </View>

                <View>
                  <StatusCircle item={data.estado} />
                </View>
              </View>
            </BoxView>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>


      {/* <ListItem.Accordion
      content={
        <ListItem.Content>
          <View style={styles.itemP2}>
            <ListItem.Title>{title}</ListItem.Title>
          </View>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      <ListItem bottomDivider>
        <ListItem.Content>
          <View style={{
              borderLeftColor: ColorItem.GreenSymphony,
              padding: 4,
              borderLeftWidth: 6,
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <ListItem.Title>{docenteName}</ListItem.Title>
              <Text>{data.numero_salon}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {type === "horarios" && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 13, marginRight: 10 }}>{timeStart}</Text>
                  <Text style={{ fontSize: 13 }}>{timeEnd}</Text>
                </View>
              )}
            </View>
            <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
              <DateChip item={new Date(data.fecha).toLocaleDateString()} />
              <StatusCircle item={data.estado} />
            </View>
          </View>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion> */}
    </>
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
    color: "#000000",
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


// <ListItem.Accordion
// content={
//   <>
//     {/* <Icon name="place" size={30} /> */}
//     <ListItem.Content>
//       <BoxView>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <View
//             style={{
//               paddingRight: 30,
//             }}
//           >
//             <ListItem.Title style={styles.itemP2}>
//               {capitalizeFirstLetter(data.nombre_salon)}{" "}
//               {/* {capitalizeFirstLetter(data.apellido_docente)} */}
//             </ListItem.Title>
//           </View>
//           <View>
//             <Text style={styles.itemP2}>{data.numero_salon}</Text>
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         ></View>
//         <View
//           style={{
//             marginBottom: 5,
//           }}
//         >
//         </View>
//       </BoxView>
//     </ListItem.Content>
//   </>
// }
// isExpanded={expanded}
// onPress={() => setExpanded(!expanded)}
// >
// <ListItem bottomDivider>
//   <ListItem.Content>
//     <BoxView
//       style={{
//         borderLeftColor: ColorItem.GreenSymphony,
//         padding: 4,
//         borderLeftWidth: 6,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <View>
//           <ListItem.Title>
//             {capitalizeFirstLetter(data.nombre_docente)}{" "}
//             {capitalizeFirstLetter(data.apellido_docente)}
//           </ListItem.Title>
//         </View>
//         <View>
//           <ListItem.Title>
//             {capitalizeFirstLetter(truncateText(data.asignatura, 15))}
//           </ListItem.Title>
//         </View>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View
//           style={{
//             justifyContent:"space-around",
//             alignItems:"center",
//             flexDirection:"row"
//           }}
//         >
//            <Text style={{ fontSize: 13, marginRight: 10 }}>
//             {new Date(
//               `${data.fecha.split("T")[0]}T${data.hora_inicio}`
//             ).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </Text>
//           <Text style={{ fontSize: 13 }}>
//             {new Date(
//               `${data.fecha.split("T")[0]}T${data.hora_fin}`
//             ).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           justifyContent: "space-between",
//           flexDirection: "row",
//         }}
//       >
//         <View>
//           <DateChip item={new Date(data.fecha).toLocaleDateString()} />
//         </View>

//         <View>
//           <StatusCircle item={data.estado} />
//         </View>
//       </View>
//     </BoxView>
//   </ListItem.Content>
//   <ListItem.Chevron />
// </ListItem>
// </ListItem.Accordion>