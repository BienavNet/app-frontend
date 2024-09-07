import { FlatList, View, Text, StyleSheet } from "react-native";
import { BoxView } from "../../components/customBoxView";
import { capitalizeFirstLetter, truncateText } from "../../../../../src/utils/functiones/functions";
import { FontAwesome } from "@expo/vector-icons";
import { StatusCircle } from "../components/StatusCircle";
import { DateChip } from "../components/DateChip";

export const ListFilter = ({ additionalData }) => {
  return (
    <>
      <FlatList
        data={additionalData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BoxView>
            <View style={styles.row}>
              <Text style={styles.detailsText}>
                {capitalizeFirstLetter(item.nombre)}{" "}
                {capitalizeFirstLetter(item.apellido)}
              </Text>
              <DateChip item={new Date(item.fecha).toLocaleDateString()} />
            </View>
            <View style={styles.row}>
              <Text style={styles.detailsText}>
                {truncateText(item.asignatura, 15)}
              </Text>
            </View>
            <View style={styles.row}>
              <FontAwesome
                style={styles.icon}
                name="commenting"
                size={20}
                color={ColorItem.TarnishedSilver}
              />
              {/* <TooltipText text={item.comentario} truncateLength={15} /> */}
              <StatusCircle item={item.estado} />
            </View>
          </BoxView>
        )}
        ListEmptyComponent={() => (
          <BoxView>
            <Text style={styles.noResultsText}>No hay datos adicionales</Text>
          </BoxView>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginHorizontal: 8,
    justifyContent: "space-between",
    marginTop: 5,
  },
  detailsText: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
  },
});
