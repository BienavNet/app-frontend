import { ListItem, Button } from "@rneui/themed";
import { IconAndroid } from "../../../../../assets/icons/IconsGlobal";

export const ListSwipeable = ({
  item,
  icono: ComponetIcon = IconAndroid,
  index,
  children,
  handleDeletePress,
  handleInfoPress,
  showrightContent = true,
  isdocente = ""
}) => {
  return (
    <ListItem.Swipeable
      key={`${item.id}-Key25${index}`}
      leftContent={(reset) => (
        <Button
          title="Info"
          onPress={async () => {
            reset();
            await handleInfoPress(item.id);
          }}
          icon={{ name: "info", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={
        showrightContent
          ? (reset) => (
              <Button
                title="Eliminar"
                onPress={() => {
                  reset();
                  handleDeletePress(item.id);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )
          : null
      }
    >
      <ComponetIcon />
      <ListItem.Content>
        <ListItem.Title>{children}</ListItem.Title>
      </ListItem.Content>
      {
        isdocente
      }
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
