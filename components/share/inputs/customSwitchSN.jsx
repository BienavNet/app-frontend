import { Text, View, Switch } from "react-native";
import { Controller } from "react-hook-form";
export const CustomSwitch = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return(
          <View className="flex-row justify-between items-center w-[80%]">
          <Text className="text-base ">{label}</Text>
          <View className="flex-row items-center">
            <Text>{value === "si" ? "Si" : "No"}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#C0C0C0" }}
              thumbColor={value === "si" ? "#00BFFF" : "red"}
              value={value === "si" }
              onValueChange={(newValue) => onChange(newValue ? "si" : "no")}
            />
          </View>
        </View>
        )
      }}
    />
  );
};
