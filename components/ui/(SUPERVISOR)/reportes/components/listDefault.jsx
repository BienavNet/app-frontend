import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { MaterialIcons } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import {capitalizeFirstLetter} from "../../../../../src/utils/functiones/functions";

export const ListReportDefault = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <ListItem.Accordion
        content={
          <>
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
                    <Text style={styles.itemP2}>{data.clase}</Text>
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
                      marginTop:10
                    }}
                  >
                    <MaterialIcons name="date-range" size={24} color="#444444" />
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#444444",
                        textAlign: "center",
                        marginLeft: 10
                      }}
                    >
                      {data.fecha.substring(0, 10)}
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
                  justifyContent: "space-between",
                }}
              >
                <View style={{
                  paddingLeft: 15,
                }}>
                  <ListItem.Subtitle style={{
                    color: "#000000",
                    fontSize: 15
                  }}>
                    {capitalizeFirstLetter(data.nombre_salon)}{" "}{data.numero_salon}{" "}{data.asignatura}
                  </ListItem.Subtitle>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row"
                }}
              >
                <MaterialIcons name="chat" size={24} color="#444444" style={{
                  marginLeft: 25
                }}/>
                <View style={{
                  paddingTop:2,
                  paddingLeft:5,
                  color: "#444444"
                }}>
                  <Text>{" Comentario: "}{data.comentario}</Text>
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
  itemP2: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
  }
});
