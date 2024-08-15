import { Modal, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const ModalComponente = ({
  modalVisible,
  handleCloseModal,
  transparent,
  animationType,
  children,
  modalStyle = {}, canCloseModal
}) => {
  return (
    <Modal
      animationType={animationType} // fade none slider
      transparent={transparent} // true o false
      visible={modalVisible}
      
      onRequestClose={() => {
        if (canCloseModal) {
          handleCloseModal();
        }
      }}

    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          modalStyle.overlay,
        ]}
      >
        <View
          className="bg-white rounded-t-3xl p-5"
          style={[
            {
              height:modalStyle.height,
              width: "100%",
            },
            modalStyle.content,
          ]}
        >
          <View className="flex-row">
            <View className="w-[100%]">{children}</View>
            {canCloseModal && (
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="cancel" size={35} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
