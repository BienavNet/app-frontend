import isEmpty from "lodash/isEmpty";
import { memo, useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { StatusCircle } from "../../../../(DIRECTOR)/reportes/components/StatusCircle";

const AgendaItem = (props) => {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert("Show me more");
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, [item.title]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No evento planeado para este dia.</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID="agenda-items">
      <View>
      <Text style={styles.itemHourText}>{item.room}</Text>
        <Text style={styles.itemHourText}>{item.hours}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
     <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
     }}>
      <Text style={styles.itemTitleText}>{item.subject}</Text>
     <Text style={styles.itemTitleText}>{item.title}</Text>
      <StatusCircle
      item={item.status}
      />
     </View>
      <View style={styles.itemButtonContainer}>
        <Button 
        
        color={"lightblue"} title={"Reportar"} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginHorizontal:5
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
