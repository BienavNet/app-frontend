import { CustomInput } from "../../../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  register,
  update,
} from "../../../../src/utils/schemas/login&registerSchema";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import {
  getSupervisorOne,
  registerSupervisor,
  updateSupervisor,
} from "../../../../src/services/fetchData/fetchSupervisor";
import { useEffect, useState } from "react";
import { HeaderTitle } from "../../../share/titulos/headerTitle";
import { SubmitButton } from "../../../share/button/submitButton";
export const RegistrarSupervisor = ({ navigation, route }) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (route.params && route.params.cedula) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizar Supervisor" });
      (async () => {
        const response = await getSupervisorOne(route.params.cedula);
        console.log(response, "Supervisor response");
        const value = response.find(
          (doc) => doc.cedula === route.params.cedula
        );
        if (value) {
          reset({
            nombre: value.nombre,
            apellido: value.apellido,
            correo: value.correo,
          });
        } else {
          throw new Error("Supervisor no encontrado.");
        }
      })();
    }
  }, [route.params]);
  const onsubmit = async (data) => {
    const { nombre, apellido, correo, cedula, contrasena } = data;
    try {
      if (!editing) {
        await registerSupervisor(nombre, apellido, cedula, correo, contrasena);
        Alert.alert("Register successfully");
      } else {
        console.log("entro a else de editign", route.params.cedula, data);
        await updateSupervisor(route.params.cedula, data);
      }
      reset();
      navigation.navigate("ListScreen");
    } catch (error) {
      console.log("Error object:", error);
      console.log("Error message:", error.message);
      const errorMessage =
        typeof error.message === "string"
          ? error.message
          : JSON.stringify(error);
      console.log("Errormessage:", errorMessage);
      Alert.alert("Error message:", error.message);
    }
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(editing ? update : register),
  });

  return (
    <>
      <HeaderTitle
        editing={editing}
        registerText="Registrar Supervisor"
        updateText="Actualizar Supervisor"
      />
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

          <SubmitButton onPress={handleSubmit(onsubmit)} editing={editing} />
        </View>
      </ScrollView>
    </>
  );
};