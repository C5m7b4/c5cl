// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { getMonthDetails } from './core';
import './DatePicker.css';

export interface DatePickerProps {
  onChange: (n: number) => void;
  startDate: Date;
}

export type DatePickerMonthDetails = {
  year: number;
  month: number;
  monthDetails: string[];
};

const DatePicker = (props: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(props.startDate);
  const [dateVars, setDateVars] = useState<DatePickerMonthDetails>({
    year: 0,
    month: 0,
    monthDetails: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('showDatePicker', showDatePicker);
    window.addEventListener('click', addBackdrop);

    // debugger;
    // const month = props.startDate.getMonth();
    // const year = props.startDate.getFullYear();
    // setDateVars({
    //   year: year,
    //   month: month,
    //   montDetails: getMonthDetails(year, month),
    // });

    return () => {
      window.removeEventListener('click', addBackdrop);
    };
  }, []);

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const monthMap = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Auguest',
    'September',
    'October',
    'November',
    'December',
  ];

  const isSelectedDay = (day: any) => {
    return day.timestamp === selectedDay;
  };

  const isCurrentDay = (day: any) => {
    return day.timeStamp === selectedDay;
  };

  const getDateFromDateString = (dateValue: string) => {
    let dateData = dateValue.split('-').map((d) => parseInt(d, 10));
    if (dateData.length < 3) {
      return null;
    }

    let year = dateData[0];
    let month = dateData[1];
    let date = dateData[2];

    return { year, month, date };
  };

  const getMonthStr = (month: number) =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const getDateStringFromTimestamp = (timestamp: any) => {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() - 1;
    let date = dateObject.getDate();
    return (
      dateObject.getFullYear() +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date)
    );
  };

  const setDate = (dateData: any) => {
    let selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();
    setSelectedDay(selectedDay);
    if (props.onChange) {
      props.onChange(selectedDay);
    }
  };

  const updateDateFromInput = () => {
    if (inputRef.current) {
      let dateValue = inputRef.current.value;
      let dateData = getDateFromDateString(dateValue);
      if (dateData !== null) {
        setDate(dateData);
        setDateVars({
          year: dateData.year,
          month: dateData.month - 1,
          monthDetails: getMonthDetails(dateData.year, dateData.month - 1),
        });
      }
    }
  };

  const setDateToInput = (timestamp: any) => {
    let dateString = getDateStringFromTimestamp(timestamp);
    if (inputRef.current) {
      inputRef.current.value = dateString;
    }
  };

  const onDateClick = (day: any) => {
    setSelectedDay(day.timestamp);
    //  setDateToInput goes here
    setDateToInput(day.timestamp);
    if (props.onChange) {
      props.onChange(day.timestamp);
    }
  };

  const setYear = (offset: number) => {
    let year = dateVars.year + offset;
    let month = dateVars.month;
    setDateVars({
      ...dateVars,
      year,
      monthDetails: getMonthDetails(year, month),
    });
  };

  const setMonth = (offset: number) => {
    let year = dateVars.year;
    let month = dateVars.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    setDateVars({
      ...dateVars,
      year,
      month,
      monthDetails: getMonthDetails(year, month),
    });
  };

  const renderCalendar = () => {
    let days = dateVars.monthDetails.map((day: any, index: number) => {
      return (
        <div
          className={`c-day-container ${day.month !== 0 ? ' disabled' : ''} ${
            isCurrentDay(day) ? ' highlight' : ''
          } ${isSelectedDay(day) ? ' highlight-green' : ''}`}
          key={index}
        >
          <div className="cdc-day">
            <span onClick={() => onDateClick(day)}>{day.date}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="c-container">
        <div className="cc-head">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SATT'].map((d, i) => (
            <div key={i} className="cch-name">
              {d}
            </div>
          ))}
        </div>
        <div className="cc-body">{days}</div>
      </div>
    );
  };

  const addBackdrop = (e: any) => {
    console.log('e', e.target);
    console.log('showDatePicker', showDatePicker);
  };

  const handleClick = (show: boolean) => {
    console.log('click', show);
    setShowDatePicker(show);
  };

  return (
    <div className="mcl-date-picker">
      <div className="mcl-dp-input" onClick={() => handleClick(true)}>
        <input type="date" onChange={updateDateFromInput} ref={inputRef} />
      </div>
      {showDatePicker ? (
        <div className="mcl-dp-container">
          <div className="mdpc-head">
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setYear(-1)}>
                <span className="mdpchbi-left-arrows"></span>
              </div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(-1)}>
                <span className="mdpchbi-left-arrow"></span>
              </div>
            </div>
            <div className="mdpch-container">
              <div className="mdpchc-year">{dateVars.year}</div>
              <div className="mdpchc-month">{getMonthStr(dateVars.month)}</div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(1)}>
                <span className="mdpchbi-right-arrow"></span>
              </div>
            </div>
            <div className="mdpch-button" onClick={() => setYear(1)}>
              <div className="mdpchb-inner">
                <span className="mdpchbi-right-arrows"></span>
              </div>
            </div>
          </div>
          <div className="mdpc-body">{renderCalendar()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;
