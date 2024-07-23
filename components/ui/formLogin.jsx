import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { CustomInput, CustomInputCheckBox } from "../share/inputs/customInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../utils/schemas/login&registerSchema";
import { useForm } from "react-hook-form";

function formLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login),
  });

  const onsubmit = (data) => {
    // Add logic here to handle form submission

    Navigation.navigate("Dashboard");
    {
      Alert.alert("Data");
    }
  };

  return (
    <ScrollView className="pb-10">
      <View className="flex items-left mx-4 space-y-4">
        <CustomInput
          label="Cedula"
          control={control}
          name="cedula"
          placeholder="1234567890"
          rules={{
            required: false,
            minLength: {
              value: 10,
              message: "Cedula debe ser mínimo 10 character",
            },
            maxLength: {
              value: 10,
              message: "Cedula debe ser maximo 10 character",
            },
          }}
          keyBoardType="numeric"
        />
        {/* {errors.cedula && errors.cedula.message} */}

        <CustomInput
          label="Correo Electronico"
          control={control}
          rules={{
            required: "Correo Electronico es requerido",
            minLength: {
              value: 4,
              message: "Correo debe ser mínimo 4 character",
            },
            pattern: {
              value:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "Correo no es válido",
            },
          }}
          name="email"
          placeholder="Example@example.com"
          keyBoardType="email-address"
        />
        {/* {errors.email && errors.email.message} */}

        <CustomInput
          label="password"
          rules={{
            required: "Este campo es requerido",
            minLength: {
              value: 4,
              message: "Password debe ser mínimo 4 character",
            },
            maxLength: {
              value: 16,
              message: "Password debe ser maximo 16 character",
            },
            pattern: {
              value:
                /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,16}$/,
              message: "Debe incluir mayúscula, minúscula, número y símbolo",
            },
          }}
          control={control}
          name="password"
          placeholder="********"
          secureTextEntry={true}
        />

        {/*checkbox*/}
        <CustomInputCheckBox
          rules={{
            required: true,
          }}
          control={control}
          name="checkebox"
          title="Soy un"
        />
        <View className="w-full">
          <TouchableOpacity
            onPress={handleSubmit(onsubmit)}
            className="w-full bg-textPrincipal p-3 rounded-2xl mb-3"
          >
            <Text className="text-white text-center font-bold text-xl">
              Inicia Sesion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default formLogin;
