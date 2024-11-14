import { ScrollView, Alert } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { ScrollMultipleFilterClass } from "../(SUPERVISOR)/clases/components/carouselFilter/CarouselFilter";

export const ListItemComponentHorario = ({
  additionalData,
  filters,
  opciones,
  handleOptionSelect,
  multipleSelectedItem,
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  modalTitle = "Info",
  fetchAdditionalData
}) => {
  const [modalVisible, setModalVisible] = useState(false); // primer modal
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const today = Today();
  const [value, setValue] = useState(today);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        if (additionalData.length > 0) {
          setItems(additionalData);
        }
        else if (
          (filters.docente > 0 || filters.dia > 0 || filters.horario > 0) &&
          additionalData.length === 0
        ) {
          setItems([]);
        }
        else if (Object.values(filters).every((value) => value === 0)) {
          const res = await getDataAll();
          setItems(res);
        }
      } catch (e) {
        console.error("Error fetching items:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [getDataAll, additionalData, filters]);

  const handleInfoPress = async (id) => {
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
              await Promise.all(
                detailhorarioD.map(async (detail_horario) => {
                  await deleteDataAsociated(detail_horario.id);
                })
              );
              Alert.alert("Eliminando......", "ya casi damos por hecho");
              const claseD = await getClassesByHorarioID(itemId);
              await Promise.all(
                claseD.map(async (clase) => {
                  await DeleteClasesOne(clase.id);
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
  // const onRefresh = useCallback(async () => {
  //   try {
  //     setRefreshing(true);
  //     await fetchItems();
  //     setRefreshing(false);
  //   } catch {
  //     setRefreshing(false);
  //   }
  // }, [fetchItems]);

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
    <ScrollView
    //  refreshControl={refreshControl(refreshing, onRefresh)}
     >
      {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
        />
      )}

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <NotRegistration />
      ) : (
        items.map((item, index) => (
          <ListItem.Swipeable
            containerStyle={{
              backgroundColor:
                additionalData.length > 0 ? ColorItem.OceanCrest : "white",
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
  );
};
