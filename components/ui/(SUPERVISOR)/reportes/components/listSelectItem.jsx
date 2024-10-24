import { View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { useState } from "react";
import { ListItem } from "@rneui/themed";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import { FontAwesome } from "@expo/vector-icons";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
import { StatusCircle } from "../../../(DIRECTOR)/reportes/components/StatusCircle";

const ListSelectItem = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
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
                    paddingRight: 30,
                  }}
                >
                  <ListItem.Title style={styles.itemP2}>
                    {capitalizeFirstLetter(truncateText(data.asignatura, 15))}
                  </ListItem.Title>
                </View>
                <View>
                  <Text style={styles.itemP2}>{data.numero_salon}</Text>
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
                <View
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
                </View>
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
                <ListItem.Title>{data.asignatura}</ListItem.Title>
              </View>
              <View style={{}}>
                <Text style={styles.itemP3}>
                  {truncateText(data.numero_salon)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ListItem.Subtitle>
                  {capitalizeFirstLetter(data.nombre_docente)}{" "}
                  {capitalizeFirstLetter(data.apellido_docente)}
                </ListItem.Subtitle>
              </View>
              <View
                style={{
                  width: "50%",
                }}
              >
                <Text style={styles.itemLeft}>{data.comentario}</Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: 5,
                // marginHorizontal: 8,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View>
                <DateChip item={new Date(data.fecha).toLocaleDateString()} />
              </View>
              <View
                style={{
                  width: "20%",
                }}
              >
                <StatusCircle item={data.estado} />
              </View>
            </View>
          </BoxView>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  );
};
export default ListSelectItem;
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
