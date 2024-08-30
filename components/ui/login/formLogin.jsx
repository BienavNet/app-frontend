import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import {
  CustomInput,
  CustomInputCheckBox,
} from "../../share/inputs/customInput";
import { loging } from "../../../src/utils/schemas/login&registerSchema";
import { useAuth } from "../../../src/hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useToastMessage from "../../share/ToasNotification";
import { useEffect, useState } from "react";
export const FormLogin = () => {
  const { showToast, APP_STATUS, STATUS_MESSAGES } = useToastMessage();
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  console.log(user, "user en login test");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loging),
  });

  const [isLoading, setIsLoading] = useState(true);
  const onsubmit = async (data) => {
    const { correo, contrasena, rol } = data;
    if (!correo || !contrasena || !rol) {
      showToast({
        message: "Por favor complete todos los campos.",
        type: "danger",
        id: APP_STATUS.ERROR,
      });
      return;
    }
    try {
      await login(correo, contrasena, rol);
      showToast({
        message: STATUS_MESSAGES[APP_STATUS.SUCCESS],
        type: "success",
        id: APP_STATUS.SUCCESS,
      });
      if (user) {
        showToast({
          message: STATUS_MESSAGES[APP_STATUS.SUCCESS],
          type: "success",
          id: APP_STATUS.SUCCESS,
        });
        router.push("/home");
      }
      reset();
    } catch (error) {
      reset();
      showToast({
        message: error.message,
        type: "danger",
        id: APP_STATUS.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user) {
        router.push("/home");
      }
    }
  }, [isAuthenticated, user]);
  return (
    <>
      <ScrollView className="pb-10">
        <View className="flex items-left mx-4 space-y-6">
          <CustomInput
            error={errors.correo}
            icon={<FontAwesome6 name="user-circle" size={24} color={`${errors.correo ? 'red' : '#92c3ed'}`} />}
            label="Correo Electronico"
            control={control}
            name="correo"
            placeholder="Example@example.com"
            keyBoardType="email-address"
          />
          <CustomInput
            error={errors.contrasena}
            label="password"
            icon={<MaterialIcons name="password" size={24} color={`${errors.contrasena ? 'red' : '#92c3ed'}`} />}
            control={control}
            name="contrasena"
            placeholder="********"
            secureTextEntry={true}
          />
          {/*checkbox*/}
          <CustomInputCheckBox
            control={control}
            name="rol"
            title="Soy un"
            error={errors.rol}
          />
          <View className="w-full">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className="w-11/12 self-center bg-textPrincipal p-3 rounded-2xl mb-3"
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
};
