import {
  Animated,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { Badge } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ButtonLogoutS } from "./buttonLogout";
import { InfoSup } from "./infSup";
import { CarListDocentes } from "../../components/cars/CarsListDocente";
import { useSocket } from "../../../../../src/hooks/use/useSocket";
import { userData } from "../../../../../src/hooks/use/userData";

const Header_Max_Height = 118;
const Header_Min_Height = 57;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

export const ScrollViewScreen = () => {
  const { CORREO } = userData()
  const { totalUnreadNotification } = useSocket();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [displayedInfo, setDisplayedInfo] = useState(null);
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const animatedHeaderColor = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [ColorItem.MediumGreen, ColorItem.KellyGreen],
    extrapolate: "clamp",
  });


  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const { y } = event.nativeEvent.contentOffset;
        // Define el umbral donde el encabezado desaparece y el nuevo mensaje se muestra
        if (y < 100) {
          setDisplayedInfo(null);
        } else if (y < 200) {
          setDisplayedInfo(
            <View style={{}}>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 18,
                  color: "black",
                }}
              >
                {capitalizeFirstLetter(CORREO)}
              </Text>
            </View>
          );
        }
      },
    }
  );
  return (
    <View style={styles.headerContent}
      >
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView> */}
      {/* <Animated.View
        style={[
          styles.headerContent,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
          },
        ]}
      > */}
        <View style={styles.upperHeader}>
          <InfoSup
            displayedInfo={displayedInfo}
            scrollOffsetY={scrollOffsetY}
          />
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
                containerStyle={{ position: "absolute", top: 2, left: 35 }}
              />
            )}
          </TouchableOpacity>
          <ButtonLogoutS/>
        </View>
      {/* </Animated.View> */}
      <CarListDocentes
        // handleScroll={handleScroll}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    width: "100%",
    zIndex: 9999,
    paddingTop: Platform.OS === "android" ? 15 : 0,
  },
  upperHeaderPlaceholder: {
    height: 10,
    paddingTop: 10,
  },
  upperHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingLeft: 20,
    marginTop: 30,
    height: Header_Min_Height,
    backgroundColor: ColorItem.MediumGreen
  },
  searchInput: {
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  bell: {
    marginLeft: 60,
    marginRight: 30,
    paddingLeft: 10
  },
  spaceForHeader: {
    height: Header_Max_Height,
  },
  scrollViewContent: {
    height: Header_Max_Height,
  },
});
