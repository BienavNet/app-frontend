import { View, Text, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/themed";
export const ListClass = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 8,
      }}
    >
      <TouchableOpacity>
        <ListItem bottomDivider>
          <ListItem.Content>
           {/* <View  style={{
                flexDirection: "row",
              }}>
           <ListItem.Title>SALA DE REDES</ListItem.Title>
           <ListItem.Subtitle>112</ListItem.Subtitle>
           </View> */}
            <ListItem.Subtitle>Aulario V</ListItem.Subtitle>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text>estado</Text> 
              <Text>tiempo restante</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text>observacion</Text> 
              <Text>mensahe xxxxxxxxxxx</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text>ultimo docente</Text> 
              <Text>didier guerrero</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </View>
  );
};
