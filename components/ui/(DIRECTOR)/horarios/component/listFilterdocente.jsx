import { useState } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import { BoxView } from "../../components/customBoxView";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { stylesHorariosDirector } from "./styles";

export const ListFilterHorarioDocente = ({ data, onPress }) => {
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
                  <ListItem.Title style={stylesHorariosDirector.itemP2}>
                    {data.cedula}{" "}
                    {data.apellido}
                  </ListItem.Title>
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
                  {/* <Text
                    style={{
                      fontSize: 18,
                      color: "#999999",
                      textAlign: "center",
                    }}
                  >
                    {truncateText(data.comentario, 15)}
                  </Text> */}
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
                  {data.nombre}
                  {/* {capitalizeFirstLetter(data.nombre)} */}
                </ListItem.Title>
              </View>
              <View style={{}}>
                <Text style={stylesHorariosDirector.itemP3}>
             {    data.correo}
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
                  {data.nombre}
                  {/* {capitalizeFirstLetter(data.nombre)}{" "}
                  {capitalizeFirstLetter(data.apellido)} */}
                </ListItem.Subtitle>
              </View>
            </View>
            <View
              style={{
                marginBottom: 5,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              {/* <View
                style={{
                  width: "100%",
                }}
              >
                <Text style={stylesHorariosDirector.itemLeft}>{data.comentario}</Text>
              </View> */}
            </View>
          </BoxView>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  );
};
