import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import testIDs from "./testIDs";
import { ColorItem } from "../../../../styles/StylesGlobal";
import moment from "moment";
import { StatusCircle } from "../../reportes/components/StatusCircle";
import {
  capitalizeFirstLetter,
  obtenerDiaNumero,
} from "../../../../../src/utils/functiones/functions";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


LocaleConfig.locales["es"] = {
  monthNames:[
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' 
  ],
  monthNamesShort:[
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames:[
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort:[
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ]
}
LocaleConfig.defaultLocale = 'es';

const RenderInfoItem = ({ item, index }) => {
  // {"INTernet": "si", "capacidad": 23, "categoria": "salon", "dia": "Miercoles", "estado": "pendiente", "hora_fin": "12:30:00", "hora_inicio": "08:39:00", "keyunica": "2024-10-02", "numero_salon": 112, "tv": "no"}
   const [isPressed, setIsPressed] = useState(false);

  console.log("renderInfoItem entrando:", item, index);
  return (
    <TouchableOpacity style={[
      styles.item,{
        backgroundColor: isPressed ? "lightgreen":"#fff"
      }
    ]} key={item.keyunica}
    onPressIn={() => setIsPressed(true)}
    onPressOut={() => setIsPressed(false)}
    >
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Text style={styles.itemText}>{item.numero_salon}</Text>
        <Text style={styles.itemText}>{capitalizeFirstLetter(item.categoria)}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialIcons name="access-time-filled" size={24} color="black" />
          <Text style={styles.itemText}> {item.hora_inicio}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MaterialIcons name="access-time" size={24} color="black" />
          <Text style={styles.itemText}> {item.hora_fin}</Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {item.INTernet === "si" ? (
            <MaterialIcons name="wifi" size={24} color="black" />
          ) : (
            <MaterialIcons name="wifi-off" size={24} color="black" />
          )}
          <Text style={styles.itemText}> {capitalizeFirstLetter(item.INTernet)}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          {item.tv === "si" ? (
            <Ionicons name="tv-sharp" size={24} color="black" />
          ) : (
            <MaterialIcons name="tv-off" size={24} color="black" />
          )}
          <Text style={styles.itemText}> {capitalizeFirstLetter(item.tv)}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around"
        }}
      >
        <View style={{
          flexDirection:"row"
        }}>
          <MaterialCommunityIcons
            name="account-eye-outline"
            size={24}
            color="black"
          />
          <Text style={styles.itemText}>{item.capacidad}</Text>
        </View>
        <StatusCircle item={item.estado} />
      </View>
    </TouchableOpacity>
  );
};

function ScreenViewMore(props) {
  const { selectedDate } = props;
  console.log(selectedDate, "seleteDate, screenViewMore");
  
  const transformData = (selectedDate) => {
    const items = {};


    selectedDate.horarios.forEach((horario) => {
      const diaNumero = obtenerDiaNumero(horario.dia);
      console.log(diaNumero, "dia numero");
      // setDiaActive(diaNumero);
      const datekey = moment(horario.fecha).format("YYYY-MM-DD"); // obtener la fecha en formato YYYY-MM-DD
      console.log(datekey, "datakey de cada fecha");
      if (!items[datekey]) {
        items[datekey] = [];
      }
      items[datekey].push({
        keyunica: datekey,
        categoria: horario.categoria,
        numero_salon: horario.numero_salon,
        capacidad: horario.capacidad,
        dia: horario.dia,
        hora_fin: horario.hora_fin,
        hora_inicio: horario.hora_inicio,
        estado: horario.estado,
        INTernet: horario.INTernet,
        tv: horario.tv,
      });
    });
    return items;
  };

  const ITEMS = transformData(selectedDate);
  console.log(ITEMS, "items selected data");
  const PRIMERDIADELMESSELECCIONADO = Object.keys(ITEMS)[0];

  const markedDates = Object.keys(ITEMS).reduce((acc, date) => {
    const diaDeLaSemana = moment(date).day();
    console.log(diaDeLaSemana, "diaDeLaSemana");
    if (diaDeLaSemana !== 0) {
      acc[date] = { disabled: true, disableTouchEvent: true };
    } else {
      acc[date] = { selected: true, selectedColor: ColorItem.KellyGreen };
    }
    return acc;
  }, {});

  console.log("marKeDates", markedDates);


  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No hay informacion para le fecha Seleccionada</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
      displayLoadingIndicator={true}
        markingType="period"
        items={ITEMS}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: ColorItem.KellyGreen,
          selectedDayTextColor: "red",
          todayTextColor: ColorItem.OceanCrest,
          todayBackgroundColor: ColorItem.KellyGreen,
          dayTextColor: "#2d4150",
          textDisabledColor: ColorItem.OceanCrest,
          monthTextColor: "#000",
        }}
        keyExtractor={(item, index) => `ID-${item.keyunica}-DATA-${index}`}
        renderEmptyDate={renderEmptyDate}
        testID={testIDs.agenda.CONTAINER}
        selected={PRIMERDIADELMESSELECCIONADO}
        renderItem={(item, isFirst) => {
          return <RenderInfoItem item={item} index={isFirst} />;
        }}
        maxDate="2025-01-01"
        minDate="2024-01-01"
      />
    </SafeAreaView>
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
    marginRight: 10,
    marginTop: 15,
    paddingBottom: 8,
  },
  itemText: {
    color: "black",
    fontSize: 16,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },

});



