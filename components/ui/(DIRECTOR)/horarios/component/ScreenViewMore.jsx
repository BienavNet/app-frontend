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

export default ScreenViewMore;

// import React, { useState, useCallback } from 'react';
// import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Agenda } from 'react-native-calendars';
// import testIDs from './testIDs';

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

// const ScreenViewMore = () => {
//   const [items, setItems] = useState({});
//    console.log("items", items);
//   const loadItems = (day) => {
//     setTimeout(() => {
//       const newItems = { ...items };
//       for (let i = 0; i < 10; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);

//         if (!newItems[strTime]) {
//           newItems[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             newItems[strTime].push({
//               name: `Item for ${strTime} #${j}`,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime,
//             });
//           }
//         }
//       }
//       setItems(newItems);
//     }, 1000);
//   };

//   const renderItem = (reservation, isFirst) => {
//     const fontSize = isFirst ? 16 : 14;
//     const color = isFirst ? 'black' : '#43515c';

//     return (
//       <TouchableOpacity
//         testID={testIDs.agenda.ITEM}
//         style={[styles.item, { height: reservation.height }]}
//         onPress={() => Alert.alert(reservation.name)}
//       >
//         <Text style={{ fontSize, color }}>{reservation.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyDate = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   };

//   const rowHasChanged = (r1, r2) => {
//     return r1.name !== r2.name;
//   };

//   return (
//     <View style={styles.container}>
//       <Agenda
//       keyExtractor={items.}
//       horizontal={false}
//         testID={testIDs.agenda.CONTAINER}
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={'2024-09-11'}
//         renderItem={renderItem}
//         renderEmptyDate={renderEmptyDate}
//         rowHasChanged={rowHasChanged}
//         showClosingKnob={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30,
//   },
// });

// export default ScreenViewMore;

// import React, {Component} from 'react';
// import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import testIDs from './testIDs';

// export default class ScreenViewMore extends Component {
//   state = {
//     items: undefined
//   };

//   render() {
//     return (
//       <Agenda
//         testID={testIDs.agenda.CONTAINER}
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems}
//         selected={'2017-05-16'}
//         renderItem={this.renderItem}
//         renderEmptyDate={this.renderEmptyDate}
//         rowHasChanged={this.rowHasChanged}
//         showClosingKnob={true}
//         // markingType={'period'}
//         // markedDates={{
//         //    '2017-05-08': {textColor: '#43515c'},
//         //    '2017-05-09': {textColor: '#43515c'},
//         //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//         //    '2017-05-21': {startingDay: true, color: 'blue'},
//         //    '2017-05-22': {endingDay: true, color: 'gray'},
//         //    '2017-05-24': {startingDay: true, color: 'gray'},
//         //    '2017-05-25': {color: 'gray'},
//         //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//         // monthFormat={'yyyy'}
//         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//         // renderDay={this.renderDay}
//         // hideExtraDays={false}
//         // showOnlySelectedDayItems
//         // reservationsKeyExtractor={this.reservationsKeyExtractor}
//       />
//     );
//   }

//   loadItems = (day) => {
//     const items = this.state.items || {};

//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);

//         if (!items[strTime]) {
//           items[strTime] = [];

//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime
//             });
//           }
//         }
//       }

//       const newItems = {};
//       Object.keys(items).forEach(key => {
//         newItems[key] = items[key];
//       });
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//   };

//   renderDay = (day) => {
//     if (day) {
//       return <Text style={styles.customDay}>{day.getDay()}</Text>;
//     }
//     return <View style={styles.dayItem}/>;
//   };

//   renderItem = (reservation, isFirst) => {
//     const fontSize = isFirst ? 16 : 14;
//     const color = isFirst ? 'black' : '#43515c';

//     return (
//       <TouchableOpacity
//         testID={testIDs.agenda.ITEM}
//         style={[styles.item, {height: reservation.height}]}
//         onPress={() => Alert.alert(reservation.name)}
//       >
//         <Text style={{fontSize, color}}>{reservation.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   renderEmptyDate = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   };

//   rowHasChanged = (r1, r2) => {
//     return r1.name !== r2.name;
//   };

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   },
//   customDay: {
//     margin: 10,
//     fontSize: 24,
//     color: 'green'
//   },
//   dayItem: {
//     marginLeft: 34
//   }
// });

// import React, {useState} from 'react';
// import {Calendar, LocaleConfig} from 'react-native-calendars';

// const ScreenViewMore = () => {
//   const [selected, setSelected] = useState('');

//   return (
//     <Calendar
//       onDayPress={day => {
//         setSelected(day.dateString);
//       }}
//       markedDates={{
//         [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
//       }}
//     />
//   );
// };

// export default ScreenViewMore;

// import { useState } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { Agenda } from "react-native-calendars";
// import { Card, Avatar } from "@rneui/themed";
// import { memo } from "react";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

// const ScreenViewMore = () => {
//   const [items, setItems] = useState({});

//   const loadItems = (day) => {
//     setTimeout(() => {
//       const newItems = {}; // Crear una nueva copia de los items
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           newItems[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             newItems[strTime].push({
//               name: "Item for " + strTime + " #" + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         } else {
//           newItems[strTime] = items[strTime]; // Mantener los items anteriores
//         }
//       }
//       setItems((prevItems) => ({ ...prevItems, ...newItems }));
//     }, 1000);
//   };

//   const renderItem = memo((item) => {
//     console.log("render item " + item)
//     return (
//       <FlatList
//         data={item.data}
//         renderItem={({ item, isFirst }) => (
//           <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//             <Card>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{color:"red"}}>{item.name}</Text>
//                 <Avatar label="J" />
//               </View>
//             </Card>
//           </TouchableOpacity>
//         )}
//       />
//     );
//   });

//   return (
//     <>
//       <Agenda
//          items={{
//                     "2021-03-26": [
//                       {
//                         id: 1,
//                         name: "Meeting 1",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                     "2021-03-28": [
//                       {
//                         id: 3,
//                         name: "Meeting 2",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                     "2021-03-29": [
//                       {
//                         id: 5,
//                         name: "Meeting 3",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                     "2021-03-30": [
//                       {
//                         id: 12,
//                         name: "Meeting 4",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                     "2024-03-31": [
//                       {
//                         id: 34,
//                         name: "Meeting 5",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                     "2024-03-25": [
//                       {
//                         id: 35,
//                         name: "Meeting 6",
//                         data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//                       },
//                     ],
//                   }}
//         loadItemsForMonth={loadItems}
//         selected={"2017-05-16"}
//         // renderItem={renderItem}
//       />
//     </>
//   );
// };

// export default ScreenViewMore;

// import { useState } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { Agenda } from "react-native-calendars";
// import { Card, Avatar } from "@rneui/themed";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

// const ScreenViewMore = () => {
//   const [items, setItems] = useState({});

//   const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: "Item for " + strTime + " #" + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };

//   const renderItem = (item) => {
//     return (
//       <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//         <Card>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemText}>{item.data}</Text>
//             <Avatar label="J" />
//           </View>
//         </Card>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Agenda
//         items={{
//           "2024-03-26": [
//             {
//               id: 1,
//               name: "Meeting 1",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//           "2024-03-28": [
//             {
//               id: 3,
//               name: "Meeting 2",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//           "2024-03-29": [
//             {
//               id: 5,
//               name: "Meeting 3",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//           "2024-03-30": [
//             {
//               id: 12,
//               name: "Meeting 4",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//           "2024-03-31": [
//             {
//               id: 34,
//               name: "Meeting 5",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//           "2024-03-25": [
//             {
//               id: 35,
//               name: "Meeting 6",
//               data: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ",
//             },
//           ],
//         }}
//         loadItemsForMonth={loadItems}
//         selected={"2017-05-16"}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default ScreenViewMore;

// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
// } from 'react-native';
// import { Agenda } from 'react-native-calendars';

// export default function ScreenViewMore() {
//   const [items, setItems] = useState({});

//   // Simular la carga de datos dinámicamente con useEffect
//   useEffect(() => {
//     const fetchedItems = {
//       '2024-03-26': [
//         {
//           id: '1', // Asegúrate de que cada item tenga un ID único
//           name: 'Meeting 1',
//           data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
//         },
//       ],
//       '2024-03-28': [
//         {
//           id: '2',
//           name: 'Meeting 2',
//           data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
//         },
//       ],
//       '2024-03-29': [
//         {
//           id: '3',
//           name: 'Meeting 3',
//           data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
//         },
//       ],
//       // Agrega más fechas e items
//     };

//     setItems(fetchedItems);
//   }, []);

//   // Renderizar cada item usando FlatList para mejor rendimiento si hay muchos elementos
//   const renderAgendaItem = (item) => (
//     <TouchableOpacity style={styles.item} key={item.id}>
//       <Text style={styles.itemText}>{item.name}</Text>
//       <Text style={styles.itemText}>{item.data}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Agenda
//         items={items}
//         renderItem={renderAgendaItem}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   item: {
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//     marginVertical: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Agenda } from 'react-native-calendars';

// export default function ScreenViewMore() {
//   return (
//     <View style={styles.container}>
//       <Agenda
//         items={{
//           '2024-03-26': [{id:1,name: 'Meeting 1', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-28': [{id:3,name: 'Meeting 2', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-29': [{id:5, name: 'Meeting 3', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-30': [{id:12, name: 'Meeting 4', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-31': [{id:34, name: 'Meeting 5', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-25': [{id:35, name: 'Meeting 6', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}]
//         }}
//         renderItem={(item) => (
//           <FlatList
//             data={item.data}
//             renderItem={({ item , isFirst}) => (
//               <TouchableOpacity style={styles.item} key={item.id}>
//                 <Text style={styles.itemText}>{item.name}</Text>
//                 <Text style={styles.itemText}>{item.data}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   item: {
//     backgroundColor: 'lightblue',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 25,
//     paddingBottom:20
//   },
//   itemText: {
//     color: 'black',
//     fontSize: 16,
//   }
// });

// import { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Agenda } from 'react-native-calendars';
// import { Avatar,Card } from '@rneui/themed';
// const timeToString = (time) => {
// const date = new Date(time);
// return date.toISOString().split('T')[0];
// };

// export const ScreenViewMore = () => {
// const [items, setItems] = useState({});

// useEffect(() => {
//     const today = timeToString(Date.now());
//     const newItems = { [today]: [{ name: 'Testing calendars', height: 50 }] };
//     setItems(newItems);
// }, []);

// const loadItems = (day) => {
//     const today = timeToString(Date.now());
//     const newItems = { [today]: [{ name: 'Testing calendars', height: 50 }] };
//     setItems(newItems);
// };

// const renderItem = (item) => {
//     return (
//         <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//             <Card>
//                 <Card>
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}>
//                         <Text>{item.name}</Text>
//                         <Avatar label="J" />
//                     </View>
//                 </Card>
//             </Card>
//         </TouchableOpacity>
//     );
// };

// return (
//     <View style={{ flex: 1 }}>
//         <Agenda
//             items={items}
//             loadItemsForMonth={loadItems}
//             selected={timeToString(Date.now())}
//             renderItem={renderItem}
//             theme={{
//                 todayTextColor: 'red',
//                 selectedDayBackgroundColor: 'lightblue',
//                 dotColor: 'blue',
//             }}
//         />
//     </View>
// );
// };

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { Agenda } from 'react-native-calendars';
// export default function ScreenViewMore(){
//   return (
//     <SafeAreaView style={styles.container}>
//       <Agenda
//         items={{
//           '2024-03-26': [{name: 'Meeting 1', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-28': [{name: 'Meeting 2', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-29': [{name: 'Meeting 3', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-30': [{name: 'Meeting 4', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-31': [{name: 'Meeting 5', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
//           '2024-03-25': [{name: 'Meeting 6', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}]
//         }}
//         renderItem={(item, isFirst) => (
//           <TouchableOpacity style={styles.item}>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemText}>{item.data}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   item: {
//     backgroundColor: 'lightblue',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 25,
//     paddingBottom:20
//   },
//   itemText: {
//     color: 'black',
//     fontSize: 16,
//   }
// });

// import  { useState, useEffect } from'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import { Avatar } from "@react-native-material/core";
// import { Card } from '@rneui/themed';

// const timeToString = (hora) => {
// const fecha = new Date(hora);
// return fecha.aISOString().split('T')[0];
// };

// export const ScreenViewMore = () => {
// const [items, setItems] = useState({});

// useEffect(() => {
//     const today = timeToString(Date.now());
//     const newItems = { [today]: [{ name: 'Testing calendars', height: 50 }] };
//     setItems(newItems);
// }, []);

// const loadItems = (day) => {
//     const today = timeToString(Date.now());
//     const newItems = { [today]: [{ name: 'Testing calendars', height: 50 }] };
//     setItems(newItems);
// };

// const renderItem = (item) => {
//     return (
//         <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//             <Card>
//                 <Card.Content>
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}>
//                         <Text>{item.name}</Text>
//                         <Avatar.Text label="J" />
//                     </View>
//                 </Card.Content>
//             </Card>
//         </TouchableOpacity>
//     );
// };

// return (
//     <View style={{ flex: 1 }}>
//         <Agenda
//             items={items}
//             loadItemsForMonth={loadItems}
//             selected={timeToString(Date.now())}
//             renderItem={renderItem}
//             theme={{
//                 todayTextColor: 'red',
//                 selectedDayBackgroundColor: 'lightblue',
//                 dotColor: 'blue',
//             }}
//         />
//     </View>
// );
// };

// import {useState} from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import { Avatar } from "@react-native-material/core";
// import { Card } from '@rneui/themed';
// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

// export const ScreenViewMore = () => {
//   const [items, setItems] = useState({});

// //   const loadItems = (day) => {
// //     setTimeout(() => {
// //       for (let i = -15; i < 85; i++) {
// //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
// //         const strTime = timeToString(time);
// //         if (!items[strTime]) {
// //           items[strTime] = [];
// //           const numItems = Math.floor(Math.random() * 3 + 1);
// //           for (let j = 0; j < numItems; j++) {
// //             items[strTime].push({
// //               name: 'Item for ' + strTime + ' #' + j,
// //               height: Math.max(50, Math.floor(Math.random() * 150)),
// //             });
// //           }
// //         }
// //       }
// //       const newItems = {};
// //       Object.keys(items).forEach((key) => {
// //         newItems[key] = items[key];
// //       });
// //       setItems(newItems);
// //     }, 1000);
// //   };
// const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };
//   const renderItem = (item) => {
//     return (
//       <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
//         <Card>
//           {/* <Card.Content> */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <Text>{item.name}</Text>
//               <Avatar label="J" />
//             </View>
//           {/* </Card.Content> */}
//         </Card>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={'2017-05-16'}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };
