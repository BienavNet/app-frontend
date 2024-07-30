
import { Authenticated } from "../../src/hooks/Authenticated";
import { Tabs } from "expo-router";
import DraweHome from "./Navigation";


function Index() {
 
  return (
    <Authenticated>
      <DraweHome/>

    </Authenticated>
  );
}

export default Index;
