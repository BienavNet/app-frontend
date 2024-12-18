import { FormLogin } from "../components/ui/login/formLogin";
import { View, Text, ImageBackground } from "react-native";
import { PublicRoute } from "../src/hooks/PublicRoute";
import LogoUPCWhite from "../assets/svg/LogoUpcWhite";
import LogoSistemasUPC from "../assets/svg/LogoSistemas";
import { styles, stylesColors } from "../components/styles/StylesGlobal";
import { useSafeAreaInset } from "../src/utils/utils";

export default function Index() {
  const insert = useSafeAreaInset();
  return (
    <PublicRoute>
      <View
        style={{
          paddingTop: insert.top,
          paddingBottom: insert.bottom,
          flex: 1,
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/webp/FondoIndex.webp")}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              marginVertical: 60,
              padding: 12,
            }}
          >
            <View className="bg-UPCMediumGreen" style={[styles.contentIcon]}>
              <LogoUPCWhite />
            </View>
            <View
              style={[
                styles.contentIcon,
                {
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "green",
                },
              ]}
            >
              <LogoSistemasUPC />
            </View>
          </View>
          <View
            style={[
              stylesColors.BackgroundZircon,
              {
                bottom: 10,
                width: "100%",
                height: 453,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                paddingVertical: 15,
                shadowColor: "black",
                marginBottom: 20,
              },
            ]}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Text style={styles.titleWelcome} className="text-UPCDeepFir">
                Bienvenido
              </Text>
            </View>
            <FormLogin />
          </View>
        </ImageBackground>
      </View>
    </PublicRoute>
  );
}
