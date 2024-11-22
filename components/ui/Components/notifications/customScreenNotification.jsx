import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { updateNotificationId } from "../../../../src/services/fetchData/fetchNotification";
import { useNavigation } from "@react-navigation/native";
import { DateChip } from "../../(DIRECTOR)/reportes/components/DateChip";
import { ColorItem } from "../../../styles/StylesGlobal";
import { useNotificationCedulaEstado } from "../../../../src/hooks/customHooks";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { EmptyNotification } from "../unregistered/noRegistration";
import { useEffect } from "react";
import { useSocket } from "../../../../src/hooks/use/useSocket";

const handleEditNotification = async (id, fetchNotificationsAll) => {
  const LEIDA = "leida";
  try {
    await updateNotificationId(id, LEIDA);
    await fetchNotificationsAll();
  } catch (error) {
    throw Error(error);
  }
};

export const ContentNofitications = ({ cedula, estado = "todas" }) => {
  const { isNotification } = useSocket();
  const navigation = useNavigation();
  const { notificationCedulaEstado, fetchNotificationsAll } =
    useNotificationCedulaEstado(cedula, estado);
  useEffect(() => {
    if (isNotification) {
      fetchNotificationsAll();
    }
  }, [isNotification]);
  const handleUpdateStatus = (item) => {
    const NOLEIDA = "no leida";
    if (item.estado === NOLEIDA) {
      handleEditNotification(item.id, fetchNotificationsAll);
    }
  };

  const handlePressNotification = (item) => {
    handleUpdateStatus(item);
    navigation.navigate("NotificationView", { notification: item });
  };

  if (notificationCedulaEstado.length === 0) {
    return <EmptyNotification />;
  }
  return (
    <ScrollView>
      <>
        {notificationCedulaEstado.map((item, index) => (
          <TouchableOpacity
            onPress={() => handlePressNotification(item)}
            key={index}
            style={{
              borderBottomWidth: 1,
              borderColor: ColorItem.TarnishedSilver,
              padding: 8,
              backgroundColor: item.estado === "leida" ? "#fff" : "#ecf3ff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Avatar
                size="medium"
                rounded
                title="notification"
                source={require("../../../../assets/png/teacher.png")}
              />
              <View
                style={{
                  width: "85%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: ColorItem.DeepFir,
                    }}
                  >
                    {capitalizeFirstLetter(item.nombre_de)}{" "}
                    {capitalizeFirstLetter(item.apellido_de)}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingLeft: 5,
                    }}
                  >
                    {truncateText(item.mensaje, 50)}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "40%",
                      }}
                    >
                      <DateChip
                        item={new Date(item.fecha).toLocaleDateString()}
                      />
                    </View>
                    <View
                      style={{
                        width: "50%",
                        padding: 5,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Ionicons
                        name="checkmark-done"
                        size={24}
                        color={item.estado === "leida" ? "#009ae5" : "#65686c"}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
    </ScrollView>
  );
};
