import { ScrollView } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Loading from "../../share/loading";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { InfoSalones } from "../(DIRECTOR)/salones/components/InfoSalones";
import { ViewSalones } from "../(DIRECTOR)/salones/components/viewSalones";
import CustomTouchableOpacity from "./customTouchableOpacity";
import { NotRegistration } from "./unregistered/noRegistration";

export const ListItemSalones = ({
  getDataAll,
  getDataOne,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
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
    try {
      setModalVisible(true);
      const res = await getDataOne(id);
      const itemselected = res.find((value) => value.id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
      } else {
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  }, [fetchItems]);

  return (
    <ScrollView refreshControl={refreshControl(refreshing, onRefresh)}>
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
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
                  await handleInfoPress(item.id);
                }}
                icon={{ name: "info", color: "white" }}
                buttonStyle={{ minHeight: "100%" }}
              />
            )}
          >
            <MaterialCommunityIcons
              name="google-classroom"
              size={24}
              color="black"
            />
            <ListItem.Content>
              <ListItem.Title>
                <CustomTouchableOpacity
                  navigateToFormScreen={navigateToFormScreen}
                  screenName="FormScreen"
                  paramKey="id"
                  paramValue={item.id}
                >
                  <ViewSalones item={item} />
                </CustomTouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        modalStyle={{ height: "60%" }}
        transparent={true}
        animationType={"slider"}
        modalVisible={modalVisible}
        title="Datos del salon"
        handleCloseModal={handleCloseModal}
      >
        {selectedItem ? (
          <InfoSalones selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </ScrollView>
  );
};
