import React, { useState, useEffect, useRef } from 'react';
import TimePickerContents from './TimePickerContents';
import Modal from '../ColorPicker/Modal/Modal';
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
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const timeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput();
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
    /* istanbul ignore else */
    if (timeRef.current) {
      timeRef.current.value = newDate;
    }
  };

  const componentId = props.id
    ? `c5-time-picker-${props.id}`
    : 'c5-time-picker-1';

  const handleTimeClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    /* istanbul ignore else */
    if (timeRef.current) {
      const rect = timeRef.current.getBoundingClientRect();
      setTop(event.clientY - window.innerHeight / 2 + rect.height);
    }

    setLeft(event.clientX - window.innerWidth / 2 - 80);
    setShowTimePicker(true);
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

  return (
    <div id="c5-time-picker" className="c5-time-picker" style={props.style}>
      <div className="c5-tp-input" onClick={handleTimeClick} id={componentId}>
        <input type="time" ref={timeRef} />
      </div>
      {showTimePicker ? (
        <Modal show={showTimePicker} onClose={() => setShowTimePicker(false)}>
          <TimePickerContents
            defaultTime={defaultTime}
            setDefaultTime={setDefaultTime}
            handleClose={handleClose}
            top={top}
            left={left}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default TimePicker;
