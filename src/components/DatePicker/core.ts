const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getDayDetails = (args: any) => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }

  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date =
    date < 0 ? prevMonthNumberOfDays + date : (date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date > args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

export const getMonthDetails = (year: number, month: number) => {
  let firstDay = new Date(year, month).getDate();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

export const getNumberOfDays = (year: number, month: number) => {
  return 40 - new Date(year, month, 40).getDate();
};
