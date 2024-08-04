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
  rules = {},
  label,
  icon,
  variant
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className="p-3">
            <TextInput
              className={`bg-black/5 rounded-xl w-full ${
                error ? "border-red-400" : "border-slate-400"
              } border`}
              variant={variant}
              label={label}
              leading={icon}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={"#3111F3"}
              keyboardType={keyBoardType}
              autoComplete="off"
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text className="text-red-400 self-stretch pl-3">
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const CheckBox = ({ label, value, rfv, onChange, error, selectedOption }) => {
  const isSelected = selectedOption === value;
  const borderColor =
    error && !selectedOption ? "red" : isSelected ? "black" : "#929292";
  return (
    <View className="mb-5 flex-row">
      <Checkbox
        style={{
          width: 25,
          height: 25,
          borderColor,
        }}
        value={rfv === value}
        onValueChange={() => onChange(value)}
        className="bg-black/5 self-center border-2 rounded-full"
      />
      <Text className="m-1 font-semibold text-sm">{label}</Text>
    </View>
  );
};

export const CustomInputCheckBox = ({ control, name, title, rules = {} }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (onChange, value) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View className="flex w-full justify-center">
            <Text className="p-5 font-semibold text-subtitle">{title}</Text>
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
              <Text className="text-red-400 self-stretch pl-3">
                {error.message || "Error"}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};
  