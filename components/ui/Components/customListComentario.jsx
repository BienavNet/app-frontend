import { Text, ScrollView, View, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { useFocusEffect } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../share/loading";
import { NotRegistration } from "./unregistered/noRegistration";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { styles } from "../../styles/StylesGlobal";
import { DeleteComentarioOne } from "../../../src/services/fetchData/fetchComentario";
export const ListItemComentario = ({
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
  const [viewedComments, setViewedComments] = useState({});
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
      setLoading(false);
      setItems([]);
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
    try {
      setModalVisible(true);
      const res = await getDataOne(id);
      const itemselected = res.find((value) => value.id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
        setViewedComments((prev) => ({ ...prev, [id]: true }));
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
              await DeleteComentarioOne(itemId);
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
    try {
      setRefreshing(true);
      await fetchItems();
      setRefreshing(false);
    } catch {
      setRefreshing(false);
    }
  }, [fetchItems]);

  // useEffect(() => {
  //   if (modalVisible) {
  //     setLoading(true);
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [modalVisible]);

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
            <FontAwesome
              name={viewedComments[item.id] ? "commenting-o" : "commenting"}
              size={25}
              color="black"
            />
            <ListItem.Content>
              <ListItem.Title>
                <TouchableOpacity className="flex-row">
                  <Text className="font-extrabold text-lg">
                    {capitalizeFirstLetter(item.nombre)}
                    {" - "}
                    {item.numero_salon}
                    {" - "} {item.salon_nombre}
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
        modalStyle={{ height: "99%" }}
        animationType={"slider"}
        modalVisible={modalVisible}
        title="Datos del Comentario"
        handleCloseModal={handleCloseModal}
      >
        {loading ? (
          <Loading />
        ) : selectedItem ? (
          <>
            <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
              <View>
                <Text style={[styles.Title1]}>Docente</Text>
                <Text style={[styles.text]}>
                  {capitalizeFirstLetter(selectedItem?.nombre)}{" "}
                  {capitalizeFirstLetter(selectedItem?.apellido)}
                </Text>
              </View>
              <View>
                <Text style={[styles.Title1]}>Salon</Text>
                <Text style={[styles.text]}>
                  {selectedItem?.numero_salon}
                  {" - "}
                  {capitalizeFirstLetter(selectedItem?.salon_nombre)}
                </Text>
              </View>
              <View>
                <Text style={[styles.Title1]}>Comentario</Text>
                <Text style={[styles.comentario]}>
                  {capitalizeFirstLetter(selectedItem?.comentario)}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </ScrollView>
  );
};
