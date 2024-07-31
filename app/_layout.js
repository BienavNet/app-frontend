import { Slot } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/JWTAuthContext";
import Loading from "../components/share/loading";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

//app
export default LayoutApp = () => {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <AuthContext.Consumer>
            {(auth) =>
              !auth.isInitialized ? (
                <Loading color="#0000ff" />
              ) : (
                <>
                  <Slot />
                </>
              )
            }
          </AuthContext.Consumer>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};
