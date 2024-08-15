import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import {
  getHorarioOne,
  registerHorario,
  updateHorario,
} from "../../../../src/services/fetchData/fetchHorarios";
import { getDocenteAll } from "../../../../src/services/fetchData/fetchDocente";
import { useToast } from "react-native-toast-notifications";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { horarioRegisterSchema } from "../../../../src/utils/schemas/horarioSchema";
import asignaturajson from "./json/asignaturas.json";
import { ModalComponente } from "../../Components/customModal";
import { RegisterDetailHorario } from "../detalleHorario/register";
import { CustomFlatList } from "../../../share/inputs/customFlatList";
import { getSupervisorOne } from "../../../../src/services/fetchData/fetchSupervisor";
import Loading from "../../../share/loading";

export const RegisterHorario = ({ navigation, route }) => {
  const toast = useToast();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horarioRegisterSchema),
  });
  const [canCloseModal, setCanCloseModal] = useState(false);
  //docente  setSupervisores
  const [docente, setDocente] = useState([]);
  const [loading, setLoading] = useState(false);
  //opcion editar
  const [editing, setEditing] = useState(false);
  //campo modal
  const [showModal, setShowModal] = useState(false);
  const [horarioId, setHorarioId] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setHorarioId(null);
    setCanCloseModal(false);
  };
  const fetchDocentes = useCallback(async () => {
    const res = await getDocenteAll();
    const mapDoc = res.map((index) => ({
      id: index.docente_id.toString(),
      label: `${index.nombre} ${index.apellido}`,
    }));
    console.log("mapDoc: " + JSON.stringify(mapDoc));
    setDocente(mapDoc);
  }, []);

  // const fetchAsignatura = useCallback(async () => {
  //   const res =
  //   setAsignaturas(res);
  // }, []);

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

  useFocusEffect(
    useCallback(() => {
      fetchDocentes();
      // fetchAsignatura();
    }, [fetchDocentes])
  );
  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizar horario" });
      (async () => {
        const response = await getSupervisorOne(route.params.id);
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
    const { docente, asignatura } = data;
    setLoading(true);
    try {
      if (!editing) {
        const result = await registerHorario(docente, asignatura);
        const { id } = result.data;
        setHorarioId(id);
        setShowModal(true);
        reset();
      } else {
        await updateHorario(route.params.id, data);
        Alert.alert("update successfull");
      }
      // navigation.navigate("ListScreen");
    } catch (error) {
      Alert.alert("error", error.message);
      console.log(error.message);
    } finally {
      setLoading(false); // Ocultar el ícono de carga
    }
  };

  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        <Text className="text-lg text-center font-bold">
          {editing ? "Actualizar Horario" : "Registrar Horario"}
        </Text>
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 h-full">
          {!editing ? (
            <View>
              <View className="w-[85%] self-center py-5">
                <CustomFlatList
                  name="docente"
                  control={control}
                  errors={errors.docente}
                  data={docente}
                  placeholder="Seleccione un docente"
                />
              </View>
              <View className="w-[85%] self-center py-5">
                <CustomFlatList
                  name="asignatura"
                  placeholder="Seleccione una asignatura"
                  control={control}
                  errors={errors.asignatura}
                  data={asignaturajson.map((a) => ({
                    id: a.asignatura,
                    label: a.asignatura,
                  }))}
                />
              </View>
            </View>
          ) : (
            <></>
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
          {loading && <Loading />}
        </View>
      </ScrollView>
      <View>

        <ModalComponente
          modalStyle={{ height: "80%" }}
          animationType="slider"
          modalVisible={showModal}
          transparent={false}
          handleCloseModal={handleCloseModal}
          canCloseModal={canCloseModal}
        >
          <RegisterDetailHorario
             handleCloseModal={() => {
              setCanCloseModal(true); // Allow modal to close automatically
              handleCloseModal(); // Close the modal
            }}
            idhorario={horarioId}
            editing={editing}
            navigation={navigation}
          />
        </ModalComponente>
      </View>
    </>
  );
};
