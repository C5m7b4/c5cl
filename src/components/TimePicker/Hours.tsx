import React from 'react';
import Face from './Face';

const Hours = (props: any) => {
  const { time } = props;

  const buildHours = () => {
    var hours = [];
    for (var i = 1; i <= 12; i++) {
      hours.push(i);
    }
    return hours;
  };

  return (
    <Face
      {...props}
      type="hours"
      values={buildHours()}
      selected={time.getHours() >= 12 ? time.getHours() - 12 : time.getHours()}
    />
  );
};

export default Hours;
