import { Slot } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/JWTAuthContext";
import { NotificationProvider } from "../src/context/SocketContext";
import Loading from "../components/share/loading";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ColorItem } from "../components/styles/StylesGlobal";

//app
export default LayoutApp = () => {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <AuthContext.Consumer>
              {(auth) =>
                !auth.isInitialized ? (
                  <Loading color={ColorItem.KellyGreen} />
                ) : (
                  <Slot />
                )
              }
            </AuthContext.Consumer>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};
