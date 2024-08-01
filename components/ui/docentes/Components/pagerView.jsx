import { useState } from "react";
import { View, useWindowDimensions, Text, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { RegistrarDocente } from "../(registrarDocente)/formregister";

const ActualizarDocente = () => (
  <View style={{ flex: 1, backgroundColor: "#F2F2F0" }}></View>
);
const ListDocente = () => (
  <View style={{ flex: 1, backgroundColor: "#F2F2F0" }}></View>
);

const renderScene = SceneMap({
  first: ListDocente,
  second: RegistrarDocente,
  third: ActualizarDocente,
});

export default function TabViewTop() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Lista" },
    { key: "second", title: "Registrar" },
    { key: "third", title: "Actualizar" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.label, { color: focused ? "#222" : "#61665E" }]}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
     <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff", // Color de fondo de la barra de pestañas
  },
  indicator: {
    backgroundColor: "#3111F3", // Color del indicador de pestaña activa
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
