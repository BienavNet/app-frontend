import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { ListItem } from "@rneui/themed";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { StatusCircle } from "../../../(DIRECTOR)/reportes/components/StatusCircle";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
export const ListDocenteHorarioFilters = ({ data, type }) => {
  // {"apellido": "guerrero", "asignatura": "CALCULO I", "dia": "Miercoles", "nombre": "didider"} //horarios
  const title = type === "horarios" ? data.asignatura : data.dia;
  const subtitle = type === "horarios" ? data.dia : data.dia;

  const docenteName = `${capitalizeFirstLetter(
    data.nombre
  )} ${capitalizeFirstLetter(data.apellido)}`;

  const [expanded, setExpanded] = useState(false);
  const timeStart = new Date(
    `${data.fecha.split("T")[0]}T${data.hora_inicio}`
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeEnd = new Date(
    `${data.fecha.split("T")[0]}T${data.hora_fin}`
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <ListItem.Accordion
        content={
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
                  <ListItem.Title style={styles.itemP2}>{title}</ListItem.Title>
                </View>
                <View>
                  <Text style={styles.itemP2}>{subtitle}</Text>
                </View>
              </View>
            </BoxView>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <View
              style={{
                borderLeftColor: ColorItem.GreenSymphony,
                padding: 4,
                borderLeftWidth: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItem.Title>{docenteName}</ListItem.Title>
                <Text>{data.numero_salon}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {type === "horarios" && (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 13, marginRight: 10 }}>
                      {timeStart}
                    </Text>
                    <Text style={{ fontSize: 13 }}>{timeEnd}</Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <DateChip item={new Date(data.fecha).toLocaleDateString()} />
                <StatusCircle item={data.estado} />
              </View>
            </View>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
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
