import { Chip } from '@rneui/themed';
import { getFirstLetter } from "../../../../../src/utils/functiones/functions";
import { ColorItem } from '../../../../styles/StylesGlobal';


export const DateChip = ({ item }) => {
  return (
    <Chip 
    size="sm"
     titleStyle={{
      fontSize:11
     }} 
    color={ColorItem.GreenSymphony}
    title={item} containerStyle={{ marginHorizontal: 10 }} />
  );
};
