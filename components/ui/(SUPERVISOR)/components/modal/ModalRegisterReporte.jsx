import { Text, TouchableOpacity, View } from "react-native";
import { MultilineTextInput } from "../../../../share/inputs/customMultipleTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterReportSchema } from "../../../../../src/utils/schemas/reportSchema";
import status from "../../../../../components/ui/(DIRECTOR)/horarios/detalleHorario/json/status.json";
import { CustomPiker } from "../../../../share/inputs/customPicker";
import { useRoute } from "@react-navigation/native";
import { usePathname } from "expo-router";

export const ModalRegisterReporte = () => {
  const route = useRoute();
  const pathname = usePathname()
  console.log("pathname registar report", pathname);
  console.log("route", route)
  // const { data } = route.params;
  // console.log("datos que ingresan desde onPress", data)
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(RegisterReportSchema),
  });

  const handleRegisterReport = () => {};

  return (
    <View className="justify-center items-center">

      <View className="flex-row justify-center items-center mt-3">
        <View className="w-[80%]">
          <MultilineTextInput
            maxLength={10}
            numberOfLines={12}
            name="comentario"
            variant="outlined"
            control={control}
            placeholder="Seleccione"
          />
        </View>
      </View>

      <View className="flex-row justify-center mt-3 p-2">
        <View className="w-[40%] pt-3 self-center">
          <TouchableOpacity
            className={"w-11/12 self-center p-3 rounded-lg bg-red-600"}
          >
            <Text className="text-white text-center font-bold text-xl">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[40%] pt-3 self-center">
          <TouchableOpacity
            className={"w-11/12 self-center p-3 rounded-lg bg-textPrincipal"}
          >
            <Text className="text-white text-center font-bold text-xl">
              Reportar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// {data.map((item, index) => {
//   <View key={item.id}>
//     <View className="flex-row justify-center items-center">
//       <View
//         style={{
//           flexDirection: "row",
//         }}
//       >
//         <View>
//           <Text>{item.numero_salon}</Text>
//         </View>

//         <View>
//           <Text>{item.asignatura}</Text>
//         </View>
//       </View>
//     </View>
//     <View className="flex-row justify-center items-center mt-3">
//       {/* <Text>Estado</Text> */}
//       <View className="w-[80%]">
//         <CustomPiker
//           name="estado"
//           variant="outlined"
//           control={control}
//           data={status.map((i, v) => ({
//             id: i.id,
//             label: i.estado,
//             value: i.estado,
//           }))}
//           placeholder={item.estado}
//         />
//       </View>
//     </View>
//   </View>;
// })}
