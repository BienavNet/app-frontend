import { View, ScrollView, Alert, TouchableOpacity, Text } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getHorarioOne,
  registerHorario,
  updateHorario,
} from "../../../../src/services/fetchData/fetchHorarios";
import {
  getDocenteAll,
} from "../../../../src/services/fetchData/fetchDocente";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  horarioSchema,
  horarioEditSchema,
} from "../../../../src/utils/schemas/horarioSchema";
import asignaturajson from "./json/asignaturas.json";
import { ModalComponente } from "../../Components/customModal";
import { RegisterDetailHorario } from "./detalleHorario/register";
import { CustomFlatList } from "../../../share/inputs/customFlatList";
import Loading from "../../../share/loading";
import { HeaderTitle } from "../../../share/titulos/headerTitle";
import { SubmitButton } from "../../../share/button/submitButton";
import useToastMessage from "../../../share/ToasNotification";
export const RegisterHorario = ({ navigation, route }) => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const [docente, setDocente] = useState([]);
  const [horarioId, setHorarioId] = useState(null);
  // const [selectedDocenteId, setSelectedDocenteId] = useState(null);
  console.log("id del horario registrado", horarioId);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  // const [placelholdereditdocente, setPlacelHoldereditDocente] = useState("");
  // const [placelholdereditasigantura, setPlacelHoldereditAsignatura] =
  useState("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(editing ? horarioEditSchema : horarioSchema),
  });
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
      console.log(`${route.params.id} - fetching route.params.id`);
      setEditing(true);
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.LOADING],
        type: "warning",
        id: APP_STATUS.LOADING,
      });
      navigation.setOptions({ headerTitle: "Actualizar horario" });
      (async () => {
        const response = await getHorarioOne(route.params.id);
        console.log(response, "getHorarioOne response");
        const value = response.find((doc) => doc.id === route.params.id);
        console.log(value, "getHorarioOne response");
        if (value) {
          setInitialValues({
            docente: value.docente_id,
            asignatura: value.asignatura,
          });
          reset({
            docente: value.docente_id,
            asignatura: value.asignatura,
          });
        } else {
          showToast({
            message: STATUS_MESSAGES[APP_STATUS.ERROR],
            type: "danger",
            id: APP_STATUS.ERROR,
          });
        }
      })();
    }
  }, [route.params]);

  const onsubmit = async (data) => {
    console.log("data updated", data);
    const { docente, asignatura } = data;
    setLoading(true);
    try {
      if (!editing) {
        const result = await registerHorario(docente, asignatura);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.SUCCESS],
          type: "success",
          id: APP_STATUS.SUCCESS,
        });
        const { id } = result.data;
        setHorarioId(id);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.REDIRECTING],
          type: "warning",
          id: APP_STATUS.REDIRECTING,
          onClose: () => {
            reset();
            setShowModal(true);
          },
        });
      } else {
        console.log("entro para ser editado");
        await updateHorario(route.params.id, data);
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.UPDATING],
          type: "success",
          id: APP_STATUS.UPDATING,
          onClose: () => {
            Alert.alert(
              "¿Deseas actualizar detalles del horario?",
              "Dale 'SI' para actualizar detalles del horario",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                  onPress: () => navigation.navigate("ListScreen"),
                },
                { text: "Sí", onPress: () => setShowModal(true) },
              ],
              { cancelable: false }
            );
            reset();
          },
        });
      }
    } catch (error) {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
      reset();
    }
  };

  const isDisabled = editing && !isDirty;

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
            <View key="registerin">
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
            <View key="updaitng">
              <View className="w-[85%] self-center py-5">
                <CustomFlatList
                  verticalOffset={170}
                  name="docente"
                  control={control}
                  data={docente}
                />
              </View>
              <View className="w-[85%] self-center pt-5 pb-8">
                <CustomFlatList
                  verticalOffset={260}
                  name="asignatura"
                  control={control}
                  data={asignaturajson.map((a) => ({
                    id: a.asignatura,
                    label: a.asignatura,
                  }))}
                />
              </View>
            </View>
          )}

          <View className="flex-row justify-center w-full">
            <View className={editing ? "w-[40%]" : "w-[85%]"}>
              <SubmitButton
                onPress={handleSubmit(onsubmit)}
                editing={editing}
                isDisabled={isDisabled}
              />
            </View>
            {editing && (
              <View className="w-[40%] pt-3 self-center">
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "¿Deseas editar los detalles de este horario?",
                      "Dale 'SI' para ir a mas detalle del horario",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Sí",
                          onPress: async () => {
                            setShowModal(true);
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  className={"w-11/12 self-center p-3 rounded-lg bg-blue-600"}
                >
                  <Text className="text-white text-center font-bold text-xl">
                    Ir a detalle
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
          route={route}
          handleCloseModal={SubmithandleCloseModal}
          idhorario={horarioId}
          editing={editing}
          navigation={navigation}
        />
      </ModalComponente>
    </>
  );
};
