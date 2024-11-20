export function getmarkedDates (ITEMS) {
 return Object.keys(ITEMS).reduce((acc, date) => {
    const hasData = ITEMS[date]?.length > 0;
    if (!hasData) {
      acc[date] = {
        disabled: true,
        disableTouchEvent: true,
        dayTextColor: "gray",
      };
    } else {
      acc[date] = {
        selected: true,
        selectedDayBackgroundColor: "#00AAAF",
        dotColor: "#f2f7f7",
        marked: true,
      };
    }
    return acc;
  }, {});
}
