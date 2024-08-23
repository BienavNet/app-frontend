import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { truncateText } from "../../../src/utils/functiones/functions";
export default function DropdownModal({
  data,
  onChange,
  placeholder,
  transparent,
  verticalOffset = 0
}) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);
  console.log("top", top);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback((item) => {
      onChange(item.id);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;
        const finalValue =topOffset + heightOfComponent + (Platform.OS === "android" ? verticalOffset: 3);

      setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{truncateText(value) || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal
          animationType="none"
          visible={expanded}
          transparent={transparent}
        >
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={[styles.backdrop]}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={data}
                  renderItem={({ item }) => {
                    console.log("item  ---->", item);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.optionItem}
                        onPress={() => onSelect(item)}
                      >
                        <Text className="text-black ml-1 text-base pl-2">
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  separator: {
    // backgroundColor: "#ffffff",
    height: 5,
  },
  options: {
    position: "absolute",
    backgroundColor: "#d5d5d5",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
});
