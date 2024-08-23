import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
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

const screenWidth = Dimensions.get("window").width;
const colors = [
  "rgba(153, 102, 255, 1)", // Verde
  "rgba(54, 162, 235, 1)", // Azul
  "rgba(255, 159, 64, 1)", // Naranja
];
export const ReportChart = () => {
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
      console.error("Error fetching data:", error);
      setLoading(false);
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

  // Gráfico de Docente con Más Comentarios Realizados
  const sortedDqmct = dqmct.sort(
    (a, b) => b.cantidad_comentarios - a.cantidad_comentarios
  );

  const docenteMasComentariosData = {
    labels: sortedDqmct.map((docente) => `${docente.cedula}`),
    datasets: [
      {
        data: sortedDqmct.map((docente) => docente.cantidad_comentarios),
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
        })) // Asegúrate de mantener tanto el día como la cantidad
        .sort((a, b) => b.cantidad_repeticiones - a.cantidad_repeticiones) // Ordenar por cantidad_repeticiones
    : [];

  // Construir datos para el gráfico de línea
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
      <Text style={styles.title}> Salon Menos Utilizado</Text>
      <BarChart
        style={styles.chartContainer}
        data={data}
        width={screenWidth - 10}
        height={200}
        chartConfig={chartConfig}
      />
        <Text style={styles.title}> Docente con mas Comentarios Realizado</Text>
      <BarChart
        style={styles.chartContainer}
        data={docenteMasComentariosData}
        width={screenWidth - 10}
        height={200}
        chartConfig={chartConfig}
      />
        <Text style={styles.title}> Horas del Dia mas Asignada</Text>
      <PieChart
        style={styles.chartContainer}
        data={pieChartData}
        width={screenWidth - 10}
        height={200}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"#1371C3"}
        paddingLeft={"-20"}
        // absolute
        center={[20, 0]}
      />
  <Text style={styles.title}> Dias de la Semana mas Asignado</Text>
      <LineChart
        style={styles.chartContainer}
        data={lineChartData}
        width={screenWidth - 10}
        height={200}
        chartConfig={chartConfig}
        bezier
      />
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
