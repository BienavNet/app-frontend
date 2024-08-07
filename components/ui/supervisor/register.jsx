import { RegistrarForm } from '../customForm';
import { registerSupervisor, updateSupervisor } from '../../../src/services/fetchData/fetchSupervisor';
import {register , update } from '../../../src/utils/schemas/login&registerSchema'
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const RegistrarSupervisor = ({ navigation, route }) => {

  const onSubmit = async (data, editing) => {
    if (!editing) {
      await registerSupervisor(data.nombre, data.apellido, data.cedula, data.correo, data.contrasena);
    } else {
      await updateSupervisor(route.params.cedula, data);
    }
  };

  return (
    <RegistrarForm
      title={route.params && route.params.cedula ? "Actualizar Supervisor" : "Registrar Supervisor"}
      schema={route.params && route.params.cedula ? update : register}
      onSubmit={onSubmit}
      initialValues={route.params ? { 
        nombre: route.params.nombre || '', 
        apellido: route.params.apellido || '', 
        correo: route.params.correo || '', 
        cedula: route.params.cedula || '' 
      } : {}}
      fields={[
        {
          name: "cedula",
          placeholder: "123456789",
          label: "Cedula",
          keyboardType: "numeric",
          rules: {
            required: "cedula es requerido",
            // minLength: { value: 8, message: "Cedula debe ser mínimo 8 character" },
            // maxLength: { value: 10, message: "Cedula debe ser maximo 10 character" },
            // pattern: { value: /^[0-9]+$/, message: "Cedula no es válido" },
          },
          icon: <FontAwesome6 name="id-badge" size={24} color="black" />,
        },
        {
          name: "nombre",
          placeholder: "example",
          label: "Nombre",
          rules: {
            required: "nombre es requerido",
            minLength: { value: 4, message: "Nombre debe ser mínimo 4 character" },
            pattern: { value: /^[A-Za-z]+$/, message: "Nombre no es válido" },
          },
          icon: <FontAwesome6 name="user-circle" size={24} color="black" />,
        },
        {
          name: "apellido",
          placeholder: "example",
          label: "Apellido",
          rules: {
            required: "apellido es requerido",
            minLength: { value: 4, message: "Apellido debe ser mínimo 4 character" },
            pattern: { value: /^[A-Za-z]+$/, message: "Apellido no es válido" },
          },
        },
        {
          name: "correo",
          placeholder: "example@example.com",
          keyboardType: "email-address",
          label: "Correo Electronico",
          rules: {
            required: "Correo Electronico es requerido",
            minLength: { value: 4, message: "Correo debe ser mínimo 4 character" },
            maxLength: { value: 100, message: "Correo debe ser maximo 100 character" },
            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Correo no es válido" },
          },
          icon: <MaterialIcons name="alternate-email" size={24} color="black" />,
        },
        {
          name: "contrasena",
          placeholder: "password",
          secureTextEntry: true,
          label: "Contraseña",
          rules: {
            required: "Este campo es requerido",
            minLength: { value: 4, message: "Password debe ser mínimo 4 character" },
            maxLength: { value: 16, message: "Password debe ser maximo 16 character" },
            pattern: {
              value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,16}$/,
              message: "Debe incluir mayúscula, minúscula, número y símbolo",
            },
          },
          icon: <MaterialIcons name="password" size={24} color="black" />,
        },
      ]}
      submitButtonLabel={route.params && route.params.cedula ? "Actualizar" : "Registrar"}
      editMode={!!route.params?.cedula}
      navigation={navigation}
      route={route}
    />
  );
};
