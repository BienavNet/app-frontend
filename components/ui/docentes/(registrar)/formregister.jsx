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
} from "../../../../src/services/fetchData/fetchDocente";
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
  } = useForm({
    resolver: yupResolver(editing ? update : register),
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
                    name="nombre"
                  />
                </View>

                <View className="w-1/2 justify-self-end">
                  <CustomInput
                    variant="outlined"
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
                 
                />
              </View>

              <View>
                <CustomInput
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
                   
                    name="nombre"
                  />
                </View>

                <View className="w-1/2 justify-self-end">
                  <CustomInput
                    variant="outlined"
                   
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
