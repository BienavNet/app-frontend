import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { FontAwesome } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { StatusCircle } from "../../../(DIRECTOR)/reportes/components/StatusCircle";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
export const ListReportDefault = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
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
                      paddingRight: 30,
                    }}
                  >
                    <ListItem.Title style={styles.itemP2}>
                      {capitalizeFirstLetter(data.nombre)}{" "}
                      {capitalizeFirstLetter(data.apellido)}
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
                  <ListItem.Title>
                    {capitalizeFirstLetter(data.nombre)}{" "}
                    {capitalizeFirstLetter(data.apellido)}
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
                  <ListItem.Subtitle>
                    {capitalizeFirstLetter(data.nombre_salon)}
                  </ListItem.Subtitle>
                </View>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text style={styles.itemP3}>
                    {truncateText(data.numero_salon)}
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