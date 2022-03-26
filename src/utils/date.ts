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

export { getDateDetails, daysInMonth, isSameMonth, isSameDay };
