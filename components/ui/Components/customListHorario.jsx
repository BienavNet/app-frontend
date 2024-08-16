import {
  Text,
  ScrollView,
  Alert,
  View,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { ListItem, Button, Divider } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useState } from "react";
import {
  capitalizeFirstLetter,
  formatHourHHMMAMPM,
  truncateText,
} from "../../../src/utils/functiones/functions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "../../share/loading";
import { getDetailHorarioByHorarioID } from "../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteClasesOne,
  getClassesByHorarioID,
} from "../../../src/services/fetchData/fetchClases";
export const ListItemComponentHorario = ({
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDataAll();
      setItems(res);
    } catch (error) {
      throw new Error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [getDataAll]);

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [fetchItems])
  );

  const handleInfoPress = async (id) => {
    console.log("id", id);
    try {
      setModalVisible(true);
      const res = await getDataOne(id);
      console.log(res, "response res de handleInfoPress");
      const itemselected = res.find((value) => value.id === id);
      console.log(itemselected, "item selected");
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        setSelectedItem(null);
        setModalVisible(false);
        throw new Error("Horario no encontrado");
      }
    } catch (error) {
      setModalVisible(false);
      throw new Error("Error fetching item:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleDeletePress = (itemId) => {
    Alert.alert(
      `Eliminar ${modalTitle}`,
      `¿Estás seguro de que deseas eliminar este ${modalTitle.toLowerCase()}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const detailhorarioD = await getDetailHorarioByHorarioID(itemId);
              console.log("detailhorarioD -> ", detailhorarioD);
              for (const detail_horario of detailhorarioD) {
                await deleteDataAsociated(detail_horario.id);
              }

              const claseD = await getClassesByHorarioID(itemId);
              for (const clases of claseD) {
                await DeleteClasesOne(clases.id);
              }
              await deleteData(itemId);
              setItems(items.filter((item) => item.id !== itemId));
              Alert.alert(`${modalTitle} eliminado con éxito`);
            } catch (error) {
              Alert.alert(`Error al eliminar el ${modalTitle.toLowerCase()}`);
            }
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#78e08f"]}
          onRefresh={onRefresh}
          progressBackgroundColor="#1371C3"
        />
      }
    >
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Ningún registro
        </Text>
      ) : (
        items.map((item, index) => (
          <ListItem.Swipeable
            key={`${item.id}-${index}`}
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={async () => {
                  reset();
                  await handleInfoPress(item.id);
                }}
                icon={{ name: "info", color: "white" }}
                buttonStyle={{ minHeight: "100%" }}
              />
            )}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => {
                  reset();
                  handleDeletePress(item.id);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <ListItem.Content>
              <ListItem.Title>
                <TouchableOpacity
                  className="flex-row"
                  onPress={() =>
                    navigateToFormScreen
                      ? navigateToFormScreen(navigation, item.id)
                      : navigation.navigate("FormScreen", {
                          id: item.id,
                        })
                  }
                >
                  <Text className="font-extrabold text-lg">
                    {capitalizeFirstLetter(item.nombre)}{" "}
                    {capitalizeFirstLetter(item.apellido)}
                    {" - "}
                  </Text>
                  <Text className="font-extrabold text-lg">
                    {item.asignatura
                      ? truncateText(item.asignatura)
                      : "Asignatura no disponible"}
                  </Text>
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        transparent={true}
        modalStyle={{ height: "90%" }}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedItem ? (
          <View className="h-full shadow-2xl bg-slate-100 rounded-2xl p-4">
            <View>
              <View>
                <Text style={[styles.Title1]}>Asignatura Asignada</Text>
                <Text style={[styles.asignatura]}>
                  {capitalizeFirstLetter(selectedItem.asignatura)}
                </Text>
              </View>
              <View>
                <Text style={[styles.Title1]}>Docente</Text>
                <Text style={[styles.text]}>
                  {capitalizeFirstLetter(selectedItem.nombre)}{" "}
                  {capitalizeFirstLetter(selectedItem.apellido)}
                </Text>
              </View>
              <View>
                <Text style={[styles.Title1]}>Días asignados</Text>
                <Text style={[styles.text]}>{selectedItem.dia}</Text>
              </View>
              <View>
                <Text style={[styles.Title1]}>Horas concedidas</Text>
                <View style={styles.vertical}>
                  <Text style={[styles.text]}>
                    {formatHourHHMMAMPM(selectedItem.hora_inicio)}
                  </Text>
                  <Divider subHeader="jpra" orientation="vertical" width={5} />
                  <Text style={[styles.text]}>
                    {formatHourHHMMAMPM(selectedItem.hora_fin)}
                  </Text>
                </View>
              </View>
            </View>
            <Divider />
          </View>
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </ModalComponente>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Title1: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#1371C3",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 5,
  },
  asignatura: {
    fontSize: 16,
    fontWeight: "medium",
    padding: 5,
    marginBottom: 5,
  },
});
