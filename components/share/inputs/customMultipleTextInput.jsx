import { useState } from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "@react-native-material/core";

export const MultilineTextInputExample = ({
  numberOfLines,
  maxLength,
  onChangeText,
  value,
  control,
  name,
  errors,
}) => {
  //   const [value, onChangeText] =useState('Useless Multiline Placeholder');

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className="p-2">
            <TextInput
            color={`${error ? 'red' : '#1371C3'}`}
            className={`bg-black/5 rounded-xl w-full ${
             error ? "border-red-500" : "border-slate-400"} border`}
             variant="outlined"
              editable
              placeholder="seleccione aqui."
              placeholderTextColor='blue'
              autoComplete="off"
              multiline
              numberOfLines={numberOfLines}
              maxLength={maxLength}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputContainerStyle={{
                borderBottomColor: error ? "red" : null,
                borderBottomWidth: error ? 2 : null,
              }}
              style={[
                {
                  padding: 10,
                },
              ]}
            />
            {/* <TextInput
          inputContainerStyle={{
            borderBottomColor: error ? "red" : null, // Borde inferior rojo si hay error
            borderBottomWidth:error ? 2 : null,
          }}
           color={`${error ? 'red' : '#1371C3'}`}
           className={`bg-black/5 rounded-xl w-full ${
            error ? "border-red-500" : "border-slate-400"} border`}
            variant={variant}
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
          /> */}
          </View>
          {errors && (
            <Text style={{ color: "red", fontSize: 16 }}>{errors.message}</Text>
          )}
        </>
      )}
    />
  );
};
