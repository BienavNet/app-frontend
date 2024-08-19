import {
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ListItem, Button, Divider } from "@rneui/themed";
import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "../../../src/utils/functiones/functions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Loading from "../../share/loading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const ListItemSalones = ({
  getDataAll,
  getDataOne,
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
      console.log(res, "response res de handleInfoPress");
      const itemselected = res.find((value) => value.id === id);
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
                    {capitalizeFirstLetter(item.nombre)}
                    {" - "}
                  </Text>
                  <Text className="font-extrabold text-lg">
                    {item.numero_salon}
                  </Text>
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        modalStyle={{height:"60%"}}
        transparent={true}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
      >
        {selectedItem ? (
          <View className="bg-white shadow-2xl rounded-lg p-3 w-full">
            <Text style={[styles.Title1]}>Nombre Salon</Text>
            <Text style={[styles.text]}>{selectedItem.nombre}</Text>
            <Text style={[styles.Title1]}> # Salon</Text>
            <Text style={[styles.text]}>{selectedItem.numero_salon}</Text>
            <Text style={[styles.Title1]}>Conectividad digital</Text>
            <View style={styles.vertical}>
              {selectedItem.INTernet === "si" ? (
                <MaterialIcons name="wifi" size={24} color="black" />
              ) : (
                <MaterialIcons name="wifi-off" size={24} color="black" />
              )}
              <Text style={[styles.text]}>{selectedItem.INTernet}</Text>
              <Divider orientation="vertical" width={5} />
              {selectedItem.tv === "si" ? (
                <Ionicons name="tv-sharp" size={24} color="black" />
              ) : (
                <MaterialIcons name="tv-off" size={24} color="black" />
              )}
              <Text style={[styles.text]}>{selectedItem.tv}</Text>
            </View>
            <Text style={[styles.Title1]}>Categoría</Text>
            <Text style={[styles.text]}>{selectedItem.categoria}</Text>
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
  viewmore: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  subtitle: {
    paddingVertical: 12,
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
  },
});
