import { Text, TouchableOpacity, View } from "react-native";
import { MultilineTextInput } from "../../../../share/inputs/customMultipleTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterReportSchema } from "../../../../../src/utils/schemas/reportSchema";
// import status from "../../../../../components/ui/(DIRECTOR)/horarios/detalleHorario/json/status.json";
// import { CustomPiker } from "../../../../share/inputs/customPicker";
import { useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { useFocusEffect } from "expo-router";
import { registerReporte } from "../../../../../src/services/fetchData/fetchReporte";
import useToastMessage from "../../../../share/ToasNotification";
const TabBarStyle = {
  display: "flex",
  position: "absolute",
  bottom: 10,
  left: 15,
  right: 15,
  elevation: 0,
  borderRadius: 12,
  height: 60,
  backgroundColor: ColorItem.MediumGreen,
};
export const ModalRegisterReporte = () => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const parentNavigation = navigation.getParent();
      parentNavigation?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        parentNavigation?.setOptions({ tabBarStyle: TabBarStyle });
      };
    }, [navigation])
  );
  const router = useRoute();
  const { data } = router.params;
  const CLASE_ID = data.id
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterReportSchema),
  });

  const onSubmitRegisterReport = async (data) => {
    console.log("datos a la hora de registrar", data)
    const { comentario } = data;
    console.log("datos a la hora de registrar", data)
    try {
      await registerReporte(CLASE_ID, comentario);
      reset();
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.LOADED_SUCCESSFULLY],
        type: "warning",
        id: APP_STATUS.LOADED_SUCCESSFULLY,
        onClose: () => {
          navigation.navigate("ListSupervisor");
        },
      });
    } catch (error) {
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.ERROR],
        type: "danger",
        id: APP_STATUS.ERROR,
      });
      throw Error("Error al registrar el reporte al docente", error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          height: "70%",
        }}
      >
        <View key={data.id}>
          <View className="justify-center items-center">
            <View
              style={{
                width: "95%",
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: ColorItem.TarnishedSilver,
                marginTop: 8,
                borderRadius: 4,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginRight: 10,
                    color: ColorItem.DeepFir,
                  }}
                >
                  {capitalizeFirstLetter(data.nombre_docente)}{" "}
                  {capitalizeFirstLetter(data.apellido_docente)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: ColorItem.DeepFir,
                  }}
                >
                  {truncateText(data.asignatura, 20)}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "95%",
                backgroundColor: "white",
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: ColorItem.TarnishedSilver,
                marginTop: 5,
                paddingHorizontal: 10,
                borderRadius: 4,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: ColorItem.DeepFir,
                    }}
                  >
                    {capitalizeFirstLetter(truncateText(data.nombre_salon, 15))}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: ColorItem.DeepFir,
                    }}
                  >
                    {data.numero_salon}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: ColorItem.DeepFir,
                  }}
                >
                  {capitalizeFirstLetter(data.categoria)}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "95%",
                backgroundColor: "white",
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: ColorItem.TarnishedSilver,
                paddingHorizontal: 10,
                marginTop: 5,
                borderRadius: 4,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: 10,
                    color: ColorItem.DeepFir,
                  }}
                >
                  {new Date(
                    `${data.fecha.split("T")[0]}T${data.hora_inicio}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: ColorItem.DeepFir,
                  }}
                >
                  {new Date(
                    `${data.fecha.split("T")[0]}T${data.hora_fin}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: ColorItem.DeepFir,
                  }}
                >
                  {new Date(data.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          className="flex-row justify-center items-center"
          style={{
            paddingVertical:5,
            paddingHorizontal: 10,
          }}
        >
          <MultilineTextInput
            errors={errors.comentario}
            maxLength={10}
            numberOfLines={12}
            name="comentario"
            variant="outlined"
            control={control}
            placeholder="Escribir reporte..."
          />
        </View>
        <View className="flex-row justify-center p-3">
          <View className="w-[40%] pt-2 self-center">
            <TouchableOpacity
              onPress={handleCancel}
              className={"w-11/12 self-center p-3 rounded-lg bg-red-600"}
            >
              <Text className="text-white text-center font-bold text-xl">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-[40%] pt-2 self-center">
            <TouchableOpacity
              onPress={handleSubmit(onSubmitRegisterReport)}
              style={{
                backgroundColor: ColorItem.DeepSkyBlue,
              }}
              className={"w-11/12 self-center p-3 rounded-lg"}
            >
              <Text className="text-white text-center font-bold text-xl">
                Reportar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
