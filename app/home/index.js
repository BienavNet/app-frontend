
import { Authenticated } from "../../src/hooks/Authenticated";
import DraweHome from "./Navigation";

export default function Index() {
 
  return (
    <Authenticated>
      <DraweHome/>
    </Authenticated>
  );
}
