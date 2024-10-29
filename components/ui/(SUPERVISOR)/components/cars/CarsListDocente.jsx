import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getClaseSupervisor } from "../../../../../src/services/fetchData/fetchClases";
import { useCallback, useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  truncateText,
} from "../../../../../src/utils/functiones/functions";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { DateChip } from "../../../(DIRECTOR)/reportes/components/DateChip";
import { useNavigation } from "expo-router";
import { refreshControl } from "../../../../../src/utils/functiones/refresh";
import { userData } from "../../../../../src/hooks/use/userData";

export const CarListDocentes = ({ scrollViewRef, handleScroll }) => {
  const [refreshing, setRefreshing]= useState(false);
  const { CEDULA } = userData();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const fechtDataSupervisorId = useCallback(async () => {
    try {
      const res = await getClaseSupervisor(CEDULA);
      setData(res);
    } catch (error) {
      throw new Error("Error getting supervisor by ID:", error);
    }
  }, []);

  const handlePress = (data) => {
    navigation.navigate("RegistrarReporte", { data });
  };

  useEffect(() => {
    (async () => {
      await fechtDataSupervisorId();
    })();
  }, [fechtDataSupervisorId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fechtDataSupervisorId();
    setRefreshing(false);
  }, [fechtDataSupervisorId]);

  return (
    <ScrollView
      refreshControl={refreshControl(refreshing, onRefresh)}
      scrollEventThrottle={16}
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      style={{marginBottom:160}}
    >
      {data.map((item, index) => (
        <View key={item.id} style={[styles.card, 
        {
          // marginBottom: 160
        }]}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              width: "100%",
            }}
            onPress={() => handlePress(item)}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <MaterialCommunityIcons
                name="google-classroom"
                size={40}
                color="black"
              />
            </View>

            <View className="w-[75%]">
              <View className="flex-row my-1 justify-between">
                <Text style={[styles.fontZise]}>
                  {capitalizeFirstLetter(item.nombre_docente)}{" "}
                  {capitalizeFirstLetter(item.apellido_docente)}
                </Text>
                {item.comentario && item.comentario.length > 0 ? (
                  <View>
                    <MaterialCommunityIcons
                      style={{
                        marginTop: 3,
                        marginHorizontal: 10,
                      }}
                      name="read"
                      size={22}
                      color="black"
                    />
                  </View>
                ) : null}
              </View>
              <View className="flex-row my-1 justify-around">
                <View className="flex">
                  <Text
                    style={{
                      fontSize: 16,
                      // color: ColorItem.OceanCrest,
                      color: '#000000',
                      fontWeight: "500",
                    }}
                  >
                    {truncateText(item.asignatura, 15)}
                  </Text>
                </View>
                <View className="flex-row">
                  <Text style={[styles.fontZise14]}>
                    {item.numero_salon} {" · "}
                  </Text>
                  <Text style={[styles.fontZise14]}>
                    {capitalizeFirstLetter(item.categoria)}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center my-1">
                <DateChip item={new Date(item.fecha).toLocaleDateString()} />
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 13, marginRight: 10 }}>
                    {new Date(
                      `${item.fecha.split("T")[0]}T${item.hora_inicio}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text style={{ fontSize: 13 }}>
                    {new Date(
                      `${item.fecha.split("T")[0]}T${item.hora_fin}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    height: 100,
    backgroundColor: ColorItem.Zircon,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#181D31",
    fontWeight: "bold",
  },

  fontZise: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "white",
    color: '#000000',
  },
  fontZise14: {
    fontSize: 14,
    fontWeight: "bold",
    // color: "white",
    color: '#000000'
  },
});
