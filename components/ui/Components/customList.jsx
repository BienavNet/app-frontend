import { Text, ScrollView, Alert, View, RefreshControl } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { NotRegistration } from "../../share/noRegistration";
import { DeleteConfirmation } from "../../share/deletePress";
import { InfoDocente } from "../(DIRECTOR)/docentes/components/inforDocente";
import { ViewDocente } from "../(DIRECTOR)/docentes/components/viewDocente";
import CustomTouchableOpacity from "./customTouchableOpacity";
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
    DeleteConfirmation({
      nameDelete: modalTitle,
      onPress: async () => {
        await deleteData(itemId);
        setItems(items.filter((item) => item.cedula !== itemId));
      },
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  return (
    <ScrollView refreshControl={refreshControl(refreshing, onRefresh)}>
      {items.length === 0 ? (
        <NotRegistration />
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
                  handleDeletePress(item.cedula); // aca debe ir DeleteConfirmation
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )}
          >
            <Icon name={itemIcon} size={25} color="black" />
            <ListItem.Content>
              <ListItem.Title>
                <CustomTouchableOpacity
                  navigateToFormScreen={navigateToFormScreen}
                  screenName="FormScreen"
                  paramKey="cedula"
                  paramValue={item.cedula}
                >
                  <ViewDocente item={item} />
                </CustomTouchableOpacity>
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
          <InfoDocente selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </ScrollView>
  );
};
