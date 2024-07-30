
import { Authenticated } from "../../src/hooks/Authenticated";
import { Tabs } from "expo-router";
import DraweHome from "./Navigation";



export default function Index() {
 
  return (
    <Authenticated>
      <DraweHome/>
    </Authenticated>
  );
}
