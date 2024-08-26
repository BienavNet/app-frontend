import { View, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Dropdown({
  data,
  placeholder,
  onChange,
  value,
  error,
}) {
  return (
    <View style={{ marginVertical: 10}}>
        <ScrollView className="">
        <View
          style={{
            borderWidth: 1,
            borderColor: error ? "red" : "#000",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <View style={styles.pickerContainer}>
            <Picker
            
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={{ width: "100%", height:"95%"}}
            >
              <Picker.Item style={{fontSize: 18

              }} label={placeholder} value="" />
              {data.map((item) => (
                <Picker.Item
                  style={{
                    fontSize: 18
                  }}
                  key={item.id}
                  value={item.id}
                  label={item.label}
                />
              ))}
            </Picker>
          </View>
        </View>
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    overflow: "hidden",
  },
});
