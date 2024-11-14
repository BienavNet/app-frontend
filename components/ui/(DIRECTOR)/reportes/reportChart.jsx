import { Text, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import {
  getDocenteQMasComentariosHaRealizado,
  getsalonMasComentarioTiene,
  getSalonMasUtilizado,
  getSalonMenosUtilizado,
  getCantidadDiaMasAsignado,
  getRangeHoursMasFrecuente,
} from "../../../../src/services/fetchData/fetchReporte";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { formatTimeTo12Hour } from "../../../../src/utils/functiones/functions";
import { useSafeAreaInset } from "../../../../src/utils/utils";
import Loading from "../../../share/loading";

// Función para normalizar datos automáticamente en base a un valor máximo estándar
const screenWidth = Dimensions.get("window").width;
const colors = [
  "rgba(153, 102, 255, 1)", // Verde
  "rgba(54, 162, 235, 1)", // Azul
  "rgba(255, 159, 64, 1)", // Naranja
];
export const EstadisticasReportes = () => {
  const insets = useSafeAreaInset();
  const [dqmct, setDqmct] = useState([]); // Docente con más comentarios realizados
  const [sqmct, setSqmct] = useState(null); // Salón que más comentarios tiene
  const [smasu, setSmasU] = useState([]); // Salón más utilizado
  const [smenosu, setSmenosU] = useState([]); // Salón menos utilizado
  const [diasmas, setDiasmas] = useState([]); // Días más asignados
  const [hoursmas, setHoursmas] = useState([]); // Horas más frecuentes
  const [loading, setLoading] = useState(true);

  const fetchDataChart = useCallback(async () => {
    try {
      const [
        dqmctData,
        sqmctData,
        smasuData,
        smenosuData,
        diasmasData,
        hoursmasData,
      ] = await Promise.allSettled([
        getDocenteQMasComentariosHaRealizado(),
        getsalonMasComentarioTiene(),
        getSalonMasUtilizado(),
        getSalonMenosUtilizado(),
        getCantidadDiaMasAsignado(),
        getRangeHoursMasFrecuente(),
      ]);
      setDqmct(dqmctData.status === "fulfilled" ? dqmctData.value : []);
      setSqmct(sqmctData.status === "fulfilled" ? sqmctData.value[0] : null);
      setSmasU(smasuData.status === "fulfilled" ? smasuData.value : []);
      setSmenosU(smenosuData.status === "fulfilled" ? smenosuData.value : []);
      setDiasmas(diasmasData.status === "fulfilled" ? diasmasData.value : []);
      setHoursmas(
        hoursmasData.status === "fulfilled" ? hoursmasData.value : []
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw Error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataChart();
  }, [fetchDataChart]);

  if (loading) {
    return <Loading />;
  }

  const uniqueSmenosu = smenosu
    .map((salon) => salon.numero_salon)
    .filter((value, index, self) => self.indexOf(value) === index);
  const salonMenosUtilizadoData = {
    labels: uniqueSmenosu.map((salon) => `#${salon}`),
    datasets: [
      {
        data:smenosu.map((salon) => salon.cantidad_usos),
      },
    ],
  };

  const sortedDqmct = dqmct.sort((a, b) => b.cantidad_comentarios - a.cantidad_comentarios);
  const docenteMasComentariosData = {
    labels: sortedDqmct.map((docente) => `${docente.cedula}`),
    datasets: [
      {
        data:sortedDqmct.map((docente) => docente.cantidad_comentarios),
      },
    ],
  };

  const pieChartData = hoursmas.map((hour, index) => ({
    name: `${formatTimeTo12Hour(hour.hora_inicio)} - ${formatTimeTo12Hour(hour.hora_fin)}`,
    population: hour.cantidad_repeticiones,
    color: colors[index % colors.length],
    legendFontColor: "#FFF",
    legendFontSize: 12,
  }));

  const sortedDiasmas = diasmas
    .map((day) => ({
      dia: day.dia,
      cantidad_repeticiones: day.cantidad_repeticiones,
    }))
    .sort((a, b) => b.cantidad_repeticiones - a.cantidad_repeticiones);

  const lineChartData = {
    labels: sortedDiasmas.map((day) => day.dia),
    datasets: [
      {
        data:sortedDiasmas.map((day) => day.cantidad_repeticiones),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1371C3",
    backgroundGradientTo: "#1371C3",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
    propsForLabels: {
      fontSize: 14,
      fontWeight: "bold",
    },
    propsForVerticalLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
    fromZero: true,
  };

  return (
    <ScrollView>
      <View style={{ paddingBottom: insets.bottom + 85 }}>
        <Text style={styles.title}> Salon Menos Utilizado</Text>
        {smenosu.length > 0 ? (
          <BarChart
            style={styles.chartContainer}
            data={salonMenosUtilizadoData}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
          />
        ) : (
          <Text style={styles.noDataText}>Sin registro</Text>
        )}
        <Text style={styles.title}> Horas del Dia mas Asignada</Text>
        {pieChartData.length > 0 ? (
          <PieChart
            style={styles.chartContainer}
            data={pieChartData}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"#1371C3"}
            paddingLeft={"-20"}
            center={[20, 0]}
          />
        ) : (
          <Text style={styles.noDataText}>Sin registro</Text>
        )}
        <Text style={styles.title}> Dias de la Semana mas Asignado</Text>
        {sortedDiasmas.length > 0 ? (
          <LineChart
            style={styles.chartContainer}
            data={lineChartData}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
            bezier
          />
        ) : (
          <Text style={styles.noDataText}>Sin registro</Text>
        )}
        <Text style={styles.title}> Docente con mas Comentarios Realizado</Text>
        {dqmct.length > 0 ? (
          <BarChart
            style={styles.chartContainer}
            data={docenteMasComentariosData}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
          />
        ) : (
          <Text style={styles.noDataText}>Sin registro</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  noDataText: {
    padding: 10,
    textTransform: "uppercase",
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  chartContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 4,
    elevation: 5,
    borderColor: "#7F7F7F",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
