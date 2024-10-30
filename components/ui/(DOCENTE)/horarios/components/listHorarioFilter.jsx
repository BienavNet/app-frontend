import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { ListItem } from "@rneui/themed";
import {
  capitalizeFirstLetter,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
export const ListDocenteHorarioFilters = ({ data, type }) => {
  console.log("data: ListDocenteHorarioFilters" + JSON.stringify(data));
  const title =
    type === "horarios"
      ? data.asignatura
      : `${data.asignatura} - ${data.fecha.substring(0, 10)}`;
  const subtitle = type === "horarios" ? data.dia : data.dia;
  const [expanded, setExpanded] = useState(false);
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
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#111111",
                      textAlign: "center",
                    }}
                  >
                    {subtitle}
                  </Text>
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
                  marginLeft: 10,
                }}
              >
                <View>
                  <ListItem.Title>
                    {capitalizeFirstLetter(data.asignatura)}
                  </ListItem.Title>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginLeft: 10,
                }}
              >
                <Text>
                  {"Salon: "}
                  {data.numero_salon}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginLeft: 10,
                }}
              >
                <Text>
                  {"Sector: "}
                  {data.nombre_salon}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginLeft: 10,
                }}
              >
                <View>
                  <Text>
                    {"Dia: "}
                    {data.dia}
                  </Text>
                </View>
                {data.hora_inicio &&
                  data.hora_fin &&
                  (type === "dia" ? (
                    <View>
                      <Text>
                        {"Hora: "}
                        {formatTimeTo12Hour(data.hora_inicio)}
                        {" - "}
                        {formatTimeTo12Hour(data.hora_fin)}
                      </Text>
                    </View>
                  ) : null)}
              </View>
            </BoxView>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
    </>
  );
};
const styles = StyleSheet.create({
  itemP2: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
});
