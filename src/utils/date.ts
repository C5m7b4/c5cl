const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDateDetails = (d: Date) => {
  const month = d.getMonth();
  const day = d.getDate();
  const year = d.getFullYear();
  return {
    month,
    day,
    year,
  };
};

const daysInMonth = (month: number, year: number) => {
  return 40 - new Date(year, month, 40).getDate();
};

const isSameMonth = (day: Date, monthStart: Date) => {
  return (
    day.getFullYear() === monthStart.getFullYear() &&
    day.getMonth() === monthStart.getMonth()
  );
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
};

const getDayOfDate = (d: Date) => {
  const day = d.getDay();
  return daysOfWeek[day];
};

const getMonthName = (d: Date) => {
  const month = d.getMonth();
  return months[month];
};

export {
  getDateDetails,
  daysInMonth,
  isSameMonth,
  isSameDay,
  getDayOfDate,
  getMonthName,
};
