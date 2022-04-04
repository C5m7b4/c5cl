import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import DatePickerContents from './DatePickerContents';
import { convertToDateFormat, months, getMonthDetails } from './core';

import Modal from '../ColorPicker/Modal/Modal';

import './DatePicker.css';

export interface DatePickerProps {
  date: Date;
  onChange: (d: Date) => void;
  id?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const [defaultDate, setDefaultDate] = useState(props.date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [monthDetails, setMonthDetails] = useState<any>();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const componentId = props.id ? `c5-dp-${props.id}` : 'c5-dp-1';

  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput();
    setMonthDetails(
      getMonthDetails(defaultDate.getFullYear(), defaultDate.getMonth())
    );
    return () => {
      //window.removeEventListener('click', addBackdrop, true);
    };
  }, [defaultDate]);

  const setInput = () => {
    /* istanbul ignore else */
    if (dateRef.current) {
      const dateString = convertToDateFormat(new Date(defaultDate).toString());
      dateRef.current.value = dateString;
    }
  };

  const handleDateClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setTop(event.clientY - window.innerHeight / 2);
    setLeft(event.clientX - window.innerWidth / 2 - 150);
    setShowDatePicker(true);
  };

  const onDateClick = (day: any) => {
    const newDate = new Date(day.timestamp);
    setDefaultDate(newDate);
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(newDate);
    }
    setShowDatePicker(false);
  };

  return (
    <div id="c5-date-picker" className="c5-date-picker">
      <div className="c5-dp-input" onClick={handleDateClick} id={componentId}>
        <input type="date" ref={dateRef} />
      </div>

      <Modal show={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DatePickerContents
          top={top}
          left={left}
          defaultDate={defaultDate}
          componentId={componentId}
          monthDetails={monthDetails}
          setDefaultDate={setDefaultDate}
          onDateClick={onDateClick}
        />
      </Modal>
    </div>
  );
};

export default DatePicker;
