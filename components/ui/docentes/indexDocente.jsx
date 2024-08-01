import { Text, View ,Image, StyleSheet} from "react-native";
import TabViewTop from "./Components/pagerView";
import { Stack, usePathname } from "expo-router";


function LogoTitle() {
    return (
      <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
    );
  }
export default function DocenteHome(){
const pathname = usePathname();
console.log(pathname, "ruta");
    return (
        <>
        <TabViewTop/>
        </>
    )
}


// {/* <View style={{flex:1, backgroundColor: 'white'}}> */}
//             {/* <TabViewTop/> */}