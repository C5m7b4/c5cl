import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import { convertToDateFormat, months, getMonthDetails } from './core';

export interface DatePickerContentsProps {
  componentId: string;
  top: number;
  left: number;
  monthDetails: any;
  setDefaultDate: (d: Date) => void;
  defaultDate: Date;
  onDateClick: (d: any) => void;
}

type CalendarDay = {
  date: number;
  day: number;
  dayString: string;
  month: number;
  timestamp: number;
};

const DatePickerContents = (props: DatePickerContentsProps) => {
  const {
    componentId,
    top,
    left,
    monthDetails,
    setDefaultDate,
    defaultDate,
    onDateClick,
  } = props;

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

  const handleMonthChange = (increment: number) => {
    let month = defaultDate.getMonth() + 1 + increment;
    let year = defaultDate.getFullYear();
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

  const renderCalendar = () => {
    if (typeof monthDetails === 'undefined') return;
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
    <div
      className="mdp-container"
      style={{ position: 'absolute', top: `${top}px`, left: `${left}px` }}
    >
      <div className="mdp-content-container">
        <div className="mdp-head">
          <div className="mdp-button">
            <div
              id={`${componentId}-ly`}
              className="mdp-head-button-inner"
              onClick={() => handleYearChange(-1)}
            >
              <Tooltip position="bottom" message="Subtract Year" theme="dark">
                <span className="mdp-head-button-left-arrows"></span>
              </Tooltip>
            </div>
          </div>
          <div className="mdp-button">
            <div
              className="mdp-head-button-inner"
              id={`${componentId}-lm`}
              onClick={() => handleMonthChange(-1)}
            >
              <Tooltip position="bottom" message="Subtract month" theme="dark">
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
              id={`${componentId}-nm`}
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
              id={`${componentId}-ny`}
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
  );
};

export default DatePickerContents;
