import { View, ScrollView } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getDocenteAll } from "../../../../src/services/fetchDocente";
import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../../../src/utils/functiones/functions";

export const ListDocente = () => {
  const [docentes, setDocentes] = useState([]);
  useEffect(() => {
    getDocenteAll().then((res) => {
      setDocentes(res);
    });
  }, []);

  return (
    <ScrollView>
      <ListItem.Swipeable
        leftContent={(reset) => (
          <Button
            title="Info"
            onPress={() => reset()}
            icon={{ name: "info", color: "white" }}
            buttonStyle={{ minHeight: "100%" }}
          />
        )}
        rightContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => reset()}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        )}
      >
        {docentes.map((docente) => (
          <>
            <Icon name="account" size={25} color="black" />
            <ListItem.Content key={docente.id}>
              <ListItem.Title className="font-extrabold text-lg">
                {capitalizeFirstLetter(docente.nombre)}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </>
        ))}
      </ListItem.Swipeable>
    </ScrollView>
  );
};
