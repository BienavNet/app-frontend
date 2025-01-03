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
export const ListComentarioDocenteSalonDefault = ({ data }) => {
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
                    <ListItem.Title style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#000000",
                          textAlign: "center",
                    }}>
                      {capitalizeFirstLetter(data.nombre_salon)}
                    </ListItem.Title>
                  </View>
                  <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "#111111",
                        textAlign: "center",
                    }}>{data.numero_salon}</Text>
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
                    <Text style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#000000",
                          textAlign: "center",
                    }}>Categoria: </Text>{capitalizeFirstLetter(data.nombre_salon)}
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
                  flexDirection: "column",
                }}
              >
                <View>
                 <Text >{data.comentario}</Text>
                </View>
                <View style={{
                  padding:5
                }}>
                  <Text style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "#999999",
                    }}>{data.fecha || "Sin registro de fecha"}</Text>
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
    color: "black",
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
