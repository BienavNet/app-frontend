import { Modal, View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const ModalComponente = ({
  modalVisible,
  handleCloseModal,
  transparent,
  animationType,
  children,
  modalStyle = {},
}) => {
  return (
    <Modal
      animationType={animationType} // fade none slider
      transparent={transparent} // true o false
      visible={modalVisible}
      onRequestClose={handleCloseModal}
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
          className="bg-white rounded-t-3xl  p-5"
          style={[
            {
              height: "60%",
              width: "100%",
              borderRadius: 8,
            },
            modalStyle.content,
          ]}
        >
          <View className="flex-row">
            <View className="w-[90%]">{children}</View>
            <TouchableOpacity onPress={handleCloseModal}>
              <MaterialIcons name="cancel" size={35} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
