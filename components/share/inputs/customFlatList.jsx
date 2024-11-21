import { Text } from "react-native";
import { Controller } from "react-hook-form";
import DropdownModal from "../../share/dropDown/dropDownModal";

export const CustomFlatList = ({
  name,
  control,
  errors,
  placeholder,
  data,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <DropdownModal
           name={name}
            error={errors}
            value={value}
            data={data}
            placeholder={placeholder}
            onChange={onChange}
          />
          {errors && (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                paddingTop: 14,
                paddingLeft: 4,
              }}
            >
              {errors.message}
            </Text>
          )}
        </>
      )}
    />
  );
};
