import { CustomInput } from "../../../share/inputs/customInput";
import { View, ScrollView, Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SubmitButton } from "../../../share/button/submitButton";
import { HeaderTitle } from "../../../share/titulos/headerTitle";

export const RegistrarEntidad = ({
  navigation,
  route,
  tipoEntidad,
  getEntidadOne,
  registerEntidad,
  updateEntidad,
  schema,
}) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (route.params && route.params.cedula) {
      setEditing(true);
      navigation.setOptions({ headerTitle: `Actualizar ${tipoEntidad}` });
      (async () => {
        const response = await getEntidadOne(route.params.cedula);
        const entidad = response.find(
          (ent) => ent.cedula === route.params.cedula
        );
        if (entidad) {
          reset({
            nombre: entidad.nombre,
            apellido: entidad.apellido,
            correo: entidad.correo,
          });
        } else {
          throw new Error(`${tipoEntidad} no encontrado.`);
        }
      })();
    }
  }, [route.params]);

  const toast = useToast();
  const ToastSuccess = (message) => {
    toast.show(message, {
      icon: <FontAwesome6 name="check-circle" size={30} color="green" />,
      style: {
        backgroundColor: "green",
        borderColor: "green",
      },
      type: "Success",
      duration: 3000,
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
      textStyle: {
        fontSize: 16,
        color: "white",
      },
      animationType: "zoom-in",
    });
  };

  const onsubmit = async (data) => {
    const { nombre, apellido, correo, cedula, contrasena } = data;
    try {
      if (!editing) {
        await registerEntidad(nombre, apellido, cedula, correo, contrasena);
        ToastSuccess("Registro exitoso");
      } else {
        await updateEntidad(route.params.cedula, data);
      }
      reset();
      navigation.navigate("ListScreen");
    } catch (error) {
      ToastError(error.message || JSON.stringify(error));
    }
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(editing ? schema.update : schema.register),
  });

  return (
    <>
      <HeaderTitle
        editing={editing}
        registerText={`Registrar ${tipoEntidad}`}
        updateText={`Actualizar ${tipoEntidad}`}
      />
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 space-y-3 h-full">
          {!editing && (
            <View>
              <CustomInput
                variant="outlined"
                name="cedula"
                control={control}
                placeholder="123456789"
                className="text-buttonColor"
                keyboardType="numeric"
                label="Cédula"
                icon={<FontAwesome6 name="id-badge" size={24} color="black" />}
              />
            </View>
          )}
          <View className="flex-row justify-items-stretch">
            <View className="w-1/2 justify-self-start">
              <CustomInput
                variant="outlined"
                control={control}
                placeholder="Nombre"
                label="Nombre"
                icon={
                  <FontAwesome6 name="user-circle" size={24} color="black" />
                }
                name="nombre"
              />
            </View>
            <View className="w-1/2 justify-self-end">
              <CustomInput
                variant="outlined"
                name="apellido"
                control={control}
                placeholder="Apellido"
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
              label="Correo Electrónico"
              icon={
                <MaterialIcons name="alternate-email" size={24} color="black" />
              }
            />
          </View>
          {!editing && (
            <View>
              <CustomInput
                variant="outlined"
                name="contrasena"
                control={control}
                label="Contraseña"
                placeholder="password"
                secureTextEntry={true}
                icon={<MaterialIcons name="password" size={24} color="black" />}
              />
            </View>
          )}
          <SubmitButton onPress={handleSubmit(onsubmit)} editing={editing} />
        </View>
      </ScrollView>
    </>
  );
};
