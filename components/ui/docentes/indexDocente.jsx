import TabViewTop from "./Components/pagerView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";
const Stack = createStackNavigator();
import { ListDocente } from "./(listDocente)/listDocente";
import { RegistrarDocente } from "./(registrarDocente)/formregister";
export default function DocenteHome() {
  return (
    <Stack.Navigator initialRouteName="ListScreen">
      <Stack.Screen
        name="ListScreen"
        component={ListDocente}
        options={({ navigation }) => ({
          title: "Lista",
          headerStyle: {
            backgroundColor: "#3111F3",
          },
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("FormScreen")}
              style={{
                borderColor: "#ffffff",
                borderWidth: 1,
                marginRight: 10,
                borderRadius: 2,
              }}
            >
              <Text style={{ color: "#fff", margin: 3, fontSize: 14 }}>
                Nuevo
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FormScreen"
        component={RegistrarDocente}
        options={{
          title: "Create a teacher",
          headerStyle: {
            backgroundColor: "#3111F3",
          },
          headerTintColor: "#fff",

          headerTitleStyle: {
            color: "#ffffff",
          },
        }}
      />
    </Stack.Navigator>
  );
  // return (
  //   <>

  //     {/* <TabViewTop /> */}
  //   </>
  // );
}
