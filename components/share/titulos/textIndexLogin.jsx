import { View, Text,StyleSheet } from "react-native";

const TitleLogin = () => {
  return (
    <View className="w-full items-center justify-center my-8">
      <Text style={styles.title}>App Salones UPC Aguachica</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 3,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 38,
    fontWeight: 'bold',
  },
});



export const methods = {
    TitleLogin,
}