import { Modal, View, TouchableOpacity, ScrollView, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DividerLine } from "./dividerline/dividerLine";
export const ModalComponente = ({
  modalVisible,
  handleCloseModal,
  transparent,
  animationType,
  children,
  modalStyle = {},
  canCloseModal = true,
  title = "",
  childrenStatic = "",
  bottomStatic = "",
  linearDiviider = false,
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
          className="bg-white rounded-t-3xl p-3"
          style={[
            {
              height: modalStyle.height,
              width: "100%",
            },
            modalStyle.content,
          ]}
        >
          <View style={{ flexDirection: "row-reverse", marginBottom: 12 }}>
            {canCloseModal && (
              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons name="cancel" size={30} color="red" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              paddingLeft: 8,
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {title}
          </Text>
          <View>{childrenStatic}</View>
          {linearDiviider && <DividerLine />}
          <ScrollView className="h-full">
            <View className="w-[100%]">{children}</View>
          </ScrollView>
          {linearDiviider && <DividerLine />}
          <View>{bottomStatic}</View>
        </View>
      </View>
    </Modal>
  );
};
