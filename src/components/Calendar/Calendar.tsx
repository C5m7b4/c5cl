import React, { useState, useEffect } from 'react';
import { formatDate, addDays } from '../../utils';
import EventViewer from './Events/EventViewer';
import EventList from './Events/EventList';

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

export interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  description: string;
  start?: string;
  end?: string;
}

export interface CalendarProps {
  onChange: (d: Date) => void;
  date?: Date;
  events?: CalendarEvent[];
}

const Calendar = (props: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(defaultState.selectedDate);
  const [currentMonth, setCurrentMonth] = useState(
    props.date || defaultState.currentMonth
  );
  const [showEventViewer, setShowEventViewer] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [showEventList, setShowEventList] = useState(false);
  const [currentEventsList, setCurrentEventList] = useState<CalendarEvent[]>(
    []
  );

  let uniqueId = 0;

  useEffect(() => {}, [currentMonth]);

  const getUniqueId = () => {
    uniqueId++;
    return uniqueId;
  };

  const hideEventViewer = () => {
    const div = document.querySelector('.calendar-modal') as HTMLDivElement;
    /* istanbul ignore else */
    if (div) {
      div.style.animationName = 'fadeOutEvent';
      setTimeout(() => {
        setShowEventViewer(false);
      }, 300);
    }
  };

  const hideEventList = () => {
    const div = document.querySelector('.calendar-modal') as HTMLDivElement;
    /* istanbul ignore else */
    if (div) {
      div.style.animationName = 'fadeOutEvent';
      setTimeout(() => {
        setShowEventList(false);
      }, 300);
    }
  };

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

  const displayEventDetails = (event: CalendarEvent) => {
    setShowEventList(false);
    setCurrentEvent(event);
    setShowEventViewer(true);
  };

  const displayEventList = (e: CalendarEvent[]) => {
    setShowEventViewer(false);
    setCurrentEventList(e);
    setShowEventList(true);
  };

  const handleEventViewerOK = (e: CalendarEvent) => {};

  const formatShortDate = (d: Date) => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return month.toString() + day.toString() + year.toString();
  };

  const renderTodaysEvents = (day: Date) => {
    // @ts-ignore
    const eventsArray = [];
    /* istanbul ignore else */
    if (!props.events) {
      return;
    }
    const filteredEvents = props.events.filter(
      (e) => formatDate(e.date) === formatDate(day)
    );
    if (filteredEvents && filteredEvents.length > 0) {
      if (filteredEvents.length > 2) {
        eventsArray.push(
          <span
            key={`ear-${getUniqueId()}`}
            className="event-list"
            onClick={() => displayEventList(filteredEvents)}
            data-testid="event-list"
          >
            Events...({filteredEvents.length})
          </span>
        );
      } else {
        filteredEvents.map((event, idx) => {
          eventsArray.push(
            <span
              key={`ced-${idx}-${getUniqueId()}`}
              className={`event-${idx % 2 === 0 ? 'one' : 'two'} `}
              onClick={() => displayEventDetails(event)}
              title={event.title}
              data-testid={`event-${idx}-${formatShortDate(day)}`}
            >
              {event.title}
            </span>
          );
        });
      }
    }
    // @ts-ignore
    return <span key={`events-array-${getUniqueId()}`}>{eventsArray}</span>;
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
            <span>{renderTodaysEvents(day)}</span>
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
      <div className="modal-placeholder" id="modal-placeholder">
        <EventViewer
          hide={hideEventViewer}
          show={showEventViewer}
          event={currentEvent}
          handleClick={handleEventViewerOK}
        />
        <EventList
          show={showEventList}
          events={currentEventsList}
          hide={hideEventList}
        />
      </div>
    </div>
  );
};

export default Calendar;
