import { Alert } from "react-native";

export const handleDeletePress = (docenteId) => {
    Alert.alert(
      "Eliminar Docente",
      "¿Estás seguro de que deseas eliminar este docente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDocenteById(docenteId);
              setDocentes(docentes.filter(docente => docente.id !== docenteId));
              Alert.alert("Docente eliminado con éxito");
            } catch (error) {
              console.error("Error deleting docente:", error);
              Alert.alert("Error al eliminar el docente");
            }
          }
        }
      ]
    );
  };