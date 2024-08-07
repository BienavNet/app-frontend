import { createStackNavigator } from "@react-navigation/stack";
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
            headerStyle: {
              backgroundColor: screen.headerStyle?.backgroundColor || "#1371C3",
            },
            headerTintColor: screen.headerTintColor || "#fff",
            headerTitleStyle: {
              color: screen.headerTitleStyle?.color || "#ffffff",
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
