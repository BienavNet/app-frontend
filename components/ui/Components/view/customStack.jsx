import { createStackNavigator } from "@react-navigation/stack";
import { ColorItem } from "../../../styles/StylesGlobal";
const Stack = createStackNavigator();

const CustomStack = ({ initialRouteName, screens }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen, index) => {
        // Si la pantalla tiene pantallas hijas, Stack anidado
        if (screen.children) {
          return (
            <Stack.Screen
              key={`parent-${screen.name}-${index}`} // Clave única para pantalla principal (usando index)
              name={screen.name}
              component={({ navigation, route }) => (
                <Stack.Navigator>
                  <Stack.Screen
                    key={`parent-main-${screen.name}-${index}`} // Clave única para pantalla principal dentro del Stack anidado
                    name={screen.name}
                    component={screen.component}
                    options={{
                      title: screen.title,
                      headerTitleAlign: "center",
                      headerShown: screen.hideHeader ? false : true,
                      headerStyle: {
                        backgroundColor:
                          screen.headerStyle?.backgroundColor || "#ffffff",
                      },
                      headerTintColor:
                        screen.headerTintColor || ColorItem.DeepFir,
                      headerTitleStyle: {
                        color:
                          screen.headerTitleStyle?.color || ColorItem.DeepFir,
                      },
                      headerRight: screen.headerRight
                        ? () => screen.headerRight(navigation)
                        : null,
                      // headerLeft:() => (
                      //       <HeaderLeft
                      //         onPress={() => {
                      //           const state = navigation.getState();
                      //           if (state.routes.length > 1) {
                      //             navigation.goBack(); // Si hay más de una pantalla en la pila, regresa
                      //           } else {
                      //             navigation.navigate("Home"); // Si no, navega a la pantalla principal
                      //           }
                      //         }}
                      //         icon={
                      //           <FontAwesome6
                      //             name="circle-chevron-left"
                      //             size={30}
                      //             color={ColorItem.KellyGreen}
                      //           />
                      //         }
                      //       />
                      //     )
                    }}
                  />
                  {/* Agregar pantallas hijas dentro de este Stack.Navigator */}
                  {screen.children.map((childScreen, childIndex) => (
                    <Stack.Screen
                      key={`child-${screen.name}-${childScreen.name}-${childIndex}`} // Clave única para cada pantalla hija
                      name={childScreen.name}
                      component={childScreen.component}
                      options={{
                        title: childScreen.title,
                        headerTitleAlign: "center",
                      }}
                    />
                  ))}
                </Stack.Navigator>
              )}
            />
          );
        } else {
          return (
            <Stack.Screen
              key={`screen-${screen.name}-${index}`}
              name={screen.name}
              component={screen.component}
              options={({ navigation, route }) => ({
                title: screen.title,
                headerTitleAlign: "left",
                headerShown: screen.hideHeader ? false : true,
                headerStyle: {
                  backgroundColor:
                    screen.headerStyle?.backgroundColor || "#ffffff",
                },
                headerTintColor: screen.headerTintColor || ColorItem.DeepFir,
                headerTitleStyle: {
                  color: screen.headerTitleStyle?.color || ColorItem.DeepFir,
                },
                headerRight: screen.headerRight
                  ? () => screen.headerRight(navigation)
                  : null,
                // headerLeft: () => (
                //       <HeaderLeft
                //         onPress={() => {
                //           const state = navigation.getState();
                //           if (state.routes.length > 1) {
                //             navigation.goBack(); // Si hay más de una pantalla en la pila, regresa
                //           } else {
                //             navigation.navigate("Home"); // Si no, navega a la pantalla principal
                //           }
                //         }}
                //         icon={
                //           <FontAwesome6
                //             name="circle-chevron-left"
                //             size={30}
                //             color={ColorItem.KellyGreen}
                //           />
                //         }
                //       />
                //     )
              })}
            />
          );
        }
      })}
    </Stack.Navigator>
  );
};

export default CustomStack;
