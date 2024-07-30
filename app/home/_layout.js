import { Stack } from "expo-router/stack";
import { AuthProvider, AuthContext } from "../../src/context/JWTAuthContext";
import Loading from "../../components/share/loading";
import { useAuth } from "../../src/hooks/useAuth";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

//home
export default LayoutHome = () => {
  return (
    <SafeAreaProvider>
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) =>
          !auth.isInitialized ? (
            <Loading />
          ) : (
            <>
              <Slot />
            </>
          )
        }
      </AuthContext.Consumer>
    </AuthProvider>
    </SafeAreaProvider>
  );
};
