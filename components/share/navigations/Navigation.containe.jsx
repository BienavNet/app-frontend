import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export function UseNavigationContainer({screenContainer}){
    return(
        <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screenContainer.map((screen, index) => (
          <Stack.Screen 
            key={index} 
            name={screen.name} 
            component={screen.component} 
          />
        ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
}