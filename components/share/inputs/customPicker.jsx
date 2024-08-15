import { Text } from "react-native";
import { Controller } from "react-hook-form";
import Dropdown from "../dropDown/dropDown"

export const CustomPiker = ({ name, control, errors, placeholder, data }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Dropdown
            error={errors}
            data={data}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          {errors && (
            <Text style={{ color: "red", fontSize: 16, padding:4}}>{errors.message}</Text>
          )}
        </>
      )}
    />
  );
};
