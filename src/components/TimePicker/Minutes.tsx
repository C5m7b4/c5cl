import React from 'react';
import Face from './Face';
import { pad } from '../../utils';

const Minutes = (props: any) => {
  const { time } = props;

  const buildMinutes = () => {
    var minutes = [];
    for (var i = 1; i <= 12; i++) {
      let val = (i === 12 ? 0 : i) * 5;
      minutes.push(pad(val.toString(), 2, '0'));
    }
    return minutes;
  };

  return (
    <Face
      {...props}
      type="minutes"
      values={buildMinutes()}
      selected={props.time.getMinutes()}
    />
  );
};

export default Minutes;
