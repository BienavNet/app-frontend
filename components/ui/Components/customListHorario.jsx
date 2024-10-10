import { ScrollView, Alert } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "../../share/loading";
import { getDetailHorarioByHorarioID } from "../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteClasesOne,
  getClassesByHorarioID,
} from "../../../src/services/fetchData/fetchClases";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { ViewHorario } from "../(DIRECTOR)/horarios/component/viewHorario";
import { ScreenDetailHour } from "../(DIRECTOR)/horarios/screenDetailhorario";
import moment, { Today } from "../../../src/utils/InstanceMoment";
import { NotRegistration } from "./unregistered/noRegistration";
import { ColorItem } from "../../styles/StylesGlobal";

export const ListItemComponentHorario = ({
  filteredData,
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  modalTitle = "Info",
}) => {
  console.log("fiterredData >>>>>>>>>><XXXXX", filteredData);
  const [modalVisible, setModalVisible] = useState(false); // primer modal
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  console.log(
    items,
    ">>>>>>>>><<<<<<<<WWWW items por default de la list horario"
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const today = Today();
  const [value, setValue] = useState(today);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      if (filteredData.length > 0) {
        setItems(filteredData);
      }
      else{
        const res = await getDataAll();
      setItems(res);
      }
    } catch (error) {
      throw new Error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [getDataAll, filteredData]);

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
      const itemselected = res.find((value) => value.id === id);
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
              console.log("detailhorarioD", detailhorarioD);
              await Promise.all(
                detailhorarioD.map(async (detail_horario) => {
                  await deleteDataAsociated(detail_horario.id);
                  console.log(
                    "Detalle de horario eliminado ID:",
                    detail_horario.id
                  );
                })
              );
              Alert.alert("Eliminando......", "ya casi damos por hecho");
              const claseD = await getClassesByHorarioID(itemId);
              console.log("claseD", claseD);
              await Promise.all(
                claseD.map(async (clase) => {
                  await DeleteClasesOne(clase.id);
                  console.log("Clase eliminada ID:", clase.id);
                })
              );
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

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleDateSelected = (selectedItem) => {
    const allHorariosSelected = selectedItem?.horarios
      .map((horarios) => {
        const fecha = moment(horarios.fecha);
        return fecha;
      })
      .filter((horarios) => {
        const currentMonth = moment().month(); // Se obtiene el mes actual usando moment
        return horarios.month() === currentMonth; // Solo comparamos el mes
      });

    return allHorariosSelected;
  };

  return (
    <>
      <ScrollView refreshControl={refreshControl(refreshing, onRefresh)}>
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <NotRegistration />
        ) : (
          items.map((item, index) => (
            <ListItem.Swipeable
            containerStyle={{
              backgroundColor:filteredData.length > 0 ? ColorItem.OceanCrest : "white"
            }}


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
              <ListItem.Content
              
              >
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

        <ScreenDetailHour
          handleDateChange={handleDateChange}
          handleDateSelected={handleDateSelected}
          value={value}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </ScrollView>
    </>
  );
};
