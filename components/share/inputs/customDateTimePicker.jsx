import { Text } from "react-native";
import { Button } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  formatHourHHMM,
  formatHourHHMMTime,
} from "../../../src/utils/functiones/functions";
import { useEffect, useState } from "react";
export const CustomTimePicker = ({
  name,
  control,
  errors,
  testID,
  mode,
  display,
  is24Hour,
  initialValue,
  onTimeSelected,
  title,
}) => {
  console.log("initialize value: " + initialValue)
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialValue || new Date());
  const [titleSelected, setTitleSelected] = useState(title);
  useEffect(() => {
    if (initialValue) {
      const newTime = new Date(initialValue); // Convierte el valor inicial en un objeto Date
      setSelectedTime(newTime); // Actualiza el tiempo seleccionado
      setTitleSelected(formatHourHHMMTime(newTime)); // Actualiza el título mostrado en el botón
    }
  }, [initialValue]);


  const handlePress = () => {
    setShowPicker(true);
  };

  const handleChange = (e, newTime, onChange) => {
    if (e.type === "dismissed") {
      setShowPicker(false);
      return;
    }
    const time = newTime || selectedTime;
    setShowPicker(false);
    if (time instanceof Date && !isNaN(time.getTime())) {
      const formattedTime = formatHourHHMM(time); // HH:mm
      const formattedTimeTime = formatHourHHMMTime(time); // HH:mm AM/PM
      setSelectedTime(time); // Mantiene el objeto Date en el estado
      setTitleSelected(formattedTimeTime); // Actualiza el título mostrado en el botón
      onTimeSelected(formattedTime); // Retorna el tiempo formateado al padre
      onChange(formattedTime);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <>
          <Button
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 44,
              borderRadius: 8,
              width: "90%",
            }}
            tintColor={errors ? "#ffffff" : "black"}
            leading={() => (
              <MaterialCommunityIcons
                name="clock-time-ten-outline"
                size={28}
                color={errors ? "#ffffff" : "black"}
              />
            )}
            color={errors ? "red" : "#1371C3"}
            onPress={handlePress}
            title={titleSelected}
          />
          {showPicker && (
            <DateTimePicker
              testID={testID}
              value={selectedTime || new Date()}
              mode={mode}
              is24Hour={is24Hour}
              display={display}
              onChange={(e, newTime) => {handleChange(e, newTime, onChange);}}
            />
          )}
          {errors && (
            <Text style={{ color: "red", fontSize: 16 }}>{errors.message}</Text>
          )}
        </>
      )}
    />
  );
};
