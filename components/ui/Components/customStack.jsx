import { createStackNavigator } from "@react-navigation/stack";
import { ColorItem } from "../../styles/StylesGlobal";
import HeaderLeft from "../../share/headerhomeLeft";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Stack = createStackNavigator();

const CustomStack = ({ initialRouteName, screens }) => {
  const notificationScreens = ["NotificationScreen"]; // solo las pantallas que esten en el array se le agg un button personalizado de back.
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={({ navigation, route }) => {
            const isInitialScreen = route.name === initialRouteName;
            const isSecondaryScreen = !isInitialScreen;
            return {
              title: screen.title,
              headerTitleAlign: "center",
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
              headerLeft: notificationScreens.includes(route.name)
                ? () => (
                    <HeaderLeft
                      onPress={() => navigation.goBack()} // Navegar hacia atrás
                      icon={
                        <FontAwesome6
                          name="circle-chevron-left"
                          size={30}
                          color={ColorItem.KellyGreen}
                        />
                      }
                    />
                  )
                : isSecondaryScreen // maneja si es diferente de las secundarias, es decir son las primeras
                ? undefined // undefined para poder manejar la flecha nativa en pantallas secuandarias de StackNavigation
                : null,
            };
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CustomStack;
