import { ScrollView, Alert,  RefreshControl } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InfoDS } from "../(DIRECTOR)/components/info";
import { ViewDS } from "../(DIRECTOR)/components/view";
import { NotRegistration } from "../../share/noRegistration";

export const ListItemComponent = ({
  getDataAll,
  getDataOne,
  deleteData,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem, "setSelectedItem");
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = useCallback(async () => {
    const res = await getDataAll();
    setItems(res);
  }, [getDataAll]);

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [fetchItems])
  );

  const handleInfoPress = async (cedula) => {
    try {
      setModalVisible(true);
      const res = await getDataOne(cedula);
      console.log(res, "response res de handleInfoPress");
      const itemselected = res.find((value) => value.cedula === cedula);
      console.log(itemselected, "item selected");
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
        console.error("Docente no encontrado");
        setSelectedItem(null);
      }
    } catch (error) {
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
              await deleteData(itemId);
              setItems(items.filter((item) => item.cedula !== itemId));
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
      {items.length === 0 ? (
        <NotRegistration/>
      ) : (
        items.map((item, index) => (
          <ListItem.Swipeable
            key={item.id || index}
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={async () => {
                  reset();
                  await handleInfoPress(item.cedula);
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
                  handleDeletePress(item.cedula);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )}
          >
            <Icon name={itemIcon} size={25} color="black" />
            <ListItem.Content>
              <ListItem.Title>
                <TouchableOpacity
                  className="flex-row"
                  onPress={() =>
                    navigateToFormScreen
                      ? navigateToFormScreen(navigation, item.cedula)
                      : navigation.navigate("FormScreen", {
                          cedula: item.cedula,
                        })
                  }
                >
                  <ViewDS item={item} />
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        transparent={true}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedItem ? (
          <InfoDS selectedItem={selectedItem} />
        ) : (
          <NotRegistration/>
        )}
      </ModalComponente>
    </ScrollView>
  );
};