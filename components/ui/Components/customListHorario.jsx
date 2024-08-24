import { ScrollView, Alert,  StyleSheet } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";

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
import SimpleDatePicker from "./customSimpleDatePicker";
import { ScreenViewMore } from "../(DIRECTOR)/horarios/component/ScreenViewMore";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { NotRegistration } from "../../share/noRegistration";
import { ViewHorario } from "../(DIRECTOR)/horarios/component/viewHorario";
import { DeleteConfirmation } from "../../share/deletePress";
import { SearchView } from "../(DIRECTOR)/horarios/component/searchMore&viewValue";
import { InfoHorario } from "../(DIRECTOR)/horarios/component/infoHorario";

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
  console.log("setSelectedItem ------------", selectedItem);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewmoreModalVisible, setViewMoreModalVisible] = useState(false);
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
  const [value, setValue] = useState(new Date());
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
    DeleteConfirmation({
      nameDelete: modalTitle,
      onPress: async () => {
        try {
          const detailhorarioD = await getDetailHorarioByHorarioID(itemId);
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
    });
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  const handleOpenSecondModal = () => {
    setViewMoreModalVisible(true);
  };

  const handleCloseSecondModal = () => {
    setViewMoreModalVisible(false);
  };
  const handleDateChange = (date) => {
    setValue(date);
  };
  useEffect(() => {
    if (modalVisible) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);
  return (
    <ScrollView refreshControl={refreshControl(refreshing, onRefresh)}>
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <NotRegistration />
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
                  <ViewHorario item={item} />
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        transparent={true}
        modalStyle={{ height: "99%" }}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
      >
        {loading ? (
          <Loading />
        ) : selectedItem ? (
          <>
            <InfoHorario selectedItem={selectedItem} />
            <SearchView
              value={value}
              handleOpenSecondModal={handleOpenSecondModal}
            />
            {/* <View style={[styles.viewmore]}>
              <Text style={styles.subtitle}>{value.toDateString()}</Text>

              <Button
                onPress={handleOpenSecondModal}
                color="#1371C3"
                buttonStyle={{ width: 100 }}
                radius={"sm"}
                type="clear"
              >
                Ver mas
                <MaterialIcons name="expand-more" size={24} color="#1371C3" />
              </Button>
            </View> */}

            <SimpleDatePicker
              onDateChange={handleDateChange}
              selectedDate={selectedItem?.horarios
                .map((horario) => new Date(horario.fecha))
                .filter((horario) => {
                  const currentMonth = new Date().getMonth();
                  return horario.getMonth() === currentMonth;
                })}
              viewSelectDate={selectedItem?.horarios.find(
                (horario) =>
                  new Date(horario.fecha).toDateString() ===
                  value.toDateString()
              )}
            />
          </>
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
      <ModalComponente
        transparent={true}
        modalStyle={{ height: "95%" }}
        animationType={"slider"}
        modalVisible={viewmoreModalVisible}
        handleCloseModal={handleCloseSecondModal}
      >
        <ScreenViewMore />
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
    marginBottom: 6,
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
  // viewmore: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 12,
  //   paddingHorizontal: 20,
  //   paddingVertical: 12,
  // },
  // subtitle: {
  //   paddingVertical: 12,
  //   fontSize: 17,
  //   fontWeight: "600",
  //   color: "#999999",
  // },
});

{
  /* <View>
            <Text style={[styles.Title1]}>Días asignados</Text>
            <Text style={[styles.text]}>{selectedItem.dia}</Text>
          </View> */
}
{
  /* {selectedItem.horarios.map((horario, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={[styles.Title1]}>Día Asignado</Text>
            <Text style={[styles.text]}>{horario.dia}</Text>

            <Text style={[styles.Title1]}>Horas Concedidas</Text>
            <View style={styles.vertical}>
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(horario.hora_inicio)}
              </Text>
              <Divider orientation="vertical" width={5} />
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(horario.hora_fin)}
              </Text>
            </View>

            <Text style={[styles.Title1]}>Categoría</Text>
            <Text style={[styles.text]}>{horario.categoria}</Text>

            <Text style={[styles.Title1]}>Número de Salón</Text>
            <Text style={[styles.text]}>{horario.numero_salon}</Text>
          </View>
        ))} */
}
{
  /* <View>
            <Text style={[styles.Title1]}>Horas concedidas</Text>
            <View style={styles.vertical}>
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(selectedItem.hora_inicio)}
              </Text>
              <Divider orientation="vertical" width={5} />
              <Text style={[styles.text]}>
                {formatHourHHMMAMPM(selectedItem.hora_fin)}
              </Text>
            </View>
          </View> */
}
