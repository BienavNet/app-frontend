import { View, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { detailHorarioRegister } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomTimePicker } from "../../../../share/inputs/customDateTimePicker";
import { diasArray } from "../../../../../src/utils/schemas/horarioSchema";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { CustomPiker } from "../../../../share/inputs/customPicker";
import { Snackbar } from "@react-native-material/core";
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
export const FormRegisterDetailHorario = ({
  navigation,
  idhorario,
  editing,
  handleCloseModal,
}) => {
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

  const getSupervisors = useCallback(async () => {
    try {
      const res = await getSupervisor();
      console.log("response the supervisors", res);
      setSupervisors(res);
    } catch (error) {
      console.error("Error fetching supervisors:", error.message);
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
      console.error("No supervisors available.");
      return {};
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
        await getSupervisors();
      } catch (error) {
        throw new Error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchSalones, getSupervisors]);

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
    try {
      if (!editing) {
        let horario = idhorario;
        await registerDetailHorario(horario, dia, hora_inicio, hora_fin);

        const startDate = new Date(); // Fecha de inicio
        const endDate = new Date(startDate); // Fecha de final
        endDate.setMonth(endDate.getMonth() + 6);
        const classCounts = await countClassesForSupervisors();

        if (!classCounts) throw new Error("Error counting classes");
        const ESTADO = "pendiente";
        const classesToRegister = await Promise.all(
          generateClassDates(dia, startDate, endDate).map(async (clase) => {
            const supervisorID = await assignSupervisors();
            if (!supervisorID) {
              throw new Error("No se pudo asignar un supervisor");
            }
            return {
              horario: idhorario,
              salon,
              supervisor: supervisorID,
              estado: ESTADO,
              ...clase,
            };
          })
        );
        setLoading(true);
        try {
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
          setLoading(true);
          reset();
          handleCloseModal();
          Alert.alert("Registrado exitosamente ✔️✔️");
          navigation.navigate("ListScreen");
        } catch (error) {
          Alert.alert("Error..... ❌❌");
          reset();
          throw new Error("Error: " + error.message);
        }
      } else {
        await updateDetailHorario(route.params.id, data);
        console.log("update successfully");
      }
    } catch (error) {
      reset();
      throw new Error("Error: " + error.message);
    } finally {
      setLoading(false); // Finaliza el estado de carga
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
