import { Alert } from "react-native";
import { Snackbar } from "@react-native-material/core";

export const DeleteConfirmation = ({ nameDelete, onPress }) => {
  () => {
    Alert.alert(
      `Eliminar ${nameDelete}`,
      `¿Estás seguro de que deseas eliminar este  ${nameDelete}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await onPress();
              <Snackbar
                message={`${nameDelete}, Eliminado con exito.`}
                style={{
                  position: "absolute",
                  start: 16,
                  end: 16,
                  bottom: 16,
                  backgroundColor: "green",
                }}
              />;
            
            } catch (error) {
              <Snackbar
                message={`Error al eliminar ${nameDelete}.` + error}
                style={{
                  position: "absolute",
                  start: 16,
                  end: 16,
                  bottom: 16,
                  backgroundColor: "red",
                }}
              />;
            }
          },
        },
      ]
    );
  };
  return null;
};
