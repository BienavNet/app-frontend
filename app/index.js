import FormLogin from "../components/ui/formLogin";
import { methods as Title } from "../components/share/titulos/textIndexLogin";
import { SafeAreaProvider ,  useSafeAreaInsets} from "react-native-safe-area-context";
import { View } from "react-native";

function index() {
  const insert = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View
        className="bg-white flex-1 items-center content-center"
        style={{ paddingTop: insert.top, paddingBottom: insert.bottom }}
      >
        <Title.TitleLogin />
        <FormLogin />
      </View>
    </SafeAreaProvider>
  );
}

export default index;
