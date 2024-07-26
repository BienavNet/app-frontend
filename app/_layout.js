import { Slot } from "expo-router";
import { View, Text, StatusBar } from "react-native";
import { AuthProvider, AuthConsumer } from "../src/context/JWTAuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";

export default () => {
  return (
    <ToastProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <AuthConsumer>
            {({ isInitialized }) =>
              !isInitialized ? (
                <View>
                  <Text>Cargando...</Text>
                </View>
              ) : (
                <>
                  <StatusBar style="dark" />
                  <Slot />
                </>
              )
            }
          </AuthConsumer>
        </AuthProvider>
      </SafeAreaProvider>
    </ToastProvider>
  );
};
