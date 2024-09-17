import {Platform} from 'react-native';
import { ColorItem } from '../../../../../styles/StylesGlobal';
export const themeColor = ColorItem.Luigi;
export const lightThemeColor = '#f2f7f7';
export function getTheme() {
  const disabledColor = ColorItem.OceanCrest;
  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // knob
    expandableKnobColor: themeColor,
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    //textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold',
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    //textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal',
    // dates
    dayTextColor: ColorItem.DeepFir,
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    //textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: '500',
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2}
  };
}