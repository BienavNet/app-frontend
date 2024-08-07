import { Text, ScrollView, Alert, View, RefreshControl } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  DeleteDocenteOne,
  getDocenteAll,
  getDocenteOne,
} from "../../../../src/services/fetchData/fetchDocente";
import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ModalComponente } from "../../customModal";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ListDocente = () => {
  const navigation = useNavigation();
  const [docentes, setDocentes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  console.log("selectedDocente", selectedDocente);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDocentes = useCallback(async () => {
    const res = await getDocenteAll();
    setDocentes(res);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDocentes();
    }, [fetchDocentes])
  );
  const handleInfoPress = async (cedula) => {
    try {
      setModalVisible(true);
      const res = await getDocenteOne(cedula);
      const docenteSeleccionado = res.find(
        (docente) => docente.cedula === cedula
      );

      if (docenteSeleccionado) {
        setSelectedDocente(docenteSeleccionado);
      } else {
        console.error("Docente no encontrado");
        setSelectedDocente(null);
      }
    } catch (error) {
      throw new Error("Error fetching the a docente:", error);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDocente(null);
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
              Alert.alert("Error al eliminar el docente");
            }
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDocentes();
    setRefreshing(false);
  }, [fetchDocentes]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#78e08f"]}
          onRefresh={() => {
            onRefresh();
          }}
          progressBackgroundColor="#1371C3"
        />
      }
    >
      {docentes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Ningun registro
        </Text>
      ) : (
        docentes.map((docente, index) => (
          <ListItem.Swipeable
            key={docente.id || index}
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={async () => {
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
              <ListItem.Title>
                <TouchableOpacity
                  className="flex-row"
                  onPress={() => {
                    navigation.navigate("FormScreen", {
                      cedula: docente.cedula,
                    });
                  }}
                >
                  <Text className="font-extrabold text-lg">
                    {capitalizeFirstLetter(docente.nombre)}{" "}
                  </Text>
                  <Text className="font-extrabold text-lg">
                    {capitalizeFirstLetter(docente.apellido)}
                  </Text>
                </TouchableOpacity>
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
        {selectedDocente ? (
          <>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {capitalizeFirstLetter(selectedDocente.nombre)}{" "}
              {capitalizeFirstLetter(selectedDocente.apellido)}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Cédula:{" "}
              <Text className="font-normal">{selectedDocente.cedula}</Text>
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Correo:{" "}
              <Text className="font-normal">{selectedDocente.correo}</Text>
            </Text>
          </>
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
        {/* {selectedDocente.length > 0 ? (
          <>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {capitalizeFirstLetter(selectedDocente[0].nombre)}{" "}
              {capitalizeFirstLetter(selectedDocente[0].apellido)}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Cédula:{" "}
              <Text className="font-normal">{selectedDocente[0].cedula}</Text>
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Correo:{" "}
              <Text className="font-normal">{selectedDocente[0].correo}</Text>
            </Text>
          </>
        ) : (
          <Text>No hay datos disponibles</Text>
        )} */}
      </ModalComponente>
    </ScrollView>
  );
};
