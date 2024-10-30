import { userData } from "../../../../../src/hooks/use/userData";
import { useDocenteComentario } from "../../../../../src/hooks/customHooks";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import {
  capitalizeFirstLetter
} from "../../../../../src/utils/functiones/functions";

export const IndexComentarioDefault = () => {
    const {CEDULA} = userData()
    const [isExpanded, setIsExpanded] = useState()
    const comentarios = useDocenteComentario(CEDULA)


    const handlePress = (id) => {
        setIsExpanded(isExpanded === id ? null : id);
      };
    
      const getDate = (date) => {
        const myDate = new Date(date)
        const month = myDate.toLocaleString('es-ES', { month: "long" })
        return ` ${myDate.getDay()} de ${month}`
      }
      return comentarios.map((i, j) => (
    
        <ListItem.Accordion

          key={i.id}
          content={
            <>
              <ListItem.Content>
                <BoxView>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 15
                    }}
                  >
                    <View
                      style={{
                        paddingRight: 30,
                      }}
                    >
                      <ListItem.Title style={styles.itemP2}>
                        {capitalizeFirstLetter(i.nombre_salon)}{" Salon: "}{i.numero_salon}
                      </ListItem.Title>
                    </View>
                    <View>
                      <Text style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "#111111",
                        textAlign: "center",
                      }}>{i.fecha.substring(0, 10)}</Text>
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
          isExpanded={isExpanded === i.id}
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
                    marginLeft: 10
                  }}
                >
                  <View>
                    <ListItem.Title>
                      {capitalizeFirstLetter(i.comentario)}
                    </ListItem.Title>
                  </View>
                </View>
                
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginLeft: 10
                  }}>
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
        fontSize: 16,
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
    }

    }
)