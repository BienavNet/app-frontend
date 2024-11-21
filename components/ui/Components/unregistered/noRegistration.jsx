import { Text, View } from "react-native";

const COLORED="#ea2a3b";

export const NotRegistration = () => {
  return (
    <Text
      style={{
        textAlign: "center",
        marginTop: 20,
        color:COLORED,
        fontSize: 16,
      }}
    >
      Ningún registro
    </Text>
  );
};

export const NotRegistrationDate = () => {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        borderRadius: 8,
        backgroundColor: COLORED,
        color: "white",
        paddingVertical: 25,
      }}
    >
      No hay información disponible para la fecha seleccionada
    </Text>
  );
};

export const NofilterSelected = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          color: COLORED,
          padding: 10,
          fontSize: 16,
          fontWeight: "semibold",
          textAlign: "center",
        }}
      >
        No hay resultados para el filtro seleccionado.
      </Text>
    </View>
  );
};

export const RenderEmptyDate = () => {
  return (
    <View style={{ height: 15, flex: 1, padding: 20 }}>
      <Text> No hay evento planeado para este dia.</Text>
    </View>
  );
};

export function EmptyNotification (){
  return(
    <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: COLORED,
        }}>No hay notificaciones para mostrar.</Text>
      </View>
  )
}