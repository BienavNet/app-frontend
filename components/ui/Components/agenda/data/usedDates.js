import moment from "../../../../../src/utils/InstanceMoment";
export const getAllRelevantDates = () => {
  const allDates = [];
  let currentDate = moment().subtract(1, "months").startOf("month");
  const startOfCurrentMonth = moment().startOf("month");
  const endOfCurrentMonth = moment().endOf("month");
  while (currentDate <= endOfCurrentMonth) {
    allDates.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "days");
  }
  let nextMonthDate = startOfCurrentMonth.add(1, "month");
  let endNextMonths = moment().add(4, "months").endOf("month");
  while (nextMonthDate <= endNextMonths) {
    allDates.push(nextMonthDate.format("YYYY-MM-DD"));
    nextMonthDate = nextMonthDate.add(1, "days");
  }
  return allDates;
};
