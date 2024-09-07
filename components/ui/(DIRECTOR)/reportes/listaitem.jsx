import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../src/utils/functiones/functions";
import { DateChip } from "./components/DateChip";
import { ColorItem } from "../../../styles/StylesGlobal";

const ListItem = ({ data, onPress, selectedOption }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.itemInfo}>
        {selectedOption === "salones" && (
          <Text style={styles.itemP1}>
            {data.numero_salon} {"-"} {capitalizeFirstLetter(data.nombre)}
          </Text>
        )}
        {selectedOption === "clases" && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <Text style={styles.itemP2}>
                {truncateText(data.asignatura, 14)} {"-"} {data.numero_salon}
              </Text>
              <DateChip 
             item={new Date(data.fecha).toLocaleDateString()}
              />
            </View>
            <Text style={styles.itemP1}>
              {capitalizeFirstLetter(data.docente_nombre)}{" "}
              {capitalizeFirstLetter(data.docente_apellido)}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorItem.DeepFir,
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemInfo: {
    marginLeft: 20,
  },
  itemP1: {
    fontSize: 16,
    color: "black",
  },
  itemP2: {
    fontSize: 18,
    color: "black",
  },
});

export default ListItem;
