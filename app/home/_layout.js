import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, AuthContext } from "../../src/context/JWTAuthContext";
import { ToastProvider } from "react-native-toast-notifications";
import Loading from "../../components/share/loading";

//home redirected
export default LayoutHome = () => {
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
