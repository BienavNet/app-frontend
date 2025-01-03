import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../src/utils/functiones/functions";
import {ColorItem, styles } from "../../styles/StylesGlobal";
import { ModalComponente } from "../../ui/Components/Modals/customModal";

export default function DropdownModal({
  name = "",
  value,
  data,
  onChange,
  placeholder,
  error
}) {
  
  const [expanded, setExpanded] = useState(false);
  const [valuee, setValue] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      const selected = data.find((item) => item.id === value.toString());
      if (selected) {
        setValue(selected.label);
      } else {
        setValue(value);
      }
    }
  }, [value, data]);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback(
    (item) => {
      onChange(item.id);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );
  return (
    <>
      <View ref={buttonRef}>
        <TouchableOpacity
          
          style={[styless.button,{
            borderColor:error ? "red" :ColorItem.TarnishedSilver
          }]}
          activeOpacity={0.8}
          onPress={toggleExpanded}
        >
          <Text style={styless.text}>{capitalizeFirstLetter(truncateText(valuee, 20)) || placeholder}</Text>
          <AntDesign name={expanded ? "caretup" : "caretdown"} />
        </TouchableOpacity>
      </View>

      {expanded ? (
        <ModalComponente
        title={`Seleccione ${name}`}
          modalStyle={{
            height: "80%",
          }}
          modalVisible={expanded}
          handleCloseModal={toggleExpanded}
          canCloseModal={true}
        >
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={[styless.options]}>
              {data.map((item) => (
                <View
                  key={item.id.toString()}
                  style={{
                    padding: 5,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.3}
                    style={styles.optionItem}
                    onPress={() => onSelect(item)}
                  >
                    <Text className="text-black text-lg text-left py-2">
                      {capitalizeFirstLetter(item.label)}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </ModalComponente>
      ) : null}
    </>
  );
}

const styless = StyleSheet.create({
  options: {
    width: "100%",
    height: "100%",
    paddingVertical: 20,
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
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
  },

});
