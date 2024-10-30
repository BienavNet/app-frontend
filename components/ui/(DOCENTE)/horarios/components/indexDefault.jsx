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
  console.log("HorarioDocenteCedula", HorarioDocenteCedula);

  const [expandedId, setExpandedId] = useState(null);

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return HorarioDocenteCedula.map((i, j) => (
    <ListItem.Accordion
      key={i.id}
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
              ></View>
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
                {formatTimeTo12Hour(i.hora_inicio)}
                </Text>
                <Text style={{ fontSize: 13 }}>
                 {formatTimeTo12Hour(i.hora_fin)}
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
              <View>
                <Text>{i.dia}</Text>
              </View>
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
