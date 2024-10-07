import SimpleDatePicker from "../../Components/customSimpleDatePicker";
import { InfoHorario } from "./component/info/infoHorario";
import { SearchView } from "./component/searchMore&viewValue";
import { ModalComponente } from "../../Components/customModal";
import { useState } from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import ScreenViewMore from "./component/ScreenViewMore";
import { MaterialIcons } from "@expo/vector-icons";
import useToastMessage from "../../../share/ToasNotification";
import moment from "../../../../src/utils/InstanceMoment";
import { NotRegistration } from "../../Components/unregistered/noRegistration";

export const ScreenDetailHour = ({
  selectedItem,
  value,
  handleDateSelected,
  handleDateChange,
  setSelectedItem, 
  modalVisible,
  setModalVisible
}) => {
  const [viewmoreModalVisible, setViewMoreModalVisible] = useState(false); // segunda modal
  const { showToast, APP_STATUS } = useToastMessage();

  const handleOpenSecondModal = () => {
    return showToast({
      message: "Cargando datos.... en espera......",
      type: "warning",
      id: APP_STATUS.LOADING,
      onClose:() => setViewMoreModalVisible(true)
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleCloseSecondModal = () => {
    setViewMoreModalVisible(false);
  };
  return (
    <>
      <>
        <ModalComponente
          transparent={true}
          modalStyle={{ height: "100%" }}
          animationType={"slider"}
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
        >
          {selectedItem ?(
            <>
              <InfoHorario selectedItem={selectedItem} />
              <SearchView value={value} handleOpenSecondModal={handleOpenSecondModal}/>
             
              <SimpleDatePicker
                onDateChange={handleDateChange}
                selectedDate={handleDateSelected(selectedItem)}
                viewSelectDate={selectedItem?.horarios.find((horario) =>  moment(horario.fecha).isSame(value, 'day'))}
              />
            </>
          ): (
            <NotRegistration />
          )
        }
          {/* {loading ? (
            <Loading />
          ) :  : (
            <NotRegistration />
          )} */}
        </ModalComponente>
      </>

      <>
        <Modal
          animationType="slide" // fade none slider
          transparent={false} // true o false
          visible={viewmoreModalVisible}
          modalStyle={{ height: "98%" }}
          modalVisible={viewmoreModalVisible}
          handleCloseModal={handleCloseSecondModal}
          onRequestClose={() => {
              handleCloseModal();
          }}
        >
          <View style={{ flexDirection: "row-reverse", marginBottom: 12 }}>
            <TouchableOpacity onPress={handleCloseSecondModal}>
              <MaterialIcons name="cancel" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <ScreenViewMore selectedDate={selectedItem} />
        </Modal>
      </>
    </>
  );
};
