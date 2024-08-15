import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import { yupResolver } from "@hookform/resolvers/yup";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import {
  getDetailHorarioOne,
  registerDetailHorario,
  updateDetailHorario,
} from "../../../../src/services/fetchData/fetchDetailHorario";
import { getHorarioAll } from "../../../../src/services/fetchData/fetchHorarios";
import { useToast } from "react-native-toast-notifications";
import { useCallback, useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownModal from "../../../share/dropDown/dropDownModal";
import { useFocusEffect } from "@react-navigation/native";
import { registerComentario } from "../../../../src/utils/schemas/comentarioSchema";
import Dropdown from "../../../share/dropDown/dropDown";
import { MultilineTextInputExample } from "../../../share/inputs/customMultipleTextInput";

export const RegisterComentario = ({ navigation, route }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerComentario),
  });

  //horarios
  const [horarios, setHorarios] = useState([]);

  // horainicio y horafin
  const [horainicio, setHoraInicio] = useState(new Date());
  // const [showTimehipicker, setShowTimeHIPicker] = useState(false);

  const [horafin, setHoraFin] = useState(new Date());

  // const [showTimehfpicker, setShowTimeHFPicker] = useState(false);

  const fetchHorarios = useCallback(async () => {
    const res = await getHorarioAll();
    const mapped = res.map((i) => ({
      id: i.id.toString(),
      label: `${i.nombre} ${i.apellido}`,
      value: i.id,
    }));
    console.log("res detail horario -->", res);
    setHorarios(mapped);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHorarios();
    }, [fetchHorarios])
  );

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

  const onsubmit = async (data) => {
    const { horario, dia, hora_inicio, hora_fin } = data;
    try {
      if (!editing) {
        await registerDetailHorario(horario, dia, hora_inicio, hora_fin);
        console.log("register successfully");
      } else {
        await updateDetailHorario(route.params.id, data);
        console.log("update successfully");
      }
      reset();
      navigation.navigate("ListScreen");
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  };

  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        <Text className="text-lg text-center font-bold">
          Registrar Comentario
        </Text>
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 h-full">
          <View>
            <View>
<MultilineTextInputExample
name="comentario"
control={control}
errors={errors.comentario}
numberOfLines={4}
maxLength={100}
value={comentario}

/>
              //comentario aqui.
              {/* <Controller
                defaultValue=""
                name="horario"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DropdownModal
                      error={errors.horario}
                      value={value}
                      transparent={false}
                      data={horarios}
                      placeholder="Seleccione un supervisor"
                      onChange={(item) => {
                        onChange(item.label);
                      }}
                    />
                    {errors.horario && (
                      <Text style={{ color: "red", fontSize: 16 }}>
                        {errors.horario.message}
                      </Text>
                    )}
                  </>
                )}
              /> */}
            </View>
            <View className="flex-row justify-items-stretch">
              <View className="w-full justify-self-end pl-2">
              <View>
              <Controller
                name="docente"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DropdownModal
                      error={errors.docente}
                      value={value}
                      transparent={false}
                      data={horarios}
                      placeholder="Seleccione un docente"
                      onChange={(item) => {
                        onChange(item.label);
                      }}
                    />
                    {errors.docente && (
                      <Text style={{ color: "red", fontSize: 16 }}>
                        {errors.docente.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
                {/* <Controller
                  name="dia"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Dropdown
                        error={errors.dia}
                        data={diasArray.map((status) => ({
                          id: status,
                          label: status,
                        }))}
                        placeholder="Seleccione día"
                        onChange={onChange}
                        value={value}
                      />

                      {errors.dia && (
                        <Text style={{ color: "red", fontSize: 16 }}>
                          {errors.dia.message}
                        </Text>
                      )}
                    </>
                  )}
                /> */}
              </View>
            </View>

            <View className="flex-row justify-items-stretch">
              <View className="w-full justify-self-start p-1">
              <View>
              <Controller
                name="salon"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DropdownModal
                      error={errors.salon}
                      value={value}
                      transparent={false}
                      data={horarios}
                      placeholder="Seleccione un salon"
                      onChange={(item) => {
                        onChange(item.label);
                      }}
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
                {/* <CustomTimePicker
                  name="hora_inicio"
                  control={control}
                  errors={errors.hora_inicio}
                  title="Hora inicio"
                  testID="hora_inicio"
                  initialValue={horainicio}
                  mode="time"
                  display="clock"
                  is24Hour={true}
                  onTimeSelected={(formattedTime) =>
                    setHoraInicio(formattedTime)
                  }
                /> */}
                {/* <Controller
                    name="hora_inicio"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <Button
                          style={{
                            height: 44,
                            paddingTop: 4,
                            borderRadius: 8,
                            width: "95%",
                          }}
                          tintColor={errors.hora_inicio ? "#ffffff" : "black"}
                          leading={() => (
                            <MaterialCommunityIcons
                              name="clock-time-ten-outline"
                              size={28}
                              color={errors.hora_inicio ? "#ffffff" : "black"}
                            />
                          )}
                          color={errors.hora_inicio ? "red" : "#1371C3"}
                          onPress={() => {
                            setShowTimeHIPicker(true);
                          }}
                          title={titlehi}
                        />
                        {showTimehipicker && (
                          <DateTimePicker
                            testID="hora_inicio"
                            value={horainicio}
                            mode="time"
                            is24Hour={true}
                            display="clock"
                            onChange={(e, selectedTime) =>
                              submitShowTimepicker(e, selectedTime, onChange)
                            }
                          />
                        )}
                        {errors.hora_inicio && (
                          <Text style={{ color: "red", fontSize: 16 }}>
                            {errors.hora_inicio.message}
                          </Text>
                        )}
                      </>
                    )}
                  /> */}
              </View>
            </View>
          </View>
          <View className="w-full pt-3">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className="w-11/12 self-center p-3 rounded-lg bg-lime-600"
            >
              <Text className="text-white text-center font-bold text-xl">
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
