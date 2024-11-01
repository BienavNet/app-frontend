const themeColor = '#00AAAF';
export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor ="red";
  return {
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    expandableKnobColor: themeColor,
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontWeight: 'bold',
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontWeight: 'normal',
    dayTextColor: "gray",
    todayTextColor: '#af0078',
    textDayFontSize: 18,
    textDayFontWeight: '500',
    textDayStyle: {marginTop: 2},
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    textDisabledColor: disabledColor,
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2}
  };
}