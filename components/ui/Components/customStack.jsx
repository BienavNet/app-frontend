import { createStackNavigator } from "@react-navigation/stack";
import { ColorItem } from "../../styles/StylesGlobal";
const Stack = createStackNavigator();

const CustomStack = ({ initialRouteName, screens }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={({ navigation }) => ({
            title: screen.title,
            headerShown: screen.hideHeader ? false : true,
            headerStyle: {
              backgroundColor: screen.headerStyle?.backgroundColor || "#ffffff",
            },
            headerTintColor: screen.headerTintColor || "#fff",
            headerTitleStyle: {
              color: screen.headerTitleStyle?.color || ColorItem.DeepFir,
            },
            headerRight: screen.headerRight
              ? () => screen.headerRight(navigation)
              : undefined,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CustomStack;
