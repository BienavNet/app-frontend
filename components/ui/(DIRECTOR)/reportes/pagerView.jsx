import { useState } from "react";
import { useWindowDimensions, Text, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ReportView_Filter } from "./list";
import { EstadisticasReportes } from "./reportChart";
import { ColorItem, styles } from "../../../styles/StylesGlobal";

const renderScene = SceneMap({
  first: EstadisticasReportes,
  second: ReportView_Filter,
});

export default function TabViewTop() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Estadisticas" },
    { key: "second", title: "Reportes" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      renderLabel={({ route, focused }) => (
        <Text
          style={[
            styles.label,
            { color: focused ? ColorItem.DeepFir : "#61665E" },
          ]}
        >
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
