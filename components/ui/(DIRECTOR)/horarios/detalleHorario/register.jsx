import { View, ScrollView, Alert, TouchableOpacity, Text } from "react-native";
import { HeaderTitle } from "../../../../share/titulos/headerTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { detailHorarioRegister, EditingdetailHorarioRegister } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomTimePicker } from "../../../../share/inputs/customDateTimePicker";
import { diasArray } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { CustomPiker } from "../../../../share/inputs/customPicker";
import {
  getDetailHorarioOne,
  registerDetailHorario,
  updateDetailHorario,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  registerClase,
  getClasesAll,
  updateClase,
} from "../../../../../src/services/fetchData/fetchClases";
import { useEffect, useState } from "react";
import { generateClassDates } from "../../../../../src/utils/functiones/functions";
import Loading from "../../../../share/loading";
import { SubmitButton } from "../../../../share/button/submitButton";
import useToastMessage from "../../../../share/ToasNotification";
import {
  useSalonAll,
  useSupervisorAll,
} from "../../../../../src/hooks/customHooks";
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
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(editing ? EditingdetailHorarioRegister :detailHorarioRegister ),
  });
  const supervisors = useSupervisorAll();
  const [loading, setLoading] = useState(false);
  const [isFirstAssignment, setIsFirstAssignment] = useState(true);
  const [horainicio, setHoraInicio] = useState(new Date());
  const [horafin, setHoraFin] = useState(new Date());
  const mapSalones = useSalonAll();

  const salones = mapSalones.map((item) => ({
    id: item.id.toString(),
    label: `${item.numero_salon} ${item.nombre} `,
  }));

  const dias = diasArray.map((d) => ({
    id: d,
    label: d,
  }));

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
      if (editing) {
        (async () => {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.LOADING],
            type: "warning",
            id: APP_STATUS.LOADING,
          });
          const response = await getDetailHorarioOne(route.params.id);
          const value = response.find((doc) => doc.horario === route.params.id);

          if (value) {
            reset({
              salon: value.salon,
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
    console.log(data , "data al presionar onsubmit");
    const { salon, dia, hora_inicio, hora_fin } = data;
    const ESTADO = "pendiente";
    const TOTAL_MESES = 6;
    const startDate = new Date(); // Fecha de inicio
    const endDate = new Date(startDate); // Fecha de final
    try {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.REGISTERING],
        type: "success",
        id: APP_STATUS.REGISTERING,
      });
      if (!editing) {
        let horario = idhorario;
        await registerDetailHorario(horario, dia, hora_inicio, hora_fin);
        endDate.setMonth(endDate.getMonth() + TOTAL_MESES);
        const classCounts = await countClassesForSupervisors();
        if (!classCounts) throw new Error("Error counting classes");
        
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
          type: "warning",
          id: APP_STATUS.LOADED_SUCCESSFULLY,
        });

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
      } 
      else {
        console.log("entrando a editing...");
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "danger",
          id: APP_STATUS.LOADING,
        });
        console.log("id del cambiante", route.params.id);
        console.log("Loading... dia, hora_inicio", dia, hora_inicio, hora_fin);
        const updateDetail = updateDetailHorario(route.params.id, {
          dia:dia,
          hora_inicio:hora_inicio,
          hora_fin:hora_fin,
        });

        const updateClasses = Promise.all(
          generateClassDates(dia, startDate, endDate)
            .map(async (clase) => {
              return {
                salon,
                // estado: ESTADO,
                ...clase,
              };
            })
            .map(async (clase) => {
              await updateClase(
                clase.salon,
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

  console.log(onsubmit, "onSubmit");
  console.log(handleSubmit, "handleSubmit");
  return (
    <>
      <HeaderTitle
        registerText="Registrar detalles del horario"
        updateText="Actualizar detalles del horario"
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
                  data={dias}
                />
              </View>
              <View className="self-center w-[85%] pb-1 pt-5">
                <CustomFlatList
                  name="salon"
                  errors={errors.salon}
                  control={control}
                  placeholder={`${
                    salones.length === 0
                      ? "Sin registros de salones..."
                      : "Seleccione Salon"
                  }`}
                  data={salones}
                />
              </View>
              <View className="flex-row" style={{
                marginHorizontal:10,
                marginVertical:25,
              }}>
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                    name="hora_inicio"
                    control={control}
                    errors={errors.hora_inicio}
                    title="Hora ini..."
                    initialValue={horainicio}
                    testID="hora_inicio"
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
                  errors={errors.dia}
                  placeholder="seleccione dia"
                  control={control}
                  data={dias}
                />
              </View>
              <View className="self-center w-[85%] pb-1 pt-5">
                <CustomFlatList
                  name="salon"
                  errors={errors.salon}
                  placeholder="seleccione salon"
                  control={control}
                  data={salones}
                />
              </View>

              <View className="flex-row" style={{
                marginHorizontal:10,
                marginVertical:25,
              }}>
                <View className="w-1/2 items-center">
                  <CustomTimePicker
                  errors={errors.hora_inicio}
                    name="hora_inicio"
                    editing={editing}
                    control={control}
                     title="Hora ini..."
                    testID="hora_inicio"
                    mode="time"
                    initialValue={watch("hora_inicio")}
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
                    editing={editing}
                    control={control}
                    title="Hora Fin"
                    errors={errors.hora_fin}
                    testID="hora_fin"
                    initialValue={watch("hora_fin")}
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
          <View className="flex-row-reverse w-full justify-center">
          
            <View className={editing ? "w-[40%]" : "w-[85%]"}>
              <SubmitButton
               onPress={() => {
                console.log("Botón presionado");
                handleSubmit(onsubmit)();
                console.log("Botón presionado2");
              }}
                editing={editing}
                isDisabled={isDisabled}
              />
            </View>
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
          </View>
        </View>
      </ScrollView>
    </>
  );
};
