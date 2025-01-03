import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../share/loading";
import { InfoSalones } from "../(DIRECTOR)/salones/components/InfoSalones";
import { ViewSalones } from "../(DIRECTOR)/salones/components/viewSalones";
import { NotRegistration } from "./unregistered/noRegistration";
import LayoutScroolView from "./Layout/UseScroollView";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconClassRoom } from "../../../assets/icons/IconsGlobal";
import CustomTouchableOpacity from "../../share/button/customTouchableOpacity";
import { ModalComponente } from "./Modals/customModal";

export const ListItemSalones = ({
  getDataAll,
  getDataOne,
  navigateToFormScreen,
}) => {
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

  return (
    <LayoutScroolView onRefreshExternal={fetchItems}>
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <NotRegistration />
      ) : (
        items.map((item, index) => (
          <ListSwipeable
            index={index}
            item={item}
            key={item.id}
            showrightContent={false}
            handleInfoPress={handleInfoPress}
            icono={IconClassRoom}
          >
            <CustomTouchableOpacity
              navigateToFormScreen={navigateToFormScreen}
              screenName="FormScreen"
              paramKey="id"
              paramValue={item.id}
            >
              <ViewSalones item={item} />
            </CustomTouchableOpacity>
          </ListSwipeable>
        ))
      )}

      {/* Modal para mostrar información del salón */}
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
    </LayoutScroolView>
  );
};