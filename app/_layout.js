import { Slot } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/JWTAuthContext";
import Loading from "../components/share/loading";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicRoute } from "../src/hooks/PublicRoute";

const Stack = createNativeStackNavigator();
export default LayoutApp = () => {
  return (
    <SafeAreaProvider>
 
        <ToastProvider>
          <AuthProvider>
            <AuthContext.Consumer>
           
              {(auth) =>
                !auth.isInitialized ? (
                  <Loading />
                ) : (
                  <>
            <Slot />
                  </>
                  // <NavigationContainer>
                  //   <Stack.Navigator
                  //     initialRouteName="Index"
                  //     screenOptions={{ headerShown: false }}
                  //   >
                  //     <Stack.Screen name="Index" component={Index} />
                  //     <Stack.Screen name="Dashboard" component={Home} />
                  //   </Stack.Navigator>
                  //   </NavigationContainer>
               
                
                )
              }
              
            </AuthContext.Consumer>
          </AuthProvider>
        </ToastProvider>
     
    </SafeAreaProvider>
  );
};
// {auth.isAuthenticated ? (
//   <Authenticated>
//     <Slot />
//   </Authenticated>
// ) : (
//   <PublicRoute>
//     <Slot  />
//   </PublicRoute>
// )}
