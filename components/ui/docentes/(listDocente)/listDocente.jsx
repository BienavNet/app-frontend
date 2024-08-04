import { Text, ScrollView, Alert } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  DeleteDocenteOne,
  getDocenteAll,
  getDocenteOne,
} from "../../../../src/services/fetchDocente";
import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { useFocusEffect } from "@react-navigation/native";
import { ModalComponente } from "../../modal";
export const ListDocente = () => {
  const [docentes, setDocentes] = useState([]);
  console.log(" docentes", docentes);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState({});
  // console.log("selectedDocente", selectedDocente);

  const fetchDocentes = useCallback(async () => {
    try {
      const res = await getDocenteAll();
      setDocentes(res);
    } catch (error) {
      throw new Error("Error fetching docentes:", error);
    }
  }, []);

  // const fetchDocente =async (cedula) => {
  //   try {
  //     const res = await getDocenteOne(cedula);
  //     setSelectedDocente(res);
  //     setModalVisible(true);
  //     console.log("res", res);
  //   } catch (error) {
  //     throw new Error("Error fetching the a docente:", error);
  //   }
  // }

  useFocusEffect(
    useCallback(() => {
      fetchDocentes();
    }, [fetchDocentes])
  );

  const handleInfoPress = async (cedula) => {
    try {
          const res = await getDocenteOne(cedula);
          setSelectedDocente(res);
          setModalVisible(true);
          console.log("res", res);
        } catch (error) {
          throw new Error("Error fetching the a docente:", error);
        }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDocente({});
  };
  const handleDeletePress = (docenteId) => {
    Alert.alert(
      "Eliminar Docente",
      "¿Estás seguro de que deseas eliminar este docente?",
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
              await DeleteDocenteOne(docenteId);
              setDocentes(
                docentes.filter((docente) => docente.cedula !== docenteId)
              );
              Alert.alert("Docente eliminado con éxito");
            } catch (error) {
              console.error("Error deleting docente:", error);
              Alert.alert("Error al eliminar el docente");
            }
          },
        },
      ]
    );
  };
  return (
    <ScrollView>
      {docentes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          {" "}
          Ningun registro
        </Text>
      ) : (
        docentes.map((docente, index) => (
          <ListItem.Swipeable
            key={docente.id || index}
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={
                  async () => {
                  reset();
                  await handleInfoPress(docente.cedula);
                }}
                icon={{ name: "info", color: "white" }}
                buttonStyle={{ minHeight: "100%" }}
              />
            )}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => {
                  reset();
                  handleDeletePress(docente.cedula);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )}
          >
            <Icon name="account" size={25} color="black" />
            <ListItem.Content>
              <ListItem.Title className="font-extrabold text-lg">
                {capitalizeFirstLetter(docente.nombre)}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      )}
      <ModalComponente
        transparent={true}
        animationType={"slider"}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
      >
          {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {capitalizeFirstLetter(selectedDocente.nombre)}{" "}
          {capitalizeFirstLetter(selectedDocente.apellido)}
        </Text>
        <Text>Cédula: {selectedDocente.cedula}</Text>
        <Text>Correo: {selectedDocente.correo}</Text> */}
      </ModalComponente>
    </ScrollView>
  );
};
