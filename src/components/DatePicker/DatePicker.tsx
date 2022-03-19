import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { convertToDateFormat, months, getMonthDetails } from './core';
import Tooltip from '../Tooltip';

import './DatePicker.css';

export interface DatePickerProps {
  date: Date;
  onChange: (d: Date) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const [defaultDate, setDefaultDate] = useState(props.date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [monthDetails, setMonthDetails] = useState<any>();

  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput();
    setMonthDetails(
      getMonthDetails(defaultDate.getFullYear(), defaultDate.getMonth())
    );
  }, [defaultDate]);

  const setInput = () => {
    if (dateRef.current) {
      const dateString = convertToDateFormat(new Date(defaultDate).toString());
      console.log('dateString', dateString);
      dateRef.current.value = dateString;
    }
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
    // @ts-ignore
    window.addEventListener('click', addBackdrop);
  };

  const addBackdrop = (e: React.MouseEvent) => {
    const div = document.getElementById('c5-date-picker');
    const node = ReactDOM.findDOMNode(div);
    // @ts-ignore
    if (showDatePicker && !node?.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  const handleMonthChange = (increment: number) => {
    let month = defaultDate.getMonth() + 1 + increment;
    let year = defaultDate.getFullYear();
    console.log('month', month);
    console.log('year', year);
    const day = defaultDate.getDate();
    if (month === 0) {
      month = 12;
      year--;
    } else if (month > 12) {
      year++;
      month = 1;
    }

    const newDate = convertToDateFormat(
      `${year.toString()}-${
        month.toString().length === 1
          ? '0' + month.toString()
          : month.toString()
      }-${day.toString().length === 1 ? '0' + day.toString() : day.toString()}`
    );
    setDefaultDate(new Date(newDate));
  };

  const handleYearChange = (increment: number) => {
    const month = defaultDate.getMonth() + 1;
    const year = defaultDate.getFullYear() + increment;
    const day = defaultDate.getDate();
    const newDate = convertToDateFormat(
      `${year.toString()}-${
        month.toString().length === 1
          ? '0' + month.toString()
          : month.toString()
      }-${day.toString().length === 1 ? '0' + day.toString() : day.toString()}`
    );
    setDefaultDate(new Date(newDate));
  };

  type CalendarDay = {
    date: number;
    day: number;
    dayString: string;
    month: number;
    timestamp: number;
  };

  const isCurrentDay = (day: CalendarDay) => {
    if (day.month === 0 && day.date === defaultDate.getDate()) {
      return true;
    } else {
      return false;
    }
  };

  const isSelectedDay = (day: CalendarDay) => {
    return day.timestamp === defaultDate.getTime();
  };

  const onDateClick = (day: any) => {
    const newDate = new Date(day.timestamp);
    setDefaultDate(newDate);
    if (props.onChange) {
      props.onChange(newDate);
    }
    setShowDatePicker(false);
  };

  const renderCalendar = () => {
    if (monthDetails.length === 0) {
      return <div>There are no results</div>;
    }
    let days = monthDetails.map((day: any, index: number) => {
      return (
        <div
          className={`c-day-container ${day.month !== 0 ? 'disabled' : ''} ${
            isCurrentDay(day) ? ' highlight' : ''
          } ${isSelectedDay(day) ? ' hightlight-green' : ''}`}
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
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div key={i} className="cch-name">
              {d}
            </div>
          ))}
        </div>
        <div className="cc-body">{days}</div>
      </div>
    );
  };

  return (
    <div id="c5-date-picker" className="c5-date-picker">
      <div className="c5-dp-input" onClick={handleDateClick}>
        <input type="date" ref={dateRef} />
      </div>
      {showDatePicker ? (
        <div className="mdp-container">
          <div className="mdp-content-container">
            <div className="mdp-head">
              <div className="mdp-button">
                <div
                  className="mdp-head-button-inner"
                  onClick={() => handleYearChange(-1)}
                >
                  <Tooltip
                    position="bottom"
                    message="Subtract Year"
                    theme="dark"
                  >
                    <span className="mdp-head-button-left-arrows"></span>
                  </Tooltip>
                </div>
              </div>
              <div className="mdp-button">
                <div
                  className="mdp-head-button-inner"
                  onClick={() => handleMonthChange(-1)}
                >
                  <Tooltip
                    position="bottom"
                    message="Subtract month"
                    theme="dark"
                  >
                    <span className="mdp-head-button-left-arrow"></span>
                  </Tooltip>
                </div>
              </div>
              <div className="mdp-head-date">
                <div className="mdp-head-year">{defaultDate.getFullYear()}</div>
                <div className="mdp-head-month">
                  {months[defaultDate.getMonth()]}
                </div>
              </div>
              <div className="mdp-button">
                <div
                  className="mdp-head-button-inner"
                  onClick={() => handleMonthChange(1)}
                >
                  <Tooltip position="bottom" message="Add month" theme="dark">
                    <span className="mdp-head-button-right-arrow"></span>
                  </Tooltip>
                </div>
              </div>
              <div className="mdp-button">
                <div
                  className="mdp-head-button-inner"
                  onClick={() => handleYearChange(1)}
                >
                  <Tooltip position="bottom" message="Add year" theme="dark">
                    <span className="mdp-head-button-right-arrows"></span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="mdp-body">{renderCalendar()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;
