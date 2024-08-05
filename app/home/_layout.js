import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

//home
export default LayoutHome = () => {
  return (
    <SafeAreaProvider>
      <>
        <Slot />
      </>
    </SafeAreaProvider>
  );
};
