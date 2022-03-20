import React from 'react';
import { pad } from '../../utils';

export interface AmPMInfoProps {
  time: Date;
  onClick: (b: boolean) => void;
}

const AmPmInfo = (props: AmPMInfoProps) => {
  let am = true;
  if (props.time.getHours() >= 12) {
    am = false;
  }
  const getTimeString = (hour: number, minute: number) => {
    let am = true;
    if (hour >= 12) {
      am = false;
    }
    return (
      hour + ':' + pad(minute.toString(), 2, '0') + ' ' + (am ? 'AM' : 'PM')
    );
  };
  const { time } = props;
  return (
    <div className="am-pm-info">
      <div
        className={'am' + (am ? ' selected' : '')}
        onClick={() => props.onClick(true)}
      >
        AM
      </div>
      <div className="time">
        {getTimeString(time.getHours(), time.getMinutes())}
      </div>
      <div
        className={'pm' + (!am ? ' selected' : '')}
        onClick={() => props.onClick(false)}
      >
        PM
      </div>
    </div>
  );
};

export default AmPmInfo;
