import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Layout () {
    return (
        <View className="flex-1">
            <Stack screenOptions={{
                headerStyle: { backgroundColor: "#fff"},
                headerTintColor: "#000",
                animation: "fade",
                navigationBarHidden: false,
                headerShown: false,
            }}/>
            
        </View>
        
    )
}