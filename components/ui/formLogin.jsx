import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { CustomInput, CustomInputCheckBox } from "../share/inputs/customInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { loging } from "../../src/utils/schemas/login&registerSchema";
import { useAuth } from "../../src/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useToast } from "react-native-toast-notifications";
import { useEffect } from "react";

function FormLogin() {
  const router = useRouter();
  const toast = useToast();
  const { login, user, isAuthenticated } = useAuth();

  const ToastSuccess = (message) => {
      toast.show(message, {
        icon: <Feather name="check-circle" size={30} color="green"/>,
        style: {
          backgroundColor: "green",
          borderColor: "green",
        },
        type: "Success",
        duration: 3000,
        successColor: "green",
        textStyle: {
          fontSize: 16,
          color: "white",
        },
        animationType: "zoom-in",
      });
    };

  const ToastError = (error) => {
        toast.show(error, {
          icon: <MaterialIcons name="error" size={30} color="#ffffff" />,
          style: {
            backgroundColor: "red",
            borderColor: "red",
          },
          type: "Error",
          duration: 1000,
          dangerColor: "red",
          textStyle: {
            fontSize: 16,
            color: "white",
          },
          animationType: "zoom-in",
        });
    };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loging),
  });

  const onsubmit = async (data) => {
    console.log("Data recibida", JSON.stringify(data));
    const { correo, contrasena, rol } = data;
    try {
      await login(correo, contrasena, rol);
      console.log("isAutenticated ", isAuthenticated + " user return ", user);
      if (user) {
        ToastSuccess("login successfully")
        console.log("user -->", user);
       router.push("/home")
      }
      
    } catch (error) {
   ToastError(error.message);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/home");
    }
  }, [isAuthenticated, user]);
  return (
    <>
      <ScrollView className="pb-10">
        <View className="flex items-left mx-4 space-y-4">
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
            name="rol"
            title="Soy un"
          />
          <View className="w-full">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className="w-full bg-textPrincipal p-3 rounded-2xl mb-3"
            >
              <Text className="text-white text-center font-bold text-xl">
                Iniciar Sesion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default FormLogin;
