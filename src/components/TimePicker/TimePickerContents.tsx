import React, { useState } from 'react';
import Hours from './Hours';
import Minutes from './Minutes';
import AmPmInfo from './AmPmInfo';

export interface TimePickerContentsProps {
  defaultTime: Date;
  setDefaultTime: (t: any) => void;
  handleClose: () => void;
  top: number;
  left: number;
}

const TimePickerContents = (props: TimePickerContentsProps) => {
  const [showHours, setShowHours] = useState(true);
  const [showMinutes, setShowMinutes] = useState(false);

  const { defaultTime, setDefaultTime, handleClose, top, left } = props;

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
    <div
      className="mtp-container clock"
      style={{ position: 'absolute', top: `${top}px`, left: `${left}px` }}
    >
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
  );
};

export default TimePickerContents;
