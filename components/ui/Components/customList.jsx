import { ScrollView, Alert, RefreshControl, View } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "./customModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InfoDS } from "../(DIRECTOR)/components/info";
import { ViewDS } from "../(DIRECTOR)/components/view";
import { NotRegistration } from "./unregistered/noRegistration";
import { Snackbar } from "@react-native-material/core";
import { useSupervisorDefault } from "../../../src/hooks/customHooks";
import { updateSupervisorDefault } from "../../../src/services/fetchData/fetchSupervisor";
import { ColorItem } from "../../styles/StylesGlobal";
export const ListItemComponent = ({
  getDataAll,
  getDataOne,
  deleteData,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
  isSupervisor = false,
}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  console.log(selectedItemId, "selectedItemId");
  const supervisordefault = useSupervisorDefault();

  useEffect(() => {
    if (
      supervisordefault &&
      supervisordefault.data &&
      supervisordefault.data.length > 0
    ) {
      setSelectedItemId(supervisordefault.data[0].persona);
    }
  }, [supervisordefault]);

  const [snackbarVisible, setSnackbarVisible] = useState(false); // Estado para controlar la visibilidad del Snackbar
  const [selectedItemForSnackbar, setSelectedItemForSnackbar] = useState(null); // Estado para guardar el item que activó el Snackbar
  console.log(selectedItemForSnackbar, "selectedItemForSnackbar");

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
      const itemselected = res.find((value) => value.cedula === cedula);
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
    try {
      setRefreshing(true);
      await fetchItems();
      setRefreshing(false);
    } catch {
      setRefreshing(false);
    }
  }, [fetchItems]);

  const handleLongPress = (itemId) => {
    if (selectedItemId === itemId) return;
    setSnackbarVisible(true);
    setSelectedItemForSnackbar(itemId);
  };

  const handleSnackbarDismiss = async () => {
    if (selectedItemForSnackbar) {
      try {
        await updateSupervisorDefault(selectedItemForSnackbar);
        setSelectedItemId(selectedItemForSnackbar);
        setSnackbarVisible(false);
      } catch (error) {
        console.error("Error al actualizar el supervisor por defecto:", error);
      }
    }
  };
  return (
    <>
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
                    onLongPress={() => {
                      if (isSupervisor) {
                        handleLongPress(item.id);
                      }
                    }}
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
              {isSupervisor && selectedItemId === item.id && (
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-circle-outline"
                  size={20}
                  color={ColorItem.DeepSkyBlue}
                />
              )}
              <ListItem.Chevron />
            </ListItem.Swipeable>
          ))
        )}
      </ScrollView>

      <ModalComponente
        transparent={true}
        modalStyle={{
          height: "70%",
        }}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        canCloseModal={true}
        title={`Datos del ${modalTitle}`}
      >
        {selectedItem ? (
          <InfoDS selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
      {isSupervisor && snackbarVisible && (
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
          }}
        >
          <Snackbar
            message="¿Quieres seleccionar este ítem?"
            action={
              <Button
                onPress={() => {
                  handleSnackbarDismiss(); // Ejecutar la función al presionar el botón
                }}
                title="Seleccionar"
                color="primary"
              />
            }
            style={{
              position: "absolute",
              start: 16,
              end: 16,
              bottom: 16,
            }}
          />
        </View>
      )}
    </>
  );
};
