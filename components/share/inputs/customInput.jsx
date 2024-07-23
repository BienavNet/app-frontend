import { Controller } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";


export const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  keyBoardType,
  rules = {},
  label,
}) => {
  return (
    <View>
      <Text className="text-gray-800 w-full font-semibold text-subtitle pt-3 pb-3 pl-1">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View
              className={`bg-black/5 p-3 rounded-xl w-full ${
                error ? "border-red-400" : "border-slate-400"
              } border`}
            >
              <TextInput
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
    </View>
  );
};

const CheckBox = ({ label, value, rfv, onChange, error, selectedOption }) => {
  const isSelected = selectedOption === value;
  const borderColor = error && !selectedOption ? 'red' : (isSelected ? 'black' : '#DFE3E3');
  return (
    <View className="mb-5 flex-row">
      <Checkbox
        style={{
          width: 25,
          height: 25,
          borderColor
        }}
        value={rfv === value}
        onValueChange={() => onChange(value)}
        className="bg-black/5 self-center border-2 rounded-full"
      />
      <Text className="m-2">{label}</Text>
    </View>
  );
};


export const CustomInputCheckBox = ({ control, name, title, rules = {} }) => {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (onChange,value) => {
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
                onChange={() => handleCheckboxChange(onChange, "sup")}
                rfv={value}
                label="Sup"
                value="sup"
                selectedOption={selectedOption}
              />
              <CheckBox
                error={error}
                onChange={() => handleCheckboxChange(onChange, "dir")}
                rfv={value}
                label="Dir"
                value="dir"
                selectedOption={selectedOption}
              />
              <CheckBox
                error={error}
                onChange={() => handleCheckboxChange(onChange, "doc")}
                rfv={value}
                label="Doc"
                value="doc"
                selectedOption={selectedOption}
              />
              {/* <View className="mb-5 flex-row">
      <Checkbox
        value={value === "sup"}
        onValueChange={() => onChange("sup")}
        className="bg-black/5 self-center rounded-full"
      />
      <Text className="m-2">Sup</Text>
    </View>
    <View className="mb-5 flex-row">
      <Checkbox
        value={value === "doc"}
        onValueChange={() => onChange("doc")}
        className="bg-black/5 self-center rounded-full"
      />
      <Text className="m-2">Doc</Text>
    </View> */}
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
