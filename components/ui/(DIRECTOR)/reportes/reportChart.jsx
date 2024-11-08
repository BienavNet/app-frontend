import { Text, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { useCallback, useState } from "react";
import {
  getDocenteQMasComentariosHaRealizado,
  getsalonMasComentarioTiene,
  getSalonMasUtilizado,
  getSalonMenosUtilizado,
  getCantidadDiaMasAsignado,
  getRangeHoursMasFrecuente,
} from "../../../../src/services/fetchData/fetchReporte";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
import { formatTimeTo12Hour } from "../../../../src/utils/functiones/functions";
import { useSafeAreaInset } from "../../../../src/utils/utils";

const screenWidth = Dimensions.get("window").width;
const colors = [
  "rgba(153, 102, 255, 1)", // Verde
  "rgba(54, 162, 235, 1)", // Azul
  "rgba(255, 159, 64, 1)", // Naranja
];
export const EstadisticasReportes = () => {
  const insets = useSafeAreaInset();
  const [dqmct, setDqmct] = useState([]); //docent con mas comentario realizado
  const [sqmct, setSqmct] = useState(null); // salon que mas comentario tiene
  const [smasu, setSmasU] = useState([]); // salo mas utilizado
  const [smenosu, setSmenosU] = useState([]); // salo menos utilizado
  const [diasmas, setDiasmas] = useState([]); // los dias mas asignados  { 'Lunes': 5, 'Martes': 3, 'Miércoles': 2, 'Jueves': 4, 'Viernes': 6, 'Sábado': 1 }
  const [hoursmas, setHoursmas] = useState([]); // las horas que mas se repiten
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
      ] = await Promise.all([
        getDocenteQMasComentariosHaRealizado(),
        getsalonMasComentarioTiene(),
        getSalonMasUtilizado(),
        getSalonMenosUtilizado(),
        getCantidadDiaMasAsignado(),
        getRangeHoursMasFrecuente(),
      ]);

      setDqmct(dqmctData);
      setSqmct(sqmctData[0]);
      setSmasU(smasuData);
      setSmenosU(smenosuData);
      setDiasmas(diasmasData);
      setHoursmas(hoursmasData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDataChart();
    }, [fetchDataChart])
  );

  if (loading) {
    return <Text>Cargando datos... </Text>;
  }

  const uniqueSmasu = smasu
    .map((salon) => salon.numero_salon)
    .filter((value, index, self) => self.indexOf(value) === index);

  const data = {
    labels: uniqueSmasu.map((salon) => `#${salon}`),
    datasets: [
      {
        data: smenosu.map((salon) => salon.cantidad_usos),
      },
    ],
  };

  const pieChartData = Array.isArray(hoursmas)
    ? hoursmas.map((hour, index) => ({
        name: `${formatTimeTo12Hour(hour.hora_inicio)} - ${formatTimeTo12Hour(
          hour.hora_fin
        )}`,
        population: hour.cantidad_repeticiones,
        color: colors[index % colors.length],
        legendFontColor: "#FFF",
        legendFontSize: 12,
      }))
    : [];
  const sortedDiasmas = Array.isArray(diasmas)
    ? diasmas
        .map((day) => ({
          dia: day.dia,
          cantidad_repeticiones: day.cantidad_repeticiones,
        }))
        .sort((a, b) => b.cantidad_repeticiones - a.cantidad_repeticiones) // Ordenar por cantidad_repeticiones
    : [];

  //datos para el gráfico de línea
  const lineChartData = {
    labels: sortedDiasmas.map((day) => day.dia), // Días ordenados
    datasets: [
      {
        data: sortedDiasmas.map((day) => day.cantidad_repeticiones), // Cantidades ordenadas
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
  };

  return (
    <ScrollView>
      <View
        style={{
          paddingBottom: insets.bottom + 85,
        }}
      >
        <Text style={styles.title}> Salon Menos Utilizado</Text>
        {smasu.length > 0 ? (
          <BarChart
            style={styles.chartContainer}
            data={data}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
          />
        ) : (
          <Text style={styles.noDataText}>Sin registro</Text>
        )}
        <Text style={styles.title}> Docente con mas Comentarios Realizado</Text>
        {smasu.length > 0 ? (
          <BarChart
            style={styles.chartContainer}
            data={data}
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
  noDataText:{
    padding:10,
    textTransform:"uppercase",
    fontSize:16,
    color:"red",
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
