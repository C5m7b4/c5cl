import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Hours from './Hours';
import Minutes from './Minutes';
import AmPmInfo from './AmPmInfo';
import { pad } from '../../utils';

import './TimePicker.css';

export type TimePickerReturnValue = Date | string;

export interface TimePickerProps {
  time: Date;
  onChange: (t: TimePickerReturnValue) => void;
  id?: string;
  style?: React.CSSProperties;
  returnShortTime?: boolean;
}

const TimePicker = (props: TimePickerProps) => {
  const [defaultTime, setDefaultTime] = useState(props.time);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showHours, setShowHours] = useState(true);
  const [showMinutes, setShowMinutes] = useState(false);

  const timeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput();
    return () => {
      window.removeEventListener('click', addBackdrop, true);
    };
  }, [defaultTime]);

  const formatTime = () => {
    const newDate = new Date(defaultTime);
    let hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return (
      pad(hours.toString(), 2, '0') + ':' + pad(minutes.toString(), 2, '0')
    );
  };

  const setInput = () => {
    const newDate = formatTime();
    if (timeRef.current) {
      timeRef.current.value = newDate;
    }
  };

  const componentId = props.id
    ? `c5-time-picker-${props.id}`
    : 'c5-time-picker-1';

  const handleTimeClick = () => {
    setShowTimePicker(true);
    window.addEventListener('click', addBackdrop, true);
  };

  const addBackdrop = (e: MouseEvent) => {
    const div = document.querySelector('.mtp-container');
    if (!div) {
      setShowTimePicker(false);
      window.removeEventListener('click', addBackdrop, true);
      return;
    }
    const rect = div.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right) {
      setShowTimePicker(false);
      window.removeEventListener('click', addBackdrop, true);
      return;
    }
    if (e.clientY < rect.top || e.clientY > rect.bottom) {
      setShowTimePicker(false);
      window.removeEventListener('click', addBackdrop, true);
      return;
    }
  };

  const getTimePieces = () => {
    let hour = defaultTime.getHours();
    let minute = defaultTime.getMinutes();
    let ampm = 'AM';
    if (hour >= 12) {
      hour = hour - 12;
      ampm = 'PM';
    }
    let month = defaultTime.getMonth() + 1;
    let day = defaultTime.getDate();
    let year = defaultTime.getFullYear();

    return {
      hour,
      minute,
      month,
      day,
      year,
      ampm,
    };
  };

  const handleHoursChange = (h: number) => {
    const { minute, month, day, year, ampm } = getTimePieces();
    const newDate = new Date(
      month + '/' + day + '/' + year + ' ' + h + ':' + minute + ' ' + ampm
    );
    setShowHours(false);
    setShowMinutes(true);
    setDefaultTime(newDate);
  };

  const handleMinutesChange = (m: number) => {
    const { hour, month, day, year, ampm } = getTimePieces();
    const newDate = new Date(
      month + '/' + day + '/' + year + ' ' + hour + ':' + m + ' ' + ampm
    );
    setDefaultTime(newDate);
  };

  const handleClose = () => {
    if (props.onChange && !props.returnShortTime) {
      props.onChange(defaultTime);
    }
    if (props.onChange && props.returnShortTime) {
      const hour = defaultTime.getHours();
      const minute = defaultTime.getMinutes();
      let ampm = 'AM';
      if (hour >= 12) {
        ampm = 'PM';
      }
      props.onChange(hour + ':' + pad(minute.toString(), 2, '0') + ' ' + ampm);
    }
    setShowTimePicker(false);
  };

  const handleAmPmChange = (b: boolean) => {
    let ampm = 'AM';
    if (!b) {
      ampm = 'PM';
    }
    const { hour, minute, month, day, year } = getTimePieces();
    const newDate = new Date(
      month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ' ' + ampm
    );
    setDefaultTime(newDate);
  };

  return (
    <div id="c5-time-picker" className="c5-time-picker" style={props.style}>
      <div className="c5-tp-input" onClick={handleTimeClick} id={componentId}>
        <input type="time" ref={timeRef} />
      </div>
      {showTimePicker ? (
        <div className="mtp-container clock">
          <div className="clock-face-wrapper">
            <Hours
              visible={showHours}
              time={defaultTime}
              onClick={handleHoursChange}
              onHidden={showHours}
            />
            <Minutes
              visible={showMinutes}
              time={defaultTime}
              onClick={handleMinutesChange}
              onHidden={showMinutes}
            />
          </div>
          <AmPmInfo time={defaultTime} onClick={handleAmPmChange} />
          <div className="close">
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TimePicker;
