import { TouchableOpacity, View, Text, ScrollView , Alert} from "react-native";
import { CustomInput, CustomInputCheckBox } from "../share/inputs/customInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { loging } from "../../src/utils/schemas/login&registerSchema";
import {useAuth} from "../../src/hooks/useAuth"
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
function formLogin() {

  const { login} = useAuth();

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loging),
  });

  const onsubmit = async (data) => {
    try {
      await login(data.correo, data.constrasena);
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", errors);
      
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
          name="correo"
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
          name="contrasena"
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
            <Text 
            className="text-white text-center font-bold text-xl">
              Inicia Sesion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default formLogin;
