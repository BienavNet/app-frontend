import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import { yupResolver } from "@hookform/resolvers/yup";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import {
  getClasesOne,
  registerClase,
  updateClase,
} from "../../../../src/services/fetchData/fetchClases";
import { getSupervisor } from "../../../../src/services/fetchData/fetchSupervisor";
import { useToast } from "react-native-toast-notifications";
import { useCallback, useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownModal from "../../../share/dropDown/dropDownModal";
import { useFocusEffect } from "@react-navigation/native";
import {
  Status,
  registerClaseSchema,
} from "../../../../src/utils/schemas/clasesSchema";
import Dropdown from "../../../share/dropDown/dropDown";
import salonjson from "./json/salon.json";
export const RegisterClase = ({ navigation, route }) => {
  //supervisor
  const [supervisores, setSupervisores] = useState([]);
  const [titlesupervisor, setTitleSupervisor] = useState(
    "Seleccione un supervisor"
  );
  //opcion editar
  const [editing, setEditing] = useState(false);
  //campo fecha
  const [date, setDate] = useState(new Date());
  console.log("date passed: typeof", typeof date);
  console.log("date passed: ", date);
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [titleFecha, setTitleFecha] = useState("Fecha");
  //campo hora
  const [time, setTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState("");
  console.log("time passed: " + time);
  console.log("time passed: typeof ", typeof time);
  const [showTimeepicker, setShowTimePicker] = useState(false);
  const [titleTime, setTitleTime] = useState("Hora");

  const fetchSupervisor = useCallback(async () => {
    const res = await getSupervisor();
    const mappedSupervisores = res.map((supervisor) => ({
      id: supervisor.id.toString(), // se usa el id como key
      label: `${supervisor.nombre} ${supervisor.apellido}`,
      value: supervisor.id,
    }));

    setSupervisores(mappedSupervisores);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSupervisor();
    }, [fetchSupervisor])
  );

  const submitShowDatepicker = (e, selectDate, onChange, value) => {
    if (e.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    const currentDate = selectDate || value;
    setShowDatePicker(false);
    if (currentDate instanceof Date && !isNaN(currentDate.getTime())) {
      const dateOnly = new Date(currentDate.setHours(0, 0, 0, 0)); // Set hours, minutes, seconds to 0
      setDate(dateOnly);
      setTitleFecha(dateOnly.toLocaleDateString());
      onChange(dateOnly.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
  };

  const submitShowTimepicker = (e, selectedTime, onChange) => {
    if (e.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }

    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    console.log("current typeof", currentTime);
    if (currentTime instanceof Date && !isNaN(currentTime.getTime())) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, "0")}`;
      
      setTime(currentTime); // Setea el tiempo como un objeto Date
      setFormattedTime(formattedTime); // Setea el tiempo como una cadena de texto
      setTitleTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // Actualiza el título mostrado en el botón
      onChange(formattedTime); // Pasa la cadena de texto al formulario
    }
    
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizar Clase" });
      (async () => {
        const response = await getClasesOne(route.params.id);
        console.log(response, "Supervisor response");
        const value = response.find((doc) => doc.id === route.params.id);
        if (value) {
          reset({
            horario: value.horario,
            salon: value.salon,
            supervisor: value.supervisor,
            estado: value.estado,
            fecha: value.fecha,
          });
        } else {
          throw new Error("Clase no encontrada");
        }
      })();
    }
  }, [route.params]);

  const toast = useToast();
  const ToastSuccess = (message) => {
    toast.show(message, {
      icon: <Feather name="check-circle" size={30} color="green" />,
      style: {
        backgroundColor: "green",
        borderColor: "green",
      },
      type: "Success",
      duration: 500,
      successColor: "green",
      textStyle: {
        fontSize: 16,
        color: "white",
      },
      animationType: "zoom-in",
    });
  };

  const ToastError = (error) => {
    toast.show(error, {
      icon: <MaterialIcons name="error" size={30} color="#ffffff" />,
      style: {
        backgroundColor: "red",
        borderColor: "red",
      },
      type: "Error",
      duration: 500,
      dangerColor: "red",
      textStyle: {
        fontSize: 16,
        color: "white",
      },
      animationType: "zoom-in",
    });
  };
  const onsubmit = async (data) => {
    const { horario, salon, supervisor, estado, fecha } = data;
    console.log("horario :", horario + "salon: ", salon+ "supervisor: ", supervisor + "estado: ", estado + "fecha: ", fecha);
    try {
      if (!editing) {
        await registerClase(horario, salon, supervisor, estado, fecha);
        ToastSuccess("register successfully");
      } else {
        await updateClase(route.params.id, data);
        ToastSuccess("update successfully");
      }
      reset();
      navigation.navigate("ListScreen");
    } catch (error) {
      const errorMessage =
        typeof error.message === "string"
          ? error.message
          : JSON.stringify(error);
      ToastError(errorMessage);
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerClaseSchema),
  });

  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        {!editing ? (
          <Text className="text-lg text-center font-bold">Registrar Clase</Text>
        ) : (
          <Text className="text-lg text-center font-bold">
            Actualizar Clase
          </Text>
        )}
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 h-full">
          {!editing ? (
            <View>
              <View>
                <Controller
                  defaultValue=""
                  name="supervisor"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <DropdownModal
                        error={errors.supervisor}
                        value={value}
                        transparent={false}
                        data={supervisores}
                        placeholder="Seleccione un supervisor"
                        onChange={(item) => {
                          onChange(item.label);
                          setSupervisores(item.value);
                          setTitleSupervisor(item.label);
                          console.log("Supervisor seleccionado:", item.label);
                        }}
                      />
                      {errors.supervisor && (
                        <Text style={{ color: "red", fontSize: 16 }}>
                          {errors.supervisor.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
              <View className="flex-row justify-items-stretch">
                <View className="w-1/2 justify-self-start pr-2 pt-2.5">
                  <Controller
                    defaultValue=""
                    name="salon"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <DropdownModal
                          error={errors.salon}
                          transparent={false}
                          data={salonjson.map((status) => ({
                            id: status.id,
                            label: status.nombre, 
                          }))}
                          placeholder="Seleccione"
                          onChange={(item) => {
                            console.log("salones typeof", item);
                            onChange(item.label);
                          }}
                          value={value}
                        />
                        {errors.salon && (
                          <Text style={{ color: "red", fontSize: 16 }}>
                            {errors.salon.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>

                <View className="w-1/2 justify-self-end pl-2">
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Dropdown
                          error={errors.estado}
                          data={Status.map((status) => ({
                            label: status,
                            value: status,
                          }))}
                          placeholder="Seleccione"
                          onChange={onChange}
                          value={value}
                        />

                        {errors.estado && (
                          <Text style={{ color: "red", fontSize: 16 }}>
                            {errors.estado.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>

              <View className="flex-row justify-items-stretch">
                <View className="w-1/2 justify-self-end p-1">
                  <Controller
                    name="fecha"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Button
                          style={{
                            height: 44,
                            paddingTop: 4,
                            marginLeft: 4,
                            borderRadius: 8,
                            width: "95%",
                          }}
                          leading={() => (
                            <MaterialCommunityIcons
                              name="calendar-month"
                              size={28}
                              color={errors.fecha ? "#ffffff" : "black"}
                            />
                          )}
                          tintColor={errors.fecha ? "#ffffff" : "black"}
                          color={errors.fecha ? "red" : "#1371C3"}
                          onPress={() => {
                            setShowDatePicker(true);
                          }}
                          title={titleFecha}
                        />
                        {showDatepicker && (
                          <DateTimePicker
                            minimumDate={new Date()}
                            testID="datePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="calendar"
                            onChange={
                              (e, selectedDate) =>
                                submitShowDatepicker(
                                  e,
                                  selectedDate,
                                  onChange,
                                  value
                                )
                              //   {
                              //   setShowDatePicker(false);
                              //   const current = selectedDate || value;
                              //   console.log("current time ", current);
                              //   console.log("current time typeof", typeof current);
                              //   onChange(current);
                              //   setTitleFecha(current.toLocaleDateString());
                              // }
                            }
                          />
                        )}
                        {errors.fecha && (
                          <Text style={{ color: "red", fontSize: 16 }}>
                            {errors.fecha.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>

                <View className="w-1/2 justify-self-start p-1">
                  <Controller
                    name="horario"
                    control={control}
                    render={({ field: { onChange} }) => (
                      <>
                        <Button
                          style={{
                            height: 44,
                            paddingTop: 4,
                            borderRadius: 8,
                            width: "95%",
                          }}
                          tintColor={errors.horario ? "#ffffff" : "black"}
                          leading={() => (
                            <MaterialCommunityIcons
                              name="clock-time-ten-outline"
                              size={28}
                              color={errors.horario ? "#ffffff" : "black"}
                            />
                          )}
                          color={errors.horario ? "red" : "#1371C3"}
                          onPress={() => {
                            setShowTimePicker(true);
                          }}
                          title={titleTime}
                        />
                        {showTimeepicker && (
                          <DateTimePicker
                            testID="timePicker"
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="clock"
                            onChange={(e, selectedTime) =>
                              submitShowTimepicker(
                                e,
                                selectedTime,
                                onChange
                              )
                            }
                          />
                        )}
                        {errors.horario && (
                          <Text style={{ color: "red", fontSize: 16 }}>
                            {errors.horario.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>
            </View>
          ) : (
            <>
              <View className="flex-row justify-items-stretch">
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
              </View>
            </>
          )}

          <View className="w-full pt-3">
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
          </View>
        </View>
      </ScrollView>
    </>
  );
};
