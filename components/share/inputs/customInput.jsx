import { Controller } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { TextInput } from "@react-native-material/core";

export const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  keyBoardType,
  label,
  icon,
  variant,
  error,enable = true
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
      }) => (
        <>
          <View className="p-2">
            <TextInput
              inputContainerStyle={{
                backgroundColor:"#ffffff",
                borderBottomColor: error ? "#E71717" : null, // Borde inferior rojo si hay error
                borderBottomWidth: error ? 2 : null,
              }}
              color={`${error ? "#E71717" : "#3C9B61"}`}
              className={`bg-black/5 rounded-xl w-full ${
                error ? "#E71717" : "border-slate-400"
              } border`}
              variant="outlined"
              label={label}
              leading={icon}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={"#676767"}
              keyboardType={keyBoardType}
              autoComplete="off"
              secureTextEntry={secureTextEntry}
              editable={enable}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>
              {typeof error.message === "string"
                ? error.message
                : error.message && typeof error.message === "object"
                ? error.message.message || "Error"
                : "Error inesperado"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const CheckBox = ({ label, value, rfv, onChange, error, selectedOption }) => {
  const isSelected = selectedOption === value;
  const borderColor = error && !selectedOption ? "red" : isSelected ? "black" : "#929292";
  return (
    <View className="mb-1 flex-row">
      <Checkbox
        style={{
          backgroundColor:"#FFFFFF",
          width: 25,
          height: 25,
          borderColor:borderColor,
        }}
        value={rfv === value}
        onValueChange={() => onChange(value)}
        className="bg-black/5 self-center border-2 rounded-full"
      />
      <Text className="m-1 font-semibold text-base">{label}</Text>
    </View>
  );
};

export const CustomInputCheckBox = ({ control, name, title, error }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCheckboxChange = (onChange, value) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="flex w-full justify-center">
            <Text className="p-3 font-semibold text-subtitle">{title}</Text>
            <View className="flex-row w-full justify-around">
              <CheckBox
                error={error}
                onChange={() => handleCheckboxChange(onChange, "supervisor")}
                rfv={value}
                label="Supervisor"
                value="supervisor"
                selectedOption={selectedOption}
              />
              <CheckBox
                error={error}
                onChange={() => handleCheckboxChange(onChange, "director")}
                rfv={value}
                label="Director"
                value="director"
                selectedOption={selectedOption}
              />
              <CheckBox
                error={error}
                onChange={() => handleCheckboxChange(onChange, "docente")}
                rfv={value}
                label="Docente"
                value="docente"
                selectedOption={selectedOption}
              />
            </View>
            {error && (
              <Text style={styles.errorText}>
                {error.message || "Error"}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "#E71717",
    alignSelf: "stretch",
    paddingLeft: 16,
  },
});
