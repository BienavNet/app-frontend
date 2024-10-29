// import { useState, useCallback, useRef, useEffect } from "react";
// import { StyleSheet } from "react-native";
// // import Feather from "@expo/vector-icons/Feather";
// import { getFutureDatesDisabled } from "../../../../../src/utils/functiones/functions"
// const iconLeft = require("../../../../../assets/png/previous.png");
// const iconrigth = require("../../../../../assets/png/nextt.png");

// import { CalendarList } from "react-native-calendars"

// import {
//   AgendaList,
//   CalendarProvider,
//   ExpandableCalendar,
//   WeekCalendar,
// } from "react-native-calendars";
// // import { ColorItem } from "../../../../styles/StylesGlobal";
// import AgendaItem from "./AgendaCalendar/AgendaItem";
// import { getTheme, themeColor, lightThemeColor } from "./AgendaCalendar/theme";
// import Loading from "../../../../share/loading";
// import { useClaseDocentes } from "../../../../../src/hooks/customHooks";
// import { userData } from "../../../../../src/hooks/use/userData";



// export function getMarkedDates() {
//   const marked = {};
//   // agendaItems = loadAgendaItems()
//   // console.log(agendaItems)

//   agendaItems.forEach((item) => {
//     console.log(item)
//     // NOTE: only mark dates with data
//     if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
//       marked[item.title] = { marked: true };
//     } else {
//       marked[item.title] = { disabled: true };
//     }
//   });
//   return marked;
// }

// // const {CEDULA} = userData()
// // export const agendaItems = useClaseDocentes('1007582633')
// // export const agendaItems = []



// export const agendaItems = [
//   {
//     title: "",
//     data: [
//       { hour: "4pm", duration: "1h", title: "Pilates ABC" },
//       { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
//     ],
//   },
// ]

// const CalendarListScreen = (props) => {
//   const {CEDULA} = userData()
//   const agendaItems2 = useClaseDocentes(CEDULA)
//   const [loading, setLoading] = useState(true); // estado de carga
//   const { horizontalView } = props;
//   const minDate = "2024-01-01"
//   const marked = useRef(getFutureDatesDisabled(minDate));
//   console.log(`markes ${marked} -- marked current ${marked.current}`)
//   // const marked = useRef(getMarkedDates());
//   const theme = useRef(getTheme()); // theme
//   const todayBtnTheme = useRef({ todayButtonTextColor: themeColor }); //stylos de un button

//   const renderItem = useCallback(({ item }) => {
//     return <AgendaItem item={item} />;
//   }, []);

//   useEffect(() => {
//     // Simulamos la carga de los datos necesarios
//     if (agendaItems && marked.current) {
//       // Si los datos de la agenda y las fechas marcadas están disponibles, dejamos de cargar
//       setLoading(false);
//     }
//   }, [agendaItems, marked.current]); // Reaccionar cuando estos elementos estén listos

//   if (loading) {
//     // Mientras se cargan los datos, mostramos el indicador de carga
//     return <Loading />;
//   }
//   return (
//     <CalendarProvider
//       theme={todayBtnTheme.current}
//       showTodayButton
//       date="2024-06-25" // Fecha actual seleccionada
//     >
//       {horizontalView ? (
//         <>
//           <WeekCalendar
//             minDate={minDate}
//             maxDate="2025-01-01"
//             testID="week_calendar_btn"
//             firstDay={1}
//           // markedDates={marked.current}
//           />
//         </>
//       ) : (
//         <ExpandableCalendar
//           minDate={minDate}
//           maxDate="2025-01-01"
//           testID="expandable_calendar_btn"
//           leftArrowImageSource={iconLeft}
//           rightArrowImageSource={iconrigth}
//           firstDay={1}
//           theme={theme.current}
//         // markedDates={marked}
//         />
//       )}
//       <AgendaList
//         sections={agendaItems}
//         renderItem={renderItem}
//         scrollToNextEvent
//         sectionStyle={styles.section}
//       />
//     </CalendarProvider>
//   );
// };



// export default CalendarListScreen;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     width: "100%",
//     justifyContent: "space-between",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   month: {
//     marginLeft: 5,
//   },
//   year: {
//     marginRight: 5,
//   },
//   calendar: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   header: {
//     backgroundColor: "lightgrey",
//   },
//   section: {
//     backgroundColor: "red",
//     color: "grey",
//     textTransform: "capitalize",
//   },
// });

import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable, TextInput } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { useState } from 'react'
import { userData } from "../../../../../src/hooks/use/userData";
import { useClaseDocentes } from "../../../../../src/hooks/customHooks";
import { registerComentario } from '../../../../../src/services/fetchData/fetchComentario';
import { registerNotification } from '../../../../../src/services/fetchData/fetchNotification';


export function loadCalendarItems(CEDULA) {
  const data = useClaseDocentes(CEDULA)
  let aux = {}

  for (item of data) {
    const dateFixed = item.fecha.substring(0, 10)
    aux[dateFixed] = [
      {
        height: 100,
        data: item
      }
    ]
  }
  return aux
}


const CalendarListScreen = () => {

  const { CEDULA, ID, DIRECTOR } = userData()
  const items = loadCalendarItems(CEDULA)
  const [showModal, setShowModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentItem, setCurrentItem] = useState()
  const [text, setText] = useState()

  const _renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        // onPress={() => alert(item.data.asignatura)}
        onPress={() => {
          setShowModal(true)
        }}
        onPressIn={() => {
          setCurrentItem(item)
        }}
      >

        <View style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 20
        }}>

          <View style={{
            paddingTop: 5
          }}>
            <Text style={styles.text}>{item.data.asignatura}</Text>
          </View>
          <View style={{
            alignSelf: 'flex-end'
          }}>
            <Text style={styles.text}>{"Hora: "}{item.data.hora_inicio}{" - "}{item.data.hora_fin}</Text>
          </View>
          <View style={{
            alignSelf: 'flex-end'
          }}>
            <Text style={styles.text} >{"Salon: "}{item.data.numero_salon}</Text>
          </View>

        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal)
        }}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"Dejar un comentario sobre la clase: "}{currentItem?.data.asignatura}</Text>
            {/* <Text style={styles.modalText}>{currentItem?.data.asignatura}</Text> */}
            <TextInput
              style={[styles.input, {
                width: 250,
                height: 100,
                borderRadius: 8,
                textAlign: 'left'
              }]}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder="Escribe tu comentario aqui..."
              keyboardType="default"
              defaultValue={text}
              onChangeText={ newText => setText(newText)}
            />
            <View style={{
              flexDirection: 'row'
            }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setShowModal(!showModal)
                  setCurrentItem(undefined)
                  setText('')
                }}>
                <Text style={styles.textStyle}>Cerrar Ventana</Text>
              </Pressable>
              <Pressable
                style={[styles.button, {
                  backgroundColor: '#27b220'
                }]}
                onPress={ async () => {
                  // console.log(text, ID, currentItem.data.salon_id, currentDate, currentItem.data.clase_id)
                  const resp = await registerComentario(text, ID, currentItem.data.salon_id, currentDate, currentItem.data.clase_id)
                  if (resp?.status == 200){
                    setText('')
                    setShowModal(!showModal)
                    alert("Comentario realizado con exito!")

                    //sending notification to director rol
                    //SOLO HAY UN DIRECTOR, HAY QUE DEFINIR UNA VARIABLE DE ENTORNO
                    try {
                      //No funciona para enviar notificaciones
                      const notification_response = await registerNotification('comentario', `${CEDULA}`, `${DIRECTOR}`)
                      if (notification_response?.status == 200)
                          console.log("Notificacion enviada al DIRECTOR")
                    } catch (error) {
                      console.log("Error al enviar la notificacion. ", error)
                    }
                  }
                }}
              >
                <Text style={styles.textStyle}>Comentar</Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>

      <Agenda
        selected={currentDate}
        items={items}
        style={styles.agenda}
        renderItem={_renderItem}
        showClosingKnob={true}
        pastScrollRange={50}
        futureScrollRange={50}
      // markedDates={markedDates}
      >

      </Agenda>
    </View>
  )


}

export default CalendarListScreen;

const styles = StyleSheet.create({
  agenda: {
    height: Dimensions.get('window').height,
    maxHeight: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    marginTop: 50
  },
  text: {
    fontSize: 15,
    margin: 5,
    alignSelf: "stretch",
    color: 'white'
    // textAlign: "left"
  },
  item: {
    flex: 1,
    marginLeft: 10,
    alignContent: 'flex-start',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#3C9B61',
    borderRadius: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#e0310b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


