import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { register, update } from "../../../../src/utils/schemas/login&registerSchema";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import {
  getDocenteOne,
  registerDocente,
  updateDocente,
} from "../../../../src/services/fetchDocente";
import { useToast } from "react-native-toast-notifications";
import { useEffect, useState } from "react";
export const RegistrarDocente = ({ navigation, route }) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
   
    if (route.params && route.params.cedula) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizar docente" });
      (async () => {
        const response = await getDocenteOne(route.params.cedula);
        const docente = response.find(doc => doc.cedula === route.params.cedula);
        if (docente) {
        reset({
          nombre: docente.nombre,
          apellido: docente.apellido,
          correo: docente.correo,
        });
      } else {  
        throw new Error('Docente no encontrado.')
      }
      })();
    }
  }, [route.params]);

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
  const onsubmit = async (data) => {
    const { nombre, apellido, correo, cedula, contrasena} = data;
    try {
      if (!editing) {
        await registerDocente(nombre, apellido, cedula, correo, contrasena);
        ToastSuccess("register successfully");
      } else {
        console.log("entro a else de editign", route.params.cedula, data);
        await updateDocente(route.params.cedula, data);
      }
      reset();
      navigation.navigate("ListScreen");
    } catch (error) {
      console.log("Error object:", error); 
      console.log("Error message:", error.message); 
      const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error);
      console.log("Errormessage:", errorMessage);
      ToastError(error.message);
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editing ? update:register),
  });

  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        {!editing ? (
          <Text className="text-lg text-center font-bold">
            Registrar docente
          </Text>
        ) : (
          <Text className="text-lg text-center font-bold">
            Actualizar docente
          </Text>
        )}
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 space-y-3 h-full">
          {!editing ? (
            <>
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
                  icon={
                    <FontAwesome6 name="id-badge" size={24} color="black" />
                  }
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
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
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
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
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
                  icon={
                    <MaterialIcons name="password" size={24} color="black" />
                  }
                />
              </View>
            </>
          ) : (
            <>
              <View className="flex-row justify-items-stretch">
                <View className="w-1/2 justify-self-start">
                  <CustomInput
                    variant="outlined"
                    control={control}
                    placeholder="example"
                    label="Nombre"
                    icon={
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
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
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
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
            </>
          )}

          <View className="w-full pt-3">
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              className={`w-11/12 self-center p-3 rounded-lg ${
                !editing ? "bg-lime-600" : "bg-amber-600"
              }`}
            >
              <Text className="text-white text-center font-bold text-xl">
                {!editing ? "Registrar" : "Actualizar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
