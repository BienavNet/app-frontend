import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,Alert,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRef } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../../src/hooks/useAuth";
// import { getFeatureViewAnimation } from "./utils";


const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const Header_Max_Height = 118;
const Header_Min_Height = 57;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const ScrollViewScreen = ({children}) => {
  const {logout} = useAuth();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  
  // const lastOffsetY = useRef(0);
  // const scrollDirection = useRef();
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });
  const handleLogout = () => {
    Alert.alert(
      "Confirmación de Cierre de Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              Alert.alert("Cerrando sesión......... Nos vemos pronto 👋")
              await logout();
            } catch (error) {
              console.error("Error durante el cierre de sesión:", error);
            } 
          },
        },
      ],
      { cancelable: true }
    );
  };
  const animatedHeaderColor = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ["#3111F3", "#1371C3"],
    extrapolate: "clamp",
  });
  const textInputAnimation = {
    transform: [
      {
        scaleX: scrollOffsetY.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
      },
      {
        translateX: scrollOffsetY.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: scrollOffsetY.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerContent,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
          },
        ]}
      >
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Feather
              size={18}
              name="search"
              color="white"
              style={{ marginLeft: 8 }}
            />
            <AnimatedTextInput
              placeholder="Escribe aqui..."
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              style={[styles.searchInput, textInputAnimation]}
            />
          </View>
         <TouchableOpacity
         onPress={handleLogout}
         >
         <SimpleLineIcons
            name="logout"
            size={22}
            color="white"
            style={styles.bell}
          />
         </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          }
        )}
        // onScrollEndDrag={() => {
        //   scrollViewRef.current?.scrollTo({
        //     y: scrollDirection.current === 'down' ? 0 : 0,
        //     animated: true,
        //   });
        // }}
      >
        {
          children
        // DATA.map((val) => (
        //   <View style={styles.card} key={val.id}>
        //     <Text style={styles.subtitle}>({val.id})</Text>
        //   </View>
        // ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    width: "100%",
    zIndex: 9999,
    // position: "absolute",
    // backgroundColor: "#AF0C6E",
    paddingTop: Platform.OS === "android" ? 12 : 0,
  },
  upperHeaderPlaceholder: {
    height: 0,
    paddingTop: 0,
  },
  upperHeader: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: Header_Min_Height,
    // paddingTop: 4,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
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
    marginHorizontal: 32,
  },
  spaceForHeader: {
    backgroundColor: "green",
    height: Header_Max_Height,
  },
  // card: {
  //   height: 100,
  //   backgroundColor: "#E6DDC4",
  //   marginTop: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginHorizontal: 10,
  // },
  // subtitle: {
  //   color: "#181D31",
  //   fontWeight: "bold",
  // },
  scrollViewContent: {
    height: Header_Max_Height,
    backgroundColor: "orange",
  },
});
