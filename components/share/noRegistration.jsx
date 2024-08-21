import { Text } from "react-native";


export const NotRegistration = () => {
  return (
    <Text style={{ textAlign: "center", marginTop: 20 }}>Ningún registro</Text>
  );
};


export const NotRegistrationDate = () => {
  return (
    <Text style={{
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      borderRadius:8,
      backgroundColor: "#ea2a3b",
      color: "white",
      paddingVertical: 25,
    }}>
      No hay información disponible para la fecha seleccionada
    </Text>
  );
};

