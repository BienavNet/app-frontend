// import { useCallback, useEffect, useState } from "react";
// import { getSupervisorCedula } from "../../../../../src/services/fetchData/fetchSupervisor";
// import { useAuth } from "../../../../../src/hooks/useAuth";
import { View, Text, Animated } from "react-native";
import { capitalizeFirstLetter } from "../../../../../src/utils/functiones/functions";
import { useSupervisorCedula } from "../../../../../src/hooks/customHooks";
import { userData } from "../../../../../src/hooks/use/userData";

const AnimatedText = Animated.createAnimatedComponent(Text);

export const InfoSup = ({ scrollOffsetY, displayedInfo }) => {
  const { CEDULA } = userData();

  const datasupervisor = useSupervisorCedula(CEDULA);

  // const [datasupervisor, setDataSupervisor] = useState([]);
  // const fetchSupervisor = useCallback(async () => {
  //   try {
  //     const res = await getSupervisorCedula(CEDULA);
  //     setDataSupervisor(res);
  //   } catch (error) {
  //     throw Error("Failed to fetch :", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     await fetchSupervisor();
  //   })();
  // }, [fetchSupervisor]);

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

  return datasupervisor.map((item, index) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
      key={item.id}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{displayedInfo}</Text>
      <AnimatedText
        style={[
          textInputAnimation,
          {
            marginLeft: 10,
            marginRight: 10,
          },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          {capitalizeFirstLetter(item.nombre)}{" "}
          {capitalizeFirstLetter(item.apellido)}
        </Text>
      </AnimatedText>
    </View>
  ));
};
