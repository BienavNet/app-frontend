import { Alert } from "react-native";
import { useState } from "react";
import Loading from "../../share/loading";
import { NotRegistration } from "./unregistered/noRegistration";
import { DeleteComentarioOne } from "../../../src/services/fetchData/fetchComentario";
import LayoutScroolView from "./Layout/UseScroollView";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { Iconcommenting } from "../../../assets/icons/IconsGlobal";
import { ModalComponente } from "./Modals/customModal";
import { CComentario } from "../(DIRECTOR)/comentario/components/listComentario";
import { BtnViewSelect } from "../(DIRECTOR)/comentario/components/btnViewSelect";
import { useComentarioAll } from "../../../src/hooks/customHooks";

export const ListItemComentario = ({
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  itemIcon = "account",
  modalTitle = "Info",
}) => {
  const { comentarioAll, reload, fetchComentarioAll} = useComentarioAll();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleInfoPress = async (id) => {
    try {
      setModalVisible(true);
      const res = await getDataOne(id);
      const itemselected = res.find((value) => value.id === id);
      if (itemselected) {
        setSelectedItem(itemselected);
        // setViewedComments((prev) => ({ ...prev, [id]: true }));
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
              setItems(comentarioAll.filter((item) => item.id !== itemId));
              Alert.alert(`${modalTitle} eliminado con éxito`);
            } catch (error) {
              Alert.alert(`Error al eliminar el ${modalTitle.toLowerCase()}`);
            }
          },
        },
      ]
    );
  };

  return (
    <LayoutScroolView
    onRefreshExternal={fetchComentarioAll}
    >
      {reload ? (
        <Loading />
      ) : comentarioAll.length === 0 ? (
        <NotRegistration />
      ) : (
        comentarioAll.map((item, index) => {
          const key = `key25${item.id}-${index}`;
          return (
            <ListSwipeable
              item={item}
              index={index}
              key={key}
              handleDeletePress={handleDeletePress}
              handleInfoPress={handleInfoPress}
              icono={Iconcommenting}
            >
              <BtnViewSelect item={item} />
            </ListSwipeable>
          );
        })
      )}
      <ModalComponente
        modalStyle={{ height: "99%" }}
        modalVisible={modalVisible}
        title="Datos del Comentario"
        handleCloseModal={handleCloseModal}
      >
        {reload ? (
          <Loading />
        ) : selectedItem ? (
          <CComentario selectedItem={selectedItem} />
        ) : (
          <NotRegistration />
        )}
      </ModalComponente>
    </LayoutScroolView>
  );
};