import { useState } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "@react-native-material/core";

export const MultilineTextInput = ({
  numberOfLines = 10,
  placeholder,
  control,
  name,
  errors,
}) => {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 255;
  console.log("charCount:" + charCount);
  const handleTextChange = (text) => {
    setCharCount(text.length); // Contamos los caracteres del texto
    return text;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          style={{
            flex:1,
          }}
        >
          <TextInput
            style={[
              styles.MultilineText,
              {
                height:110,
              },
            ]}
            autoCorrect={false}
            autoCapitalize="none"
            color={`${error ? "red" : "#1371C3"}`}
            // className={`bg-black/5  w-full ${
            //   error ? "border-red-500" : "border-slate-400"
            // } border`}
            variant="outlined"
            editable
            placeholder={placeholder}
            placeholderTextColor="blue"
            autoComplete="off"
            multiline
            onChangeText={(text) => {
              if (text.length <= maxLength) {
                handleTextChange(text); // Actualizamos el conteo de caracteres
                onChange(text); // Pasamos el texto actualizado al formulario
              }
            }}
            onBlur={onBlur}
            value={value}
            numberOfLines={numberOfLines}
            inputContainerStyle={{
              borderRadius: 8,
              borderBottomColor: error ? "red" : null,
              borderBottomWidth: error ? 2 : null,
            }}
          />

          {/* Contador de caracteres */}
          <View
            className="flex-row justify-end"
            style={{
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <Text style={{ color: "black", fontSize: 14 }}>
              {charCount} / {maxLength} caracteres
            </Text>
          </View>

          {errors && (
            <Text style={{ color: "red", fontSize: 16 }}>{errors.message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  MultilineText: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});