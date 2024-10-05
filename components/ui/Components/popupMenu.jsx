import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Text,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ColorItem } from "../../styles/StylesGlobal";
import { useRef, useState } from "react";

export const PopupMenu = ({ opcions, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  function resizeBox(to) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  const handleOptionSelect = (id) => {
    if (onSelect) {
      onSelect(id);
    }

    resizeBox(0);
  };
  return (
    <>
      <TouchableOpacity style={styles.menuButton} onPress={() => resizeBox(1)}>
        <FontAwesome name="sliders" size={30} color={ColorItem.DeepFir} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={visible}>
        <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
          <Animated.View
            style={[
              styles.popupMenu,
              {
                opacity: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                transform: [
                  {
                    scale,
                  },
                ],
              },
            ]}
          >
            {opcions.map((op, i) => (
              <TouchableOpacity
                style={[
                  styles.ButtonPopupMenu,
                  {
                    borderBottomWidth: i === opcions.length - 1 ? 0 : 1,
                  },
                ]}
                key={i}
                onPress={() => {
                  handleOptionSelect(op.id); // Llama a handleOptionSelect
                  if (op.action) {
                    op.action(); // Llama a op.action si existe
                  }
                }}
              >
                <Text style={{ marginLeft: 10, color: "black" }}>
                  {op.title}
                </Text>
                <View style={{ marginLeft: 10 }}>{op.icon}</View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  popupMenu: {
    borderRadius: 8,
    borderColor: ColorItem.DeepFir,
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: 102,
    right: 10,
  },
  ButtonPopupMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomColor: "#ccc",
  },
  menuButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    margin: 2,
    marginRight: 10,
  },
});
