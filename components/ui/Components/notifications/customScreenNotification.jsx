import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { updateNotificationId } from "../../../../src/services/fetchData/fetchNotification";
import { useNavigation } from "@react-navigation/native";
import { DateChip } from "../../(DIRECTOR)/reportes/components/DateChip";
import { ColorItem } from "../../../styles/StylesGlobal";
import { useNotificationCedulaEstado } from "../../../../src/hooks/customHooks";

const handleEditNotification = async (id) => {
  const LEIDA = "leida";
  try {
    await updateNotificationId(id, LEIDA);
  } catch (error) {
    throw Error(error);
  }
};

export const ContentNofitications = ({ cedula, estado = "todas" }) => {
  const navigation = useNavigation();
  const notificationall = useNotificationCedulaEstado(cedula, estado);

  const handleUpdateStatus = (item) => {
    const NOLEIDA = "no leida";

    if (item.estado === NOLEIDA) {
      handleEditNotification(item.id);
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
                      paddingLeft: 5,
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
                        color={item.estado === "leida" ? "#009ae5" : "#65686c"}
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
