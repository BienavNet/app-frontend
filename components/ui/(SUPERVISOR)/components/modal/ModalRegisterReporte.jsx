import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MultilineTextInput } from "../../../../share/inputs/customMultipleTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterReportSchema } from "../../../../../src/utils/schemas/reportSchema";
import { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import {
  capitalizeFirstLetter,
  formatTimeTo12Hour,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { useFocusEffect } from "expo-router";
import { registerReporte } from "../../../../../src/services/fetchData/fetchReporte";
import useToastMessage from "../../../../share/ToasNotification";
import { CustomFlatList } from "../../../../share/inputs/customFlatList";
import { status } from "./status";

const TabBarStyle = {
  display: "flex",
  position: "absolute",
  bottom: 10,
  left: 15,
  right: 15,
  borderRadius: 12,
  height: 60,
  backgroundColor: ColorItem.MediumGreen,
};
export const ModalRegisterReporte = () => {
  const estado = status.map((item) => ({
    id: item,
    label: item,
  }));
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
  const CLASE_ID = data.id;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterReportSchema),
  });

  const onSubmitRegisterReport = async (data) => {
    const { comentario, estado } = data;
    try {
      await registerReporte(CLASE_ID, comentario, estado);
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
            <View style={style.container}>
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
                    {truncateText(data.nombre_salon, 15)}
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
            <View style={style.container}>
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
                  {formatTimeTo12Hour(data.hora_inicio)}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: ColorItem.DeepFir,
                  }}
                >
                  {formatTimeTo12Hour(data.hora_fin)}
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

        <View style={{
        paddingHorizontal:10,
        paddingVertical:8
        }}>
          <CustomFlatList
            name="estado"
            control={control}
            data={estado}
            placeholder={data.estado !== "pendiente" ? capitalizeFirstLetter(data.estado) :`Seleccione estado (por default ${data.estado})`}
            errors={errors.estado}
          />
        </View>

        <View
          className="flex-row justify-center items-center"
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <MultilineTextInput
            errors={data.comentario?.length > 0 ? undefined : errors.comentario}
            maxLength={10}
            numberOfLines={12}
            name="comentario"
            editable={data.comentario?.length > 0 ? false : true}
            variant="outlined"
            control={control}
            placeholder={
              data.comentario?.length > 0
                ? data.comentario
                : "Escribir reporte..."
            }
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
              onPress={
                data.comentario && data.comentario?.length > 0
                  ? null
                  : handleSubmit(onSubmitRegisterReport)
              }
              style={{
                backgroundColor:
                  data.comentario && data.comentario.length > 0
                    ? ColorItem.TarnishedSilver
                    : ColorItem.DeepSkyBlue,
                width: "92%",
                alignSelf: "center",
                padding: 12,
                borderRadius: 8,
              }}
              disabled={data.comentario && data.cometanrio?.length > 0}
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

const style = StyleSheet.create({
  container: {
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
  },
});
