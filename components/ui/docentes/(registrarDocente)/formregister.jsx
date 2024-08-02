import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../../../src/utils/schemas/login&registerSchema";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { registerDocente} from "../../../../src/services/fetchDocente"
import { useToast } from "react-native-toast-notifications";

export const RegistrarDocente = () => {
  const toast = useToast();
  const ToastSuccess = (message) => {
    toast.show(message, {
      icon: <Feather name="check-circle" size={30} color="green" />,
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(register),
  });

  const onsubmit = async (data) => {
    const { nombre, apellido, correo, cedula, contrasena} = data;
    try {
      await registerDocente(nombre, apellido, cedula,correo, contrasena);
      ToastSuccess("login successfully")
      reset();
    } catch (error) {
      ToastError(error.message);
    }
  };

  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        <Text className="text-lg text-center font-bold">
          Registra un docente
        </Text>
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 space-y-3 h-full">
          <View>
            <CustomInput
             variant="outlined"
              rules={{
                required: "cedula es requerido",
                minLength: {
                  value: 8,
                  message: "Cedula debe ser mínimo 8 character",
                },
                maxLength: {
                  value: 10,
                  message: "Cedula debe ser maximo 10 character",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Cedula no es válido",
                },
              }}
              name="cedula"
              control={control}
              placeholder="123456789"
              className="text-buttonColor"
              keyboardType="numeric"
              label="Cedula"
              icon={<FontAwesome6 name="id-badge" size={24} color="black" />}
            />
          </View>

          <View className="flex-row justify-items-stretch">
            <View className="w-1/2 justify-self-start">
              <CustomInput
               variant="outlined"
                control={control}
                placeholder="example"
                label="Nombre"
                icon={
                  <FontAwesome6 name="user-circle" size={24} color="black" />
                }
                rules={{
                  required: "nombre es requerido",
                  minLength: {
                    value: 4,
                    message: "Nombre debe ser mínimo 4 character",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Nombre no es válido",
                  },
                }}
                name="nombre"
              />
            </View>

            <View className="w-1/2 justify-self-end">
              <CustomInput
               variant="outlined"
                rules={{
                  required: "apellido es requerido",
                  minLength: {
                    value: 4,
                    message: "Apellido debe ser mínimo 4 character",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Apellido no es válido",
                  },
                }}
                name="apellido"
                control={control}
                placeholder="example"
                label="Apellido"
              />
            </View>
          </View>

          <View>
            <CustomInput
             variant="outlined"
              name="correo"
              control={control}
              placeholder="example@example.com"
              keyboardType="email-address"
              label="Correo Electronico"
              icon={
                <MaterialIcons name="alternate-email" size={24} color="black" />
              }
              rules={{
                required: "Correo Electronico es requerido",
                minLength: {
                  value: 4,
                  message: "Correo debe ser mínimo 4 character",
                },
                maxLength: {
                  value: 100,
                  message: "Correo debe ser maximo 100 character",
                },
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "Correo no es válido",
                },
              }}
            />
          </View>

          <View>
            <CustomInput
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
                  message:
                    "Debe incluir mayúscula, minúscula, número y símbolo",
                },
              }}
              variant="outlined"
              name="contrasena"
              control={control}
              label="Contraseña"
              placeholder="password"
              secureTextEntry={true}
              icon={<MaterialIcons name="password" size={24} color="black" />}
            />
          </View>

          <View className="w-full pt-3">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className="w-full self-center bg-textPrincipal p-3 rounded-2xl"
            >
              <Text className="text-white text-center font-bold text-xl">
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
