import { Chip } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { ScrollView, View } from "react-native";

// cuando se maneja varios filtros
export const ChipMultipleFilter = ({ title, selectedItem, action }) => {
  return (
    <View
      style={{
        width: 130,
        marginHorizontal: 10,
      }}
    >
      <Chip
        size="md"
        titleStyle={{
          fontSize: 16,
          fontWeight: "bold",
          color: selectedItem ? "white" : ColorItem.TarnishedSilver,
        }}
        onPress={action}
        iconRight
        title={title}
        color={selectedItem ? "primary" : "lightgray"}
        containerStyle={{ marginVertical: 10 }}
      />
    </View>
  );
};

// cuando se maneja un solo filtro
export const ChildFilter = ({ title, selectedItem, action }) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        marginHorizontal: 10,
      }}
      style={{
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View>
        <Chip
          size="md"
          titleStyle={{
            fontSize: 16,
            fontWeight: "bold",
            color: selectedItem ? "white" : ColorItem.TarnishedSilver,
          }}
          onPress={action}
          iconRight
          title={title}
          color={selectedItem ? "primary" : "lightgray"}
          containerStyle={{ marginVertical: 10 }}
        />
      </View>
    </ScrollView>
  );
};

export const ChildFilterOutline = ({ opciones, handleOptionSelect }) => {
  return (
    <>
      {opciones.map((item, index) => (
        <View
          style={{
            width: 120,
            marginHorizontal: 10,
          }}
        >
          <Chip
            key={`select-/${index}`}
            type="outline"
            size="md"
            titleStyle={{
              fontSize: 16,
              paddingHorizontal: 5,
            }}
            onPress={() => handleOptionSelect(item.action)}
            iconRight
            title={item.title}
            containerStyle={{ marginVertical: 10 }}
          />
        </View>
      ))}
    </>
  );
};
