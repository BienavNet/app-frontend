import { View,  ScrollView, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getHorarioOne,
  registerHorario,
  updateHorario,
} from "../../../../src/services/fetchData/fetchHorarios";
import { getDocenteAll } from "../../../../src/services/fetchData/fetchDocente";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { horarioRegisterSchema } from "../../../../src/utils/schemas/horarioSchema";
import asignaturajson from "./json/asignaturas.json";
import { ModalComponente } from "../../Components/customModal";
import { RegisterDetailHorario } from "../detalleHorario/register";
import { CustomFlatList } from "../../../share/inputs/customFlatList";
import { getSupervisorOne } from "../../../../src/services/fetchData/fetchSupervisor";
import Loading from "../../../share/loading";
import { HeaderTitle } from "../../../share/titulos/headerTitle";
import { SubmitButton } from "../../../share/button/submitButton";

export const RegisterHorario = ({ navigation, route }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(horarioRegisterSchema),
  });

  const [docente, setDocente] = useState([]);
  const [horarioId, setHorarioId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const SubmithandleCloseModal = () => {
    setShowModal(false);
    setHorarioId(null);
  };

  const fetchDocentes = useCallback(async () => {
    const res = await getDocenteAll();
    const mapDoc = res.map((index) => ({
      id: index.docente_id.toString(),
      label: `${index.nombre} ${index.apellido}`,
    }));
    setDocente(mapDoc);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDocentes();
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

  const onsubmit = async (data) => {
    const { docente, asignatura } = data;
    setLoading(true);
    try {
      if (!editing) {
        const result = await registerHorario(docente, asignatura);
        const { id } = result.data;
        setHorarioId(id);
        Alert.alert("Registrado exitosamente ✔️✔️");
        reset();
        setShowModal(true);
      } else {
        await updateHorario(route.params.id, data);
        Alert.alert("Actualizado exitosamente ✔️✔️");
        reset();
      }
    } catch (error) {
      reset();
      Alert.alert("Error... ❌❌");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderTitle
        editing={editing}
        updateText="Actualizar Horario"
        registerText="Registrar Horario"
      />
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 h-full">
          {!editing ? (
            <View>
              <View className="w-[85%] self-center py-5">
                <CustomFlatList
                  verticalOffset={170}
                  name="docente"
                  control={control}
                  errors={errors.docente}
                  data={docente}
                  placeholder="Seleccione un docente"
                />
              </View>
              <View className="w-[85%] self-center pt-5 pb-8">
                <CustomFlatList
                  verticalOffset={260}
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
          <SubmitButton onPress={handleSubmit(onsubmit)} editing={editing} />

          {loading && <Loading />}
        </View>
      </ScrollView>
      <ModalComponente
        modalStyle={{ height: "80%" }}
        animationType="slider"
        modalVisible={showModal}
        transparent={false}
        handleCloseModal={SubmithandleCloseModal}
        canCloseModal={false}
      >
        <RegisterDetailHorario
          handleCloseModal={SubmithandleCloseModal}
          idhorario={horarioId}
          editing={editing}
          navigation={navigation}
        />
      </ModalComponente>
    </>
  );
};
