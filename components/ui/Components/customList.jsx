import { Alert, View } from "react-native";
import { Button } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InfoDS } from "../(DIRECTOR)/components/info";
import { ViewDS } from "../(DIRECTOR)/components/view";
import { NotRegistration } from "./unregistered/noRegistration";
import { Snackbar } from "@react-native-material/core";
import { useSupervisorDefault } from "../../../src/hooks/customHooks";
import { updateSupervisorDefault } from "../../../src/services/fetchData/fetchSupervisor";
import { ColorItem } from "../../styles/StylesGlobal";
import LayoutScroolView from "./Layout/UseScroollView";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconCustomUser } from "../../../assets/icons/IconsGlobal";
import { ModalComponente } from "./Modals/customModal";

export const ListItemComponent = ({
  getDataAll,
  getDataOne,
  deleteData,
  navigateToFormScreen,
  modalTitle = "Info",
  isSupervisor = false,
}) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
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
              const a = isSupervisor ? error.message : null;
              Alert.alert(
                `Error al eliminar el ${modalTitle.toLowerCase()}`,
                a
              );
            }
          },
        },
      ]
    );
  };
  const handleLongPress = (itemId) => {
    if (selectedItemId === itemId) return;
    setSnackbarVisible(true);
    setSelectedItemForSnackbar(itemId);
  };

  const handleSnackbarDismiss = async () => {
    setSnackbarVisible(false);
  };

  const handleSelectItem = async () =>{
    if (selectedItemForSnackbar) {
      try {
        await updateSupervisorDefault(selectedItemForSnackbar);
        setSelectedItemId(selectedItemForSnackbar);
        setSnackbarVisible(false);
      } catch (error) {
        console.error("Error al actualizar el supervisor por defecto:", error);
      }
    }

  }
  return (
    <>
      <LayoutScroolView onRefreshExternal={fetchItems}>
        {items.length === 0 ? (
          <NotRegistration />
        ) : (
          items.map((item, index) => (
            <ListSwipeable
              index={index}
              item={item}
              handleDeletePress={handleDeletePress}
              handleInfoPress={handleInfoPress}
              icono={IconCustomUser}
              isdocente={isSupervisor && selectedItemId === item.id && (
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-circle-outline"
                  size={20}
                  color={ColorItem.DeepSkyBlue}
                />
              )}
            >
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
            </ListSwipeable>
          ))
        )}
      </LayoutScroolView>

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
            height: 80,
          }}
        >
          <Snackbar
            message="¿Quieres seleccionar este ítem?"
            action={
              // <Button
              //   onPress={() => {
              //     handleSelected();
              //     // handleSnackbarDismiss(); // Ejecutar la función al presionar el botón
              //   }}
              //   title="Seleccionar"
              //   color="primary"
              // />
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            onPress={() => {
              handleSnackbarDismiss(); // Función para manejar el "Cancelar"
            }}
            title="Cancelar"
            color="grey"
            style={{ marginRight: 10 }} // Espacio entre los botones
          />
          <Button
            onPress={() => {
              handleSelectItem(); // Función para manejar la "Selección"
            }}
            title="Seleccionar"
            color="primary"
          />
        </View>
              
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
