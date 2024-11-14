import { Chip } from "@rneui/themed";
import { ColorItem } from "../../../../styles/StylesGlobal";
import { ScrollView, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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

// cuando se maneja un solo filtro con X
export const ChildFilterX = ({ title, selectedItem, action }) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        marginHorizontal: 13,
      }}
      style={{
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          width: 125,
          marginHorizontal: 10,
        }}
      >
        <Chip
          size="md"
          titleStyle={{
            paddingRight:10,
            fontSize: 17,
            fontWeight: "bold",
            color: selectedItem ? "white" : ColorItem.TarnishedSilver,
          }}
          onPress={action}
          iconRight
          title={title}
          color={selectedItem ? "primary" : "lightgray"}
          containerStyle={{ marginVertical: 10 }}
          icon={<FontAwesome name="close" size={16} color="white" />}
        />
      </View>
    </ScrollView>
  );
};

// cuando se maneja un solo filtro sin X
export const ChildFilter = ({ title, selectedItem, action }) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        marginHorizontal: 13,
      }}
      style={{
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: 125,
          marginHorizontal: 10,
        }}
      >
        <Chip
          size="md"
          titleStyle={{
            paddingRight:10,
            fontSize: 17,
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

// filtros con el stylo de borrar filtro
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
