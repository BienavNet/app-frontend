import { View, Text, StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter
} from "../../../../../src/utils/functiones/functions";
import { useState } from "react";
import { ListItem } from "@rneui/themed";
import { BoxView } from "../../../(DIRECTOR)/components/customBoxView";
import { FontAwesome } from "@expo/vector-icons";

const ListFilterComentario = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
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
                        justifyContent:"space-between",
                        flexDirection:"row",
                        width:"100%"
                      }}
                    >
                      <ListItem.Title style={styles.itemP2}>
                        {capitalizeFirstLetter(data.nombre_salon)}
                      </ListItem.Title>
                      <ListItem.Subtitle  style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "#111111",
                        textAlign: "center",
                    }} >
                        {data.numero_salon}
                      </ListItem.Subtitle>
                    </View>
                    <View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  ></View>
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
                   padding:5,
                    flexDirection: "column",
                  }}
                >
                  <View style={{
                    padding:5,
                    flexDirection: "row"
                  }}>
                  <FontAwesome
                      style={{
                        marginHorizontal: 5,
                      }}
                      name="commenting"
                      size={20}
                      color={ColorItem.TarnishedSilver}
                    />
                  <Text >{data.comentario}</Text>
                  </View>

                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#999999",
                  }}>{data.fecha}</Text>
                </View>
              </BoxView>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </ListItem.Accordion>
  );
};
export default ListFilterComentario;
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
