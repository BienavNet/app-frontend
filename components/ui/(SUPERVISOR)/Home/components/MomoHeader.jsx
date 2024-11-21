import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ButtonLogoutS } from "./buttonLogout";
import { InfoSup } from "./infSup";
import { CarListDocentes } from "../../components/cars/CarsListDocente";
import { useSocket } from "../../../../../src/hooks/use/useSocket";
import { useSafeAreaInset } from "../../../../../src/utils/utils";

export const ScrollViewScreen = () => {
  const insert = useSafeAreaInset();
  const { totalUnreadNotification } = useSocket();
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: insert.top,
      }}
    >
      <View style={styles.upperHeader}>
        <View style={{width:"60%"}}>
        <InfoSup />
        </View>
       <View style={{width:"40%", flexDirection:"row"}}>
       <TouchableOpacity
          onPress={() => navigation.navigate("NotificationStack")}
        >
          <Ionicons
            name="notifications-sharp"
            size={24}
            color="#ffffff"
            style={styles.bell}
          />
          {totalUnreadNotification > 0 && (
            <Badge
              status="primary"
              value={totalUnreadNotification}
              containerStyle={{ position: "absolute", left: 58 }}
            />
          )}
        </TouchableOpacity>
        <ButtonLogoutS />
       </View>
      </View>
      <CarListDocentes />
    </View>
  );
};

const styles = StyleSheet.create({
  upperHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    padding: 10,
    backgroundColor: ColorItem.MediumGreen,
  },
  bell: {
    marginLeft: 50,
    marginRight: 20,
  },
});
