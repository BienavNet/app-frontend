import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { ColorItem, styles } from "../../../../styles/StylesGlobal";
import moment from "moment";
import "moment/locale/es";

export const SearchView = ({ value, handleOpenSecondModal }) => {
  console.log("Fecha recibida en SearchView:", value);

  return (
    <View style={[styles.viewmore]}>
      <Text style={styles.subtitle}>
        {moment(value).format("ddd D MMM YYYY")}
      </Text>
      <Button
        onPress={handleOpenSecondModal}
        buttonStyle={{ width: 100}} 
        radius={"sm"}
        type="clear"
      >
        <Text style={{color:ColorItem.KellyGreen, fontSize:16, marginBottom:4}}>Ver mas</Text>
        <MaterialIcons
          name="expand-more"
          size={24}
          color={ColorItem.KellyGreen}
        />
      </Button>
    </View>
  );
};
