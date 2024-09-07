import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ColorItem } from "../../../styles/StylesGlobal";
import Feather from "@expo/vector-icons/Feather";
import { Avatar } from "@rneui/themed";
import { useCallback, useState } from "react";
import {
  getNotificationCedulaEstado,
  updateNotificationId,
} from "../../../../src/services/fetchData/fetchNotification";
import { useFocusEffect } from "expo-router";
import { useAuth } from "../../../../src/hooks/useAuth";
import { DateChip } from "../reportes/components/DateChip";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const handleEditNotification = async (id) => {
  try {
    await updateNotificationId(id, "leida");
  } catch (error) {
    throw Error(error);
  }
};

const ContentNofitications = ({ cedula, estado = "todas" }) => {
  const navigation = useNavigation();
  const [notificationall, setNotificationAll] = useState([]);
  console.log("Content Nofitications", notificationall);

  const fetchNotificationsAll = useCallback(async () => {
    try {
      const res = await getNotificationCedulaEstado(cedula, estado);
      console.log("RESponse de notification cedula x estado", res);
      setNotificationAll(res || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [estado]);

  useFocusEffect(
    useCallback(() => {
      fetchNotificationsAll();
    }, [fetchNotificationsAll])
  );

  const handleUpdateStatus = (item) => {
    const NOLEIDA = "no leida";
    const LEIDA = "leida";
    if (item.estado === NOLEIDA) {
      handleEditNotification(item.id);
      setNotificationAll((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, estado: LEIDA } : n))
      );
    }
  };
  const handlePressNotification = (item) => {
    handleUpdateStatus(item);
    navigation.navigate("NotificationView", { notification: item });
  };
  return (
    <ScrollView>
      <>
        {notificationall.map((item, index) => (
          <TouchableOpacity
            onPress={() => handlePressNotification(item)}
            key={index}
            style={{
              borderLeftWidth: 0.4,
              borderBottomWidth: 1,
              borderColor: ColorItem.DeepFir,
              padding: 10,
              backgroundColor:
                item.estado === "leida"
                  ? "#fff"
                  : ColorItem.Zircon,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{ backgroundColor: "transparent" }}>
                <Avatar
                  size={60}
                  rounded
                  title="notification"
                  source={require("../../../../assets/png/teacher.png")}
                />
              </View>
              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "85%" }}>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: ColorItem.DeepFir,
                    }}
                  >
                    {item.nombre_de} {item.apellido_de}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 10,
                      paddingLeft:5,
                    }}
                  >
                    {item.mensaje}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                      }}
                    >
                      <DateChip
                        item={new Date(item.fecha).toLocaleDateString()}
                      />
                    </View>
                    <View
                      style={{
                        width: "15%",
                        padding: 10,
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                      }}
                    >
                      <Ionicons
                        name="checkmark-done"
                        size={24}
                        color={item.estado === "leida" ? "blue" : "gray"}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "15%",
                    padding: 10,
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                  }}
                >
                  <Feather name="x" size={24} color="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
    </ScrollView>
  );
};

export const FilterNotRead = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications estado="no leida" cedula={CEDULA} />;
};

export const FilterRead = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications estado="leida" cedula={CEDULA} />;
};

export const NotificationAll = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications cedula={CEDULA} />;
};
