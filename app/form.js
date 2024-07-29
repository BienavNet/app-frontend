
import FormLogin from "../components/ui/formLogin";
import { methods as Title } from "../components/share/titulos/textIndexLogin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

import { PublicRoute } from "../src/hooks/PublicRoute";
import { Slot } from "expo-router";
function Form() {
  const insert = useSafeAreaInsets();
  return (
    <PublicRoute> 
      <View
        className="bg-white flex-1 items-center content-center"
        style={{ paddingTop: insert.top, paddingBottom: insert.bottom }}
      >
        <Title.TitleLogin />
        <FormLogin />
      </View>
       </PublicRoute>
  );
}

export default Form;
