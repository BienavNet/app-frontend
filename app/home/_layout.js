import { Stack } from "expo-router/stack";
import { AuthProvider, AuthContext } from "../../src/context/JWTAuthContext";
import Loading from "../../components/share/loading";
import { useAuth } from "../../src/hooks/useAuth";

//home
export default LayoutHome = () => {
  const { nombre } = useAuth().user;
  const namewelcome = `Bienveido ${nombre}`;
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) =>
          !auth.isInitialized ? (
            <Loading />
          ) : (
            <>
              <Stack
                screenOptions={{
                  title: namewelcome,
                }}
              />
            </>
          )
        }
      </AuthContext.Consumer>
    </AuthProvider>
  );
};
