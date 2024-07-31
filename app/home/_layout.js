import { AuthProvider, AuthContext } from "../../src/context/JWTAuthContext";
import Loading from "../../components/share/loading";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

//home
export default LayoutHome = () => {
  return (
    <SafeAreaProvider>
    {/* <AuthProvider>
      <AuthContext.Consumer>
        {(auth) =>
          !auth.isInitialized ? (
            <Loading color="#0000ff" />
          ) : ( */}
            <>
              <Slot />
            </>
          {/* )
        }
      </AuthContext.Consumer>
    </AuthProvider> */}
    </SafeAreaProvider>
  );
};
