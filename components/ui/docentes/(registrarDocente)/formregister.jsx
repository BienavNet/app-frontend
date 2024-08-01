import { CustomInput } from "../../../share/inputs/customInput";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { TextInput } from "@react-native-material/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../../../src/utils/schemas/login&registerSchema";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

export const RegistrarDocente = () => {



  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(register),
  });

  const onsubmit = async (data) => {
    
    try {
      // await login(correo, contrasena, rol);
      // console.log("isAutenticated ", isAuthenticated + " user return ", user);
      // if (user) {
      //   ToastSuccess("login successfully")
      //   console.log("user -->", user);
      //  router.push("/home")
      // }
    } catch (error) {
      //  ToastError(error.message);
    }
  };

  return (
    <>
   <View className="py-5" style={{ backgroundColor: "#F2F2F0" }}>
    <Text className="text-lg text-center font-bold">
      Registra un docente
    </Text>
   </View> 
    <ScrollView className="pt-2" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex items-left mx-4 space-y-4 h-full">
       
       <View className="p-1">
       <CustomInput
        control={control}
          placeholder="123456789"
          className="text-buttonColor"
          keyboardType="numeric"
          label="Cedula"
          icon={(props) => (
            <FontAwesome6 name="id-badge" size={24} color="black" {...props} />
          )}
        />
       </View>
       
       <View className="flex-row justify-items-stretch">
       
       <View className="w-1/2 justify-self-start p-1">
       <CustomInput
       control={control}
          placeholder="Ejemplo:Juan"
          label="Nombre"
          icon={(props) => (
            <FontAwesome6
              name="user-circle"
              size={24}
              color="black"
              {...props}
            />
          )}
        />
       </View>

       <View  className="w-1/2 justify-self-end p-1">
       <CustomInput
        control={control}
          placeholder="Ejemplo: Martinez"
          label="Apellidos"
        />
       </View>
       </View>

        <View className="p-1">
        <CustomInput
         control={control}
          placeholder="example@example.com"
          keyboardType="email-address"
          label="Correo Electronico"
          icon={(props) => (
            <MaterialIcons
              name="alternate-email"
              size={24}
              color="black"
              {...props}
            />
          )}
        />

        </View>
        
        <View className="p-1">
        <CustomInput
          label="Contraseña"
          placeholder="password"
          secureTextEntry={true}
          icon={(props) => (
            <MaterialIcons name="password" size={24} color="black" {...props} />
          )}
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
