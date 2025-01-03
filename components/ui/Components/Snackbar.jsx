import { Snackbar } from "@react-native-material/core";
import { Button } from "@rneui/themed";
import { View } from "react-native";

export default function CSnackbar({ handleSelectItem, handleSnackbarDismiss }) {
  return (
    <Snackbar
      message="¿Quieres seleccionar este ítem?"
      action={
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Button
            onPress={() => {
              handleSelectItem();
            }}
            title="Seleccionar"
            color="primary"
            containerStyle={{
              marginHorizontal: 10,
            }}
          />

          <Button
            onPress={() => {
              handleSnackbarDismiss();
            }}
            title="Cancelar"
            color="grey"
          />
        </View>
      }
      style={{
        position: "absolute",
        start: 10,
        end: 10,
        bottom: 10,
      }}
    />
  );
}
