import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { truncateText } from "../../../src/utils/functiones/functions";
export default function DropdownModal({
  data,
  onChange,
  placeholder,
  transparent,
  error,
}) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback(
    (item) => {
      console.log('item', item)
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
        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);
        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: error ? "red" : "#000",
            borderWidth: 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{truncateText(value) || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal
          animationType="slide"
          visible={expanded}
          transparent={transparent}
        >
          <View
            style={[
              {
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.19)",
              },
            ]}
          >
            <View
              className="bg-white rounded-t-3xl p-2"
              style={[
                {
                  height: "95%",
                  width: "100%",
                },
              ]}
            >
              <Text className="w-11/12 justify-center text-left pl-2 ml-3 mt-5 text-base font-semibold">
                Registra el que mas osguste
              </Text>
              <TouchableWithoutFeedback
                style={[styles.feedback]}
                onPress={() => setExpanded(false)}
              >
                <View style={[styles.backdrop]}>
                  <View
                    style={[
                      styles.options,
                      {
                        top,
                      },
                    ]}
                  >
                    <FlatList windowSize={10}
                      style={{
                        borderRadius: 8,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                      keyExtractor={(item) => item.id.toString()} data={data}
                      renderItem={({ item }) => {
                      console.log("item  ---->", item);
                        return(
                          (                       
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.optionItem}
                              onPress={() => onSelect(item)}
                            >
                            <Text className="text-black ml-1 text-base pl-2">{item.label}</Text>
                            </TouchableOpacity>
                            //  <ItemComponent
                            //  item={item}
                            //  onSelect={onSelect(item)}
                            //  />
                            // <TouchableOpacity
                            //   activeOpacity={0.8}
                            //   style={styles.optionItem}
                            //   onPress={() => onSelect(item)}
                            // >
                            //   <Text className="text-black ml-1 text-base pl-2">
                            //     {item.label}
                            //   </Text>
                            // </TouchableOpacity>
                          )
                        )
                      }}
                      ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height:"100%"
  },
  separator: {
    backgroundColor: "#ffffff",
    height: 5,
  },
  options: {
    position: "absolute",
    borderRadius: 8,
    width: "100%",
    padding: 6,
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
  },
  feedback: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
  },
  optionItem: {
    height: 45,
    justifyContent: "center",
  },
});
