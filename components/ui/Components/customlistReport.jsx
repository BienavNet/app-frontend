import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ListItem, Button } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../src/utils/functiones/functions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../share/loading";
import { NotRegistration } from "../../share/noRegistration";
import LayoutScroolView from "./Layout/UseScroollView";

export const ListItemReport = ({
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();
  const [viewedComments, setViewedComments] = useState({});
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  return (
    <LayoutScroolView
    onRefreshExternal={fetchItems}
    >
            {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <NotRegistration />
      ) : (
        items.map((item, index) => (
          <ListItem.Swipeable
            containerStyle={{
              borderRadius: 4,
              elevation: 5,
              backgroundColor: viewedComments[item.id] ? "#b6b2b2" : "white",
              paddingHorizontal: 25,
              width: "100%",
              marginVertical: 10,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
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
                buttonStyle={{
                  borderRadius: 4,
                  paddingHorizontal: 25,
                  width: "100%",
                  minHeight: 102,
                  marginVertical: 10,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
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
                buttonStyle={{
                  borderRadius: 4,
                  minHeight: 102,
                  backgroundColor: "red",
                  paddingHorizontal: 25,
                  width: "100%",
                  marginVertical: 10,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
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
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text className="font-extrabold text-base">
                        {capitalizeFirstLetter(item.nombre)}{" "}
                        {capitalizeFirstLetter(item.apellido)}
                        {" - "}
                      </Text>
                      <Text className="text-base">
                        {truncateText(item.asignatura)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text className="font-extrabold text-base">
                        {item.nombre_salon}
                        {":"}{" "}
                      </Text>
                      <Text className="text-base">{item.numero_salon}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text className="font-extrabold text-base">
                        Observacion:{" "}
                      </Text>
                      <Text className="text-base">
                        {truncateText(item.comentario)}
                      </Text>
                    </View>
                  </View>
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
            {/* <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
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
                    {selectedItem?.numero_salon}{" - "}
                    {capitalizeFirstLetter(selectedItem?.salon_nombre)}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.Title1]}>Comentario</Text>
                  <Text style={[styles.comentario]}>
                    {capitalizeFirstLetter(selectedItem?.comentario)}
                  </Text>
                </View>
              </View> */}
          </>
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </LayoutScroolView>
  );
};
