import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
export default function ScreenViewMore(){
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={{
          '2024-03-26': [{name: 'Meeting 1', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
          '2024-03-28': [{name: 'Meeting 2', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
          '2024-03-29': [{name: 'Meeting 3', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
          '2024-03-30': [{name: 'Meeting 4', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
          '2024-03-31': [{name: 'Meeting 5', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}],
          '2024-03-25': [{name: 'Meeting 6', data:'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. '}]
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom:20
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  }
});


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