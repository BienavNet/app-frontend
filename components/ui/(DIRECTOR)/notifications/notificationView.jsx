import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { DateChip } from "../reportes/components/DateChip";
import { ColorItem } from "../../../styles/StylesGlobal";
import { MultilineTextInput } from "../../../share/inputs/customMultipleTextInput";
import { TextInput } from "@react-native-material/core";

export const NotificacionView = () => {
  const router = useRoute();
  const { notification } = router.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
      <Text style={{fontWeight: "bold", color:ColorItem.GreenSymphony}}>De</Text> {capitalizeFirstLetter(notification.nombre_de)}{" "}
        {capitalizeFirstLetter(notification.apellido_de)}.
      </Text>
      <View className="mt-3 flex-col"
      
      >
        <TextInput
          style={{
            height:"auto",
            textAlignVertical: "top",
          }}
          autoCorrect={false}
          autoCapitalize="none"
          variant="outlined"
          editable={false}
          placeholder={notification.mensaje}
          placeholderTextColor={ColorItem.TarnishedSilver}
          autoComplete="off"
          multiline
          inputContainerStyle={{
            borderRadius: 8,
            borderColor: ColorItem.DeepFir,
            borderWidth: 0.5,

          }}
        />
        <View
          style={{
            width: "100",
          }}
        >
          <View
            style={{
              marginLeft:8,
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                {new Date(notification.fecha).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginTop: 2,
                  marginLeft: 5,
                  fontSize: 14,
                  color: ColorItem.primary,
                  flexDirection: "row",
                }}
              >
                a las
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  marginLeft: 5,
                  fontSize: 14,
                  color: ColorItem.primary,
                  flexDirection: "row",
                }}
              >
                {new Date(notification.fecha).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
