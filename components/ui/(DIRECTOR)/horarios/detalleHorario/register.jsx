import { View, ScrollView, Alert, TouchableOpacity, Text } from "react-native";
import { HeaderTitle } from "../../../../share/titulos/headerTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { detailHorarioRegister } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomTimePicker } from "../../../../share/inputs/customDateTimePicker";
import { diasArray } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { CustomPiker } from "../../../../share/inputs/customPicker";
import status from "./json/status.json";
import {
  getDetailHorarioOne,
  registerDetailHorario,
  updateDetailHorario,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  registerClase,
  getClasesAll,
  updateClase,
  getClassesByHorarioID,
} from "../../../../../src/services/fetchData/fetchClases";
import { useEffect, useState } from "react";
import { generateClassDates } from "../../../../../src/utils/functiones/functions";
import Loading from "../../../../share/loading";
import { SubmitButton } from "../../../../share/button/submitButton";
import useToastMessage from "../../../../share/ToasNotification";
import { useSalonAll, useSupervisorAll } from "../../../../../src/hooks/customHooks";
export const RegisterDetailHorario = ({
  navigation,
  route,
  idhorario,
  editing,
  handleCloseModal,
}) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(detailHorarioRegister),
  });
  const [loading, setLoading] = useState(false);
  const [isFirstAssignment, setIsFirstAssignment] = useState(true);
  const [horainicio, setHoraInicio] = useState(new Date());
  const [horafin, setHoraFin] = useState(new Date());
  const salones = useSalonAll();
  const supervisors = useSupervisorAll();
  const [initialValues, setInitialValues] = useState({});

  const countClassesForSupervisors = async () => {
    if (supervisors.length === 0) {
      throw new Error("No supervisors available.");
    }
    const counts = {};
    supervisors.forEach((s) => {
      counts[s.supervisor_id] = 0;
    });
    try {
      const classes = await getClasesAll();
      if (classes.length === 0) {
        return counts;
      }
      classes.forEach((classItem) => {
        if (counts[classItem.supervisor_id] !== undefined) {
          counts[classItem.supervisor_id] += 1;
        }
      });
      return counts;
    } catch (error) {
      throw new Error("Error fetching classes:", error.message);
    }
  };

  const getRandomSupervisor = (supervisors) => {
    if (supervisors.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * supervisors.length);
    return supervisors[randomIndex].supervisor_id;
  };

  const assignSupervisors = async () => {
    const classCounts = await countClassesForSupervisors();

    if (isFirstAssignment) {
      setIsFirstAssignment(false);
      return getRandomSupervisor(supervisors);
    }

    if (Object.keys(classCounts).length === 0) {
      return getRandomSupervisor(supervisors);
    }

    let minClasses = Infinity;
    let selectedSupervisor = null;

    supervisors.forEach((supervisor) => {
      if (classCounts[supervisor.supervisor_id] < minClasses) {
        minClasses = classCounts[supervisor.supervisor_id];
        selectedSupervisor = supervisor;
      }
    });

    return selectedSupervisor
      ? selectedSupervisor.supervisor_id
      : getRandomSupervisor(supervisors);
  };
  useEffect(() => {
    if (route.params && route.params.id) {
      console.log("id params de detalle horario" + route.params.id);
      console.log("editin type: " + editing);
      if (editing) {
        (async () => {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.LOADING],
            type: "warning",
            id: APP_STATUS.LOADING,
          });
          console.log(
            "id params antes de entrar a getDetailHorarioOne" + route.params.id
          );
          const response = await getDetailHorarioOne(route.params.id);
          console.log(response, "getDetailHorarioOne response");

          const value = response.find((doc) => doc.id === route.params.id);
          console.log(value, "getDetailHorarioOne value");

          const res = await getClassesByHorarioID(route.params.id);
          console.log(res, "getClassesByHorarioID value");
          if (value) {
            setInitialValues({
              // salon: value.salon,
              dia: value.dia,
              hora_inicio: value.hora_inicio,
              hora_fin: value.hora_fin,
            });
            reset({
              // salon: value.salon,
              dia: value.dia,
              hora_inicio: value.hora_inicio,
              hora_fin: value.hora_fin,
            });
          } else {
            throw new Error("detalle del horario no encontrado.");
          }
        })();
      }
    }
  }, [route.params]);
  const isDisabled = editing && !isDirty;

  useEffect(() => {
    if (supervisors.length > 0) {
      const countClasses = async () => {
        try {
          await countClassesForSupervisors();
        } catch (error) {
          throw new Error("Error counting classes:", error);
        }
      };
      countClasses();
    }
  }, [supervisors]);

  const onsubmit = async (data) => {
    const { salon, dia, hora_inicio, hora_fin } = data;
    let horario = idhorario;
    try {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.REGISTERING],
        type: "success",
        id: APP_STATUS.REGISTERING,
      });
      if (!editing) {
        await registerDetailHorario(horario, dia, hora_inicio, hora_fin);
        const startDate = new Date(); // Fecha de inicio
        const endDate = new Date(startDate); // Fecha de final
        endDate.setMonth(endDate.getMonth() + 6);
        const classCounts = await countClassesForSupervisors();
        if (!classCounts) throw new Error("Error counting classes");
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
          type: "warning",
          id: APP_STATUS.LOADED_SUCCESSFULLY,
        });
        const ESTADO = "pendiente";
        const classesToRegister = await Promise.all(
          generateClassDates(dia, startDate, endDate).map(async (clase) => {
            const supervisorID = await assignSupervisors();
            if (!supervisorID)
              throw new Error("No se pudo asignar un supervisor");
            return {
              horario: idhorario,
              salon,
              supervisor: supervisorID,
              estado: ESTADO,
              ...clase,
            };
          })
        );
        try {
          Alert.alert("Successfull", "Registro exitoso ✔︎ ✔︎");

          await Promise.all(
            classesToRegister.map((clase) =>
              registerClase(
                clase.horario,
                clase.salon,
                clase.supervisor,
                clase.estado,
                clase.fecha
              )
            )
          );
          Alert.alert("Redirigiendo....");
          handleCloseModal();
          navigation.navigate("ListScreen");
        } catch (error) {
          reset();
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.ERROR],
            type: "danger",
            id: APP_STATUS.ERROR,
          });
        }
      } else {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "danger",
          id: APP_STATUS.LOADING,
        });
        const updateDetail = updateDetailHorario(route.params.id, {
          dia,
          hora_inicio,
          hora_fin,
        });

        const updateClasses = Promise.all(
          generateClassDates(dia, startDate, endDate)
            .map(async (clase) => {
              return {
                salon,
                estado: "pendiente",
                ...clase,
              };
            })
            .map(async (clase) => {
              await updateClase(
                clase.horario,
                clase.salon,
                clase.supervisor,
                clase.estado,
                clase.fecha
              );
            })
        );

        await Promise.all([updateDetail, updateClasses]);

        reset();
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
          type: "warning",
          id: APP_STATUS.REDIRECTING,
          onClose: () => {
            handleCloseModal();
            navigation.navigate("ListScreen");
          },
        });
      }
    } catch (error) {
      reset();
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <HeaderTitle
        registerText="Registrar Detalle Horario"
        updateText="Actualizar Detalle Horario"
        editing={editing}
      />
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex pb-5 h-full">
          {loading ? (
            <Loading />
          ) : !editing ? (
            <View className="w-full">
              <View className="self-center w-[85%]">
                <CustomPiker
                  name="dia"
                  control={control}
                  placeholder="Seleccione dia"
                  errors={errors.dia}
                  data={diasArray.map((d) => ({
                    id: d,
                    label: d,
                    value: d,
                  }))}
                />
              </View>
              <View className="self-center w-[85%] pb-1 pt-5">
                <CustomFlatList
                  verticalOffset={324}
                  name="salon"
                  errors={errors.salon}
                  control={control}
                  placeholder={`${
                    salones.length === 0
                      ? "Sin registros de salones..."
                      : "Seleccione Salon"
                  }`}
                  data={salones.map((status) => ({
                    id: status.id,
                    label: status.numero_salon,
                    value: status.nombre,
                  }))}
                />
              </View>
              <View className="flex-row justify-items-stretch pt-8 pb-7">
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                    name="hora_inicio"
                    control={control}
                    errors={errors.hora_inicio}
                    title="Hora inicio"
                    testID="hora_inicio"
                    initialValue={horainicio}
                    mode="time"
                    display="clock"
                    is24Hour={true}
                    onTimeSelected={(formattedTime) => {
                      console.log("hora_inicio", formattedTime);
                      setHoraInicio(formattedTime);
                    }}
                  />
                </View>
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                    name="hora_fin"
                    control={control}
                    errors={errors.hora_fin}
                    title="Hora Fin"
                    testID="hora_fin"
                    initialValue={horafin}
                    mode="time"
                    display="clock"
                    is24Hour={true}
                    onTimeSelected={(formattedTime) =>
                      setHoraFin(formattedTime)
                    }
                  />
                </View>
              </View>
            </View>
          ) : (
            <View className="w-full">
              <View className="self-center w-[85%]">
                <CustomPiker
                  name="dia"
                  placeholder="Seleccione"
                  control={control}
                  data={diasArray.map((d) => ({
                    id: d,
                    label: d,
                    value: d,
                  }))}
                />
              </View>
              <View className="self-center w-[85%] pb-1 pt-5">
                <CustomFlatList
                  verticalOffset={324}
                  name="salon"
                  control={control}
                  // placeholder={`${
                  //   salones.length === 0
                  //     ? "Sin registros de salones..."
                  //     : "Seleccione Salon"
                  // }`}
                  data={salones.map((status) => ({
                    id: status.id,
                    label: status.numero_salon,
                    value: status.nombre,
                  }))}
                />
              </View>

              <View className="flex-row justify-items-stretch pt-8 pb-7">
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                    name="hora_inicio"
                    control={control}
                    title="Hora inicio"
                    testID="hora_inicio"
                    // initialValue={horainicio}
                    mode="time"
                    display="clock"
                    is24Hour={true}
                    onTimeSelected={(formattedTime) => {
                      console.log("hora_inicio", formattedTime);
                      setHoraInicio(formattedTime);
                    }}
                  />
                </View>
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                    name="hora_fin"
                    control={control}
                    title="Hora Fin"
                    testID="hora_fin"
                    // initialValue={horafin}
                    mode="time"
                    display="clock"
                    is24Hour={true}
                    onTimeSelected={(formattedTime) =>
                      setHoraFin(formattedTime)
                    }
                  />
                </View>
              </View>
            </View>
          )}
          <View className="flex-row justify-center w-full">
            {editing && (
              <View className="w-[40%] pt-3 self-center">
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "¿Deseas cancelar la actualizacion?",
                      "Dale 'SI' para cancelar la actualizacion",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Sí",
                          onPress: async () => {
                            navigation.navigate("ListScreen");
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  className={"w-11/12 self-center p-3 rounded-lg bg-red-600"}
                >
                  <Text className="text-white text-center font-bold text-xl">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View className={editing ? "w-[40%]" : "w-[85%]"}>
              <SubmitButton
                onPress={handleSubmit(onsubmit)}
                editing={editing}
                isDisabled={isDisabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
