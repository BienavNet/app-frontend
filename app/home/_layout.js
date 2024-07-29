import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider, AuthContext } from "../../src/context/JWTAuthContext";
import Loading from "../../components/share/loading";
import { useAuth } from "../../src/hooks/useAuth";

//home
export default LayoutHome = () => {
  const { nombre } = useAuth().user
  console.log("nombre", nombre);
  const namewelcome = `Bienveido ${nombre}`
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (!auth.isInitialized ? <Loading /> :
       <>
        <Stack screenOptions={
          {
            title:namewelcome,
          }
        }
        />
        </>
      )}
      </AuthContext.Consumer>
    </AuthProvider>
    // <Authenticated>
    //   <Slot/>
    // </Authenticated>
    // <ToastProvider>
    // <AuthProvider>
    //   <Stack />
    //   {/* <AuthContext.Consumer>
    //     {(auth) => (!auth.isInitialized ? <Loading /> : <Stack />)}
    //   </AuthContext.Consumer> */}
    // </AuthProvider>
    // </ToastProvider>
  );
};
