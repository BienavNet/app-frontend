import { Alert } from 'react-native';

export const DeleteConfirmation = (nameDelete, onPress ) => {
  return () => {
    Alert.alert(
      'Confirmación de Eliminación',
      `¿Estás seguro de que quieres eliminar ${nameDelete}?`,
      [
        { text: 'Cancelar', style: 'cancel' },  
        { text: 'Eliminar', onPress: onPress }, 
      ],
      { cancelable: false }
    );
  };
};


// import { Alert } from "react-native";

// export const DeleteConfirmation = ({ nameDelete, onPress }) => {
//     Alert.alert(
//       `Eliminar ${nameDelete}`,
//       `¿Estás seguro de que deseas eliminar este  ${nameDelete}?`,
//       [
//         {
//           text: "Cancelar",
//           style: "cancel",
//         },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress:onPress
//         },
//       ]
//     );
// };
