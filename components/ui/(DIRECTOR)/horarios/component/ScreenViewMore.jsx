import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusCircle } from "../../reportes/components/StatusCircle";
import {
  capitalizeFirstLetter,
  formatDuration,
  formatTimeTo12Hour,
} from "../../../../../src/utils/functiones/functions";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AgendaCalendar } from "../../../Components/agenda/agenda";
import { transformData } from "../../../Components/agenda/data/tranformaData.js";
import { getmarkedDates } from "../../../Components/agenda/data/markesData.js";

const RenderInfoItem = ({ item }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: isPressed ? "lightgreen" : "#fff",
        },
      ]}
      key={item.keyunica}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <View  style={{
          justifyContent: "space-around",
          flexDirection: "row",
        }}>
        <Text style={styles.titleBold}>Salon: </Text>
        <Text style={styles.itemText}>{item.numero_salon}</Text>
        </View>
        <Text style={styles.itemText}>
          {capitalizeFirstLetter(item.categoria)}
        </Text>
      </View>

      <View
        style={{
          paddingVertical:5,
          paddingHorizontal:15,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text style={styles.itemText}>
          {formatTimeTo12Hour(item.hora_inicio)}
          {" - "}
        </Text>
        <Text style={styles.itemText}>{formatTimeTo12Hour(item.hora_fin)}</Text>
        <View>
         <Text style={{
          fontSize:16,
          paddingHorizontal:40
         }}>
         {
            formatDuration(item.hora_inicio, item.hora_fin)
          }
         </Text>
        </View>

      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >

        <View style={{justifyContent:"space-between"}}>
          <MaterialCommunityIcons
            name="account-eye-outline"
            size={24}
            color="black"
          />
          <Text style={styles.itemText}>{item.capacidad}</Text>
        </View>

        <View style={{justifyContent:"space-between"}}>
          {item.INTernet === "si" ? (
            <MaterialIcons name="wifi" size={21} color="blue" style={{
              paddingTop:2
            }} />
          ) : (
            <MaterialIcons name="wifi-off" size={21} color="red" style={{
              paddingTop:2
            }} />
          )}
          <Text style={styles.itemText}>
            {capitalizeFirstLetter(item.INTernet)}
          </Text>
        </View>

        <View style={{justifyContent:"space-between"}}>
          {item.tv === "si" ? (
            <Ionicons name="tv-sharp" size={21} color="green" style={{
              paddingTop:2
            }} />
          ) : (
            <MaterialIcons name="tv-off" size={21} color="red"  style={{
              paddingTop:2
            }}/>
          )}
          <Text style={styles.itemText}> {capitalizeFirstLetter(item.tv)}</Text>
        </View>
        <StatusCircle item={item.estado} />
      </View>
    </TouchableOpacity>
  );
};

function ScreenViewMore(props) {
  const { selectedDate } = props;
  const ITEMS = transformData(selectedDate);
  const PRIMERDIADELMESSELECCIONADO = Object.keys(ITEMS)[0];
  const markedDates = getmarkedDates(ITEMS)

  return (
    <AgendaCalendar
      selectedDay={PRIMERDIADELMESSELECCIONADO}
      items={ITEMS}
      markedDates={markedDates}
      render={(item) => {
        return <RenderInfoItem item={item} />;
      }}
    />
  );
}

export default ScreenViewMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 8,
    marginHorizontal:10,
    marginTop: 10,
    paddingBottom: 8,
  },
   titleBold:{
    fontWeight:"900",
    fontSize: 17,
   },

  itemText: {
    paddingTop:1,
    color: "black",
    fontSize: 16,
  },
});
