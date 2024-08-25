import { View, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { detailHorarioRegister } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomTimePicker } from "../../../../share/inputs/customDateTimePicker";
import { diasArray } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { CustomPiker } from "../../../../share/inputs/customPicker";

import {
  registerDetailHorario,
  updateDetailHorario,
} from "../../../../../src/services/fetchData/fetchDetailHorario";
import {
  registerClase,
  getClasesAll,
} from "../../../../../src/services/fetchData/fetchClases";
import { useCallback, useEffect, useState } from "react";
import { getSalon } from "../../../../../src/services/fetchData/fetchSalon";
import { getSupervisor } from "../../../../../src/services/fetchData/fetchSupervisor";
import { generateClassDates } from "../../../../../src/utils/functiones/functions";
import Loading from "../../../../share/loading";
import { SubmitButton } from "../../../../share/button/submitButton";
import useToastMessage from "../../../../share/ToasNotification";
// import {
//   toastError,
//   toastLoadedSuccessfully,
//   toastLoading,
//   toastRedirecting,
//   toastRegisterin,
//   toastSuccess,
//   toastUpdating,
// } from "../../../../share/ToasNotification";
export const FormRegisterDetailHorario = ({
  navigation,
  idhorario,
  editing,
  handleCloseModal,
}) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(detailHorarioRegister),
  });
  const [loading, setLoading] = useState(false);
  // const [selectdia, setSelectdia] = useState([]);
  const [isFirstAssignment, setIsFirstAssignment] = useState(true);
  // horainicio y horafin
  const [horainicio, setHoraInicio] = useState(new Date());
  const [horafin, setHoraFin] = useState(new Date());
  const [salones, setSalones] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  console.log("supervisors state", supervisors);

  const fetchSupervisors = useCallback(async () => {
    try {
      const res = await getSupervisor();
      setSupervisors(res);
    } catch (error) {
      throw new Error("Error fetching supervisors:", error.message);
    }
  }, []);

  const fetchSalones = useCallback(async () => {
    try {
      const res = await getSalon();
      setSalones(res);
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  }, []);

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
    const fetchData = async () => {
      try {
        await fetchSalones();
        await fetchSupervisors();
      } catch (error) {
        throw new Error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchSalones, fetchSupervisors]);

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
      if (!editing) {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REGISTERING],
          type: "success",
          id: APP_STATUS.REGISTERING,
        });
        await registerDetailHorario(horario, dia, hora_inicio, hora_fin);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "success",
          id: APP_STATUS.LOADING,
        });
        const startDate = new Date(); // Fecha de inicio
        const endDate = new Date(startDate); // Fecha de final
        endDate.setMonth(endDate.getMonth() + 6);
        const classCounts = await countClassesForSupervisors();
        if (!classCounts) throw new Error("Error counting classes");
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADING],
          type: "warning",
          id: APP_STATUS.LOADING,
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
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
          type: "success",
          id: APP_STATUS.LOADED_SUCCESSFULLY,
        });
        try {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.REGISTERING],
            type: "success",
            id: APP_STATUS.REGISTERING,
          });
          setLoading(true);
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
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
            type: "success",
            id: APP_STATUS.LOADED_SUCCESSFULLY,
          });
          reset();
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
            type: "warning",
            id: APP_STATUS.REDIRECTING,
          });
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
          message: STATUS_MESSAGES[APP_STATUS.UPDATING],
          type: "success",
          id: APP_STATUS.UPDATING,
        });
        await updateDetailHorario(route.params.id, data);
        reset();
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
      {loading ? (
        <Loading />
      ) : (
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
              placeholder="Seleccione salon"
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
                onTimeSelected={(formattedTime) => setHoraFin(formattedTime)}
              />
            </View>
          </View>

          <SubmitButton onPress={handleSubmit(onsubmit)} />
        </View>
      )}
    </>
  );
};
