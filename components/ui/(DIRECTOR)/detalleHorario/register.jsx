import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, ScrollView } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getHorarioAll } from "../../../../src/services/fetchData/fetchHorarios";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FormRegisterDetailHorario } from "./components/formRegisterDetailHorario";


export const RegisterDetailHorario = ({ navigation, route , idhorario, editing}) => {

  // console.log("idhorario", idhorario)
  //horarios
  // const [horarios, setHorarios] = useState([]);
  // const fetchHorarios = useCallback(async () => {
  //   const res = await getHorarioAll();
  //   console.log("register horarios", res);
  //   const mapped = res.map((i) => ({
  //     id: i.id.toString(),
  //     label: `${i.nombre} ${i.apellido}`,
  //     value: i.id,
  //   }));
  //   console.log("res detail horario -->", res);
  //   setHorarios(mapped);
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchHorarios();
  //   }, [fetchHorarios])
  // );

  // const submitShowTimepicker = (e, selectedTime, onChange) => {
  //   if (e.type === "dismissed") {
  //     setShowTimeHIPicker(false);
  //     return;
  //   }
  //   const currentTime = selectedTime || horainicio;
  //   setShowTimeHIPicker(false);
  //   console.log("current typeof", currentTime);
  //   if (currentTime instanceof Date && !isNaN(currentTime.getTime())) {
  //     const formattedTime = formatHourHHMM(currentTime);

  //     setHoraInicio(currentTime); // Setea el tiempo como un objeto Date
  //     setTitleHI(
  //       currentTime.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: true,
  //       })
  //     );
  //     onChange(formattedTime);
  //   }
  // };
  // useEffect(() => {
  //   if (route.params && route.params.id) {
  //     setEditing(true);
  //     navigation.setOptions({ headerTitle: "Actualizar Clase" });
  //     (async () => {
  //       const response = await getClasesOne(route.params.id);
  //       console.log(response, "Supervisor response");
  //       const value = response.find((doc) => doc.id === route.params.id);
  //       if (value) {
  //         reset({
  //           horario: value.horario,
  //           salon: value.salon,
  //           supervisor: value.supervisor,
  //           estado: value.estado,
  //           fecha: value.fecha,
  //         });
  //       } else {
  //         throw new Error("Clase no encontrada");
  //       }
  //     })();
  //   }
  // }, [route.params]);

  // const onsubmit = async (data) => {
  //   const { horario, dia, hora_inicio, hora_fin } = data;
  //   try {
  //     if (!editing) {
  //       await registerDetailHorario(horario, dia, hora_inicio, hora_fin);
  //       console.log("register successfully");
  //     } else {
  //       await updateDetailHorario(route.params.id, data);
  //       console.log("update successfully");
  //     }
  //     reset();
  //     navigation.navigate("ListScreen");
  //   } catch (error) {
  //     throw new Error("Error: " + error.message);
  //   }
  // };

  // const {
  //   handleSubmit,
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(detailHorarioRegister),
  // });    color fondo = #F2F2F0
  return (
    <>
      <View className="py-2" style={{ backgroundColor: "white" }}>
        {!editing ? (
          <Text className="text-lg text-center font-bold">
            Registrar Detalle Horario
          </Text>
        ) : (
          <Text className="text-lg text-center font-bold">
            Actualizar Detalle Horario
          </Text>
        )}
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex pb-5 h-full">
          {console.log("editing ??????? ", editing)}
          {!editing ? (
           <FormRegisterDetailHorario
           navigation={navigation}
           idhorario={idhorario}
           editing={editing}
           /> 
            // <View>
            //   <View>
            //     <Controller
            //       defaultValue=""
            //       name="horario"
            //       control={control}
            //       render={({ field: { onChange, value } }) => (
            //         <>
            //           <DropdownModal
            //             error={errors.horario}
            //             value={value}
            //             transparent={false}
            //             data={horarios}
            //             placeholder="Seleccione un supervisor"
            //             onChange={(item) => {
            //               onChange(item.label);
            //             }}
            //           />
            //           {errors.horario && (
            //             <Text style={{ color: "red", fontSize: 16 }}>
            //               {errors.horario.message}
            //             </Text>
            //           )}
            //         </>
            //       )}
            //     />
            //   </View>
            //   <View className="flex-row justify-items-stretch">
            //     <View className="w-full justify-self-end pl-2">
            //       <Controller
            //         name="dia"
            //         control={control}
            //         render={({ field: { onChange, value } }) => (
            //           <>
            //             <Dropdown
            //               error={errors.dia}
            //               data={diasArray.map((status) => ({
            //                 id: status,
            //                 label: status,
            //               }))}
            //               placeholder="Seleccione día"
            //               onChange={onChange}
            //               value={value}
            //             />

            //             {errors.dia && (
            //               <Text style={{ color: "red", fontSize: 16 }}>
            //                 {errors.dia.message}
            //               </Text>
            //             )}
            //           </>
            //         )}
            //       />
            //     </View>
            //   </View>

            //   <View className="flex-row justify-items-stretch">
            //     <View className="w-1/2 justify-self-start p-1">
            //       <CustomTimePicker
            //         name="hora_inicio"
            //         control={control}
            //         errors={errors.hora_inicio}
            //         title="Hora inicio"
            //         testID="hora_inicio"
            //         initialValue={horainicio}
            //         mode="time"
            //         display="clock"
            //         is24Hour={true}
            //         onTimeSelected={(formattedTime) => setHoraInicio(formattedTime)}
            //       />
            //       {/* <Controller
            //         name="hora_inicio"
            //         control={control}
            //         render={({ field: { onChange } }) => (
            //           <>
            //             <Button
            //               style={{
            //                 height: 44,
            //                 paddingTop: 4,
            //                 borderRadius: 8,
            //                 width: "95%",
            //               }}
            //               tintColor={errors.hora_inicio ? "#ffffff" : "black"}
            //               leading={() => (
            //                 <MaterialCommunityIcons
            //                   name="clock-time-ten-outline"
            //                   size={28}
            //                   color={errors.hora_inicio ? "#ffffff" : "black"}
            //                 />
            //               )}
            //               color={errors.hora_inicio ? "red" : "#1371C3"}
            //               onPress={() => {
            //                 setShowTimeHIPicker(true);
            //               }}
            //               title={titlehi}
            //             />
            //             {showTimehipicker && (
            //               <DateTimePicker
            //                 testID="hora_inicio"
            //                 value={horainicio}
            //                 mode="time"
            //                 is24Hour={true}
            //                 display="clock"
            //                 onChange={(e, selectedTime) =>
            //                   submitShowTimepicker(e, selectedTime, onChange)
            //                 }
            //               />
            //             )}
            //             {errors.hora_inicio && (
            //               <Text style={{ color: "red", fontSize: 16 }}>
            //                 {errors.hora_inicio.message}
            //               </Text>
            //             )}
            //           </>
            //         )}
            //       /> */}
            //     </View>

            //     <View className="w-1/2 justify-self-start p-1">
            //     <CustomTimePicker
            //         name="hora_fin"
            //         control={control}
            //         errors={errors.hora_fin}
            //         title="Hora Fin"
            //         testID="hora_fin"
            //         initialValue={horafin}
            //         mode="time"
            //         display="clock"
            //         is24Hour={true}
            //         onTimeSelected={(formattedTime) => setHoraFin(formattedTime)}
            //       />
            //       {/* <Controller
            //         name="hora_fin"
            //         control={control}
            //         render={({ field: { onChange } }) => (
            //           <>
            //             <Button
            //               style={{
            //                 height: 44,
            //                 paddingTop: 4,
            //                 borderRadius: 8,
            //                 width: "95%",
            //               }}
            //               tintColor={errors.hora_fin ? "#ffffff" : "black"}
            //               leading={() => (
            //                 <MaterialCommunityIcons
            //                   name="clock-time-ten-outline"
            //                   size={28}
            //                   color={errors.hora_fin ? "#ffffff" : "black"}
            //                 />
            //               )}
            //               color={errors.hora_fin ? "red" : "#1371C3"}
            //               onPress={() => {
            //                 setShowTimeHFPicker(true);
            //               }}
            //               title={titlehf}
            //             />
            //             {showTimehfpicker && (
            //               <DateTimePicker
            //                 testID="hora_fin"
            //                 value={horafin}
            //                 mode="time"
            //                 is24Hour={true}
            //                 display="clock"
            //                 onChange={(e, selectedTime) =>
            //                   submitShowTimepicker(e, selectedTime, onChange)
            //                 }
            //               />
            //             )}
            //             {errors.hora_fin && (
            //               <Text style={{ color: "red", fontSize: 16 }}>
            //                 {errors.hora_fin.message}
            //               </Text>
            //             )}
            //           </>
            //         )}
            //       /> */}
            //     </View>
            //   </View>
            // </View>
          ) : (
            <>
              {/* <View className="flex-row justify-items-stretch">
                <View className="w-1/2 justify-self-start">
                  <CustomInput
                    variant="outlined"
                    control={control}
                    placeholder="example"
                    label="Nombre"
                    icon={
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
                    }
                    name="nombre"
                  />
                </View>

                <View className="w-1/2 justify-self-end">
                  <CustomInput
                    variant="outlined"
                    name="apellido"
                    control={control}
                    placeholder="example"
                    label="Apellido"
                  />
                </View>
              </View>

              <View>
                <CustomInput
                  variant="outlined"
                  name="correo"
                  control={control}
                  placeholder="example@example.com"
                  keyboardType="email-address"
                  label="Correo Electronico"
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
                  }
                />
              </View> */}
            </>
          )}

          {/* <View className="w-full pt-3">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className={`w-11/12 self-center p-3 rounded-lg ${
                !editing ? "bg-lime-600" : "bg-amber-600"
              }`}
            >
              <Text className="text-white text-center font-bold text-xl">
                {!editing ? "Registrar" : "Actualizar"}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};
