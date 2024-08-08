import { CustomInput } from "../share/inputs/customInput";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import { useEffect, useState } from "react";

export const RegistrarForm = ({
  title,
  schema,
  onSubmit,
  fields,
  submitButtonLabel,
  editMode,
  navigation,
  route,
}) => {
  const [editing, setEditing] = useState(editMode);
  const toast = useToast();

  
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data, editing);
      reset();
      navigation.navigate("ListScreen");
      ToastSuccess(editing ? "Actualizado correctamente" : "Registrado correctamente");
    } catch (error) {
      ToastError(error.message);
    }
  };

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
          throw new Error('Docente no encontrado.');
        }
      })();
    }
  }, [route.params]);

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
  } = useForm({
    resolver: yupResolver(schema)
  });



  return (
    <>
      <View className="py-2" style={{ backgroundColor: "#F2F2F0" }}>
        <Text className="text-lg text-center font-bold">
          {title}
        </Text>
      </View>
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-left mx-4 space-y-3 h-full">
          {fields.map((field, index) => (
            <CustomInput
              key={index}
              variant="outlined"
              name={field.name}
              control={control}
              placeholder={field.placeholder}
              label={field.label}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              rules={field.rules}
              icon={field.icon}
            />
          ))}

          <View className="w-full pt-3">
            <TouchableOpacity
              onPress={handleSubmit(handleFormSubmit)}
              className={`w-11/12 self-center p-3 rounded-lg ${editing ? "bg-amber-600" : "bg-lime-600"}`}
            >
              <Text className="text-white text-center font-bold text-xl">
                {submitButtonLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
