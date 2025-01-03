import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const Loading = ({color}) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator  size="large" color={color} />
    <Text style={{
      fontSize: 20,
      fontWeight: 'bold',
      color: color,
      paddingHorizontal:10,
      paddingVertical:10,
      marginHorizontal: 10,
      marginVertical: 10,
      textAlign: 'center',
    }}> Cargando...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'column',
    paddingVertical: 40,
    paddingHorizontal:10
  },
});

export default Loading;