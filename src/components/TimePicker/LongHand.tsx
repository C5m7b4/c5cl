import React from 'react';

export interface LongHandProps {
  selected: number;
  type: string;
}

const LongHand = (props: LongHandProps) => {
  const deg = (props.selected / (props.type === 'hours' ? 12 : 60)) * 360;
  return (
    <div>
      <div
        className="long-hand"
        style={{
          transform: `rotate(${deg}deg) scale(1, 0.8)`,
          WebkitTransform: `rotate(${deg}deg) scale(1, 0.8)`,
        }}
      ></div>
      <div className="long-hand-attachment"></div>
    </div>
  );
};

export default LongHand;
