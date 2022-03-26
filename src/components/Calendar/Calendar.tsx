import React, { useState, useEffect } from 'react';
import { formatDate, addDays } from '../../utils';
import {
  isSameDay,
  isSameMonth,
  daysInMonth,
  getDateDetails,
} from '../../utils';

import './Calendar.css';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'WednesDay',
  'Thursday',
  'Friday',
  'Saturday',
];

const defaultState = {
  currentMonth: new Date(),
  selectedDate: new Date(),
};

export interface CalendarProps {
  onChange: (d: Date) => void;
  date?: Date;
}

const Calendar = (props: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(defaultState.selectedDate);
  const [currentMonth, setCurrentMonth] = useState(
    props.date || defaultState.currentMonth
  );

  useEffect(() => {}, [currentMonth]);

  const renderHeader = () => {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="calendar-icon prev" onClick={previousMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{formatDate(currentMonth)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="calendar-icon next">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const d = new Date();
    const day = d.getDay();
    const startingDate = addDays(d, -day);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={`cd=${i}`}>
          {daysOfWeek[i]}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const { month, year } = getDateDetails(currentMonth);
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month, daysInMonth(month, year));
    const newDate = new Date();
    const d = monthStart.getDay();
    const startDate = addDays(monthStart, -d);
    const endDate = addDays(monthEnd, 7 - d);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.getDate().toString();
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={`cd=${day}`}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={`cd-row-${day}`}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(day);
    }
  };

  const nextMonth = () => {
    let month = currentMonth.getMonth() + 1;
    let year = currentMonth.getFullYear();
    const day = currentMonth.getDate();
    if (month === 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
    const newDate = new Date(
      month.toString() + '/' + day.toString() + '/' + year.toString()
    );
    setCurrentMonth(newDate);
  };

  const previousMonth = () => {
    let month = currentMonth.getMonth() + 1;
    let year = currentMonth.getFullYear();
    const day = currentMonth.getDate();
    if (month === 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    const newDate = new Date(
      month.toString() + '/' + day.toString() + '/' + year.toString()
    );
    setCurrentMonth(newDate);
  };

  return (
    <div className="c5-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
