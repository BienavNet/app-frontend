import { View, Text } from "react-native";
import CalendarListScreen from "./filterCalendar";
import { ListClass } from "./listClass";

export const Clasesregistro = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <CalendarListScreen />
      </View>
      {/*      
        <ListClass />
     */}
    </>
  );
};
