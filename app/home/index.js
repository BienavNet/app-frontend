import { View, Text } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { HomeDirector } from "./director/index";
import { Authenticated } from "../../src/hooks/Authenticated";
import { Tabs } from "expo-router";

function Index() {
  const { user } = useAuth();
  console.log("user returned", user);
  console.log("user rol", user.rol);

  if (!user) return null;

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender = HomeDirector;
      break;
    // case "docente":
    //   ComponentToRender = "/(docente)";
    //   break;
    // case "supervisor":
    //   ComponentToRender = "/(supervisor)";
    //   break;
    default:
      ComponentToRender = () => (
        <View>
          <Text>Rol desconocido o sin acceso.</Text>
        </View>
      );
      return;
  }
  console.log(ComponentToRender, "componentToRender")
  return (
    <Authenticated>
    <View>
      <View>
        <Text>header</Text>
      </View>
      <ComponentToRender/>
    
    </View>
    </Authenticated>
  );
}

export default Index;
