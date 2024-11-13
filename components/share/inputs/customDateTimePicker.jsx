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
  editing = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const initialEditing = initialValue;
  const initalRegistering = initialValue || new Date();
  const [selectedTime, setSelectedTime] = useState(
    editing ? initialEditing : initalRegistering
  );
  const [titleSelected, setTitleSelected] = useState(title);

  useEffect(() => {
    if (typeof initialValue === "object") {
      return setTitleSelected(title);  // Si initialValue es un objeto, usa el título predeterminado
    }
  
  }, [initialValue]);
  

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

  useEffect(() => {
    if (editing && initialValue) {
      const timeParts = initialValue.split(":"); 
      if (timeParts.length >= 2) {
        const newTime = new Date();
        newTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
        const formattedTime = formatHourHHMM(newTime); // HH:mm
        const formattedTimeTime = formatHourHHMMTime(newTime); // HH:mm AM/PM
        setSelectedTime(newTime); // Mantiene el objeto Date en el estado
        setTitleSelected(formattedTimeTime); // Actualiza el título mostrado en el botón
        onTimeSelected(formattedTime); // Retorna el tiempo formateado al padre
      }
    }
  }, [editing, initialValue]);
  

  const handlePress = () => {
    setShowPicker(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <>
          <Button
            style={{
              borderRadius: 8,
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
              onChange={(e, newTime) => {
                handleChange(e, newTime, onChange);
              }}
            />
          )}
          {errors && (
            <Text style={{ color: "red", fontSize: 13, marginHorizontal: 10 }}>
              {errors.message}
            </Text>
          )}
        </>
      )}
    />
  );
};
