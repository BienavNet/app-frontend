import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import {
  capitalizeFirstLetter,
  formatTimeTo12Hour,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { userData } from "../../../../../src/hooks/use/userData";
import { useHorarioDocenteCedula } from "../../../../../src/hooks/customHooks";

export const IndexHorarioDefault = () => {
  const { CEDULA } = userData();
  const HorarioDocenteCedula = useHorarioDocenteCedula(CEDULA);
  const [expandedId, setExpandedId] = useState(null);

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return HorarioDocenteCedula.map((i, j) => (
    <ListItem.Accordion
      key={i.id}
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
                  <ListItem.Title style={styles.itemP2}>
                    {capitalizeFirstLetter(truncateText(i.asignatura, 10))}
                  </ListItem.Title>
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
                    {i.dia}
                  </Text>
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
              ></View>
            </BoxView>
          </ListItem.Content>
      }
      isExpanded={expandedId === i.id}
      onPress={() => handlePress(i.id)}
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
                  {capitalizeFirstLetter(i.asignatura)}
                </ListItem.Title>
              </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginLeft: 10
              }}>
              <Text>{"Salon: "}{i.numero_salon}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginLeft: 10
              }}>
              <Text>{"Sector: "}{i.nombre}</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                // marginHorizontal: 8,
                justifyContent: "space-between",
                flexDirection: "row",  marginLeft: 10
              }}
            >
              <View><Text>{"Dia: "}{i.dia}</Text></View>
              <View><Text>{"Hora: "}{formatTimeTo12Hour(i.hora_inicio)}{" - "}{formatTimeTo12Hour(i.hora_fin)}</Text></View>
            </View>
          </BoxView>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  ));
};
const styles = StyleSheet.create({
  itemP2: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  }
});
