import React, { useRef } from 'react';
import LongHand from './LongHand';
import Ticks from './Ticks';

interface FaceProps {
  type: string;
  visible: boolean;
  values: string[];
  selected: number;
  onClick: (h: string) => void;
}

const Face = (props: FaceProps) => {
  const faceRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={faceRef}
      className={`face ${props.type} ${
        props.visible ? ' face-show' : 'face-hide'
      }`}
    >
      {props.values.map((v, i) => {
        return (
          <div
            key={`face-${i}`}
            className={
              'position position-' +
              (i + 1) +
              (parseInt(props.selected.toString()) === parseInt(v)
                ? ' selected'
                : '')
            }
            onClick={() => props.onClick(v)}
          >
            {v}
          </div>
        );
      })}
      <LongHand type={props.type} selected={props.selected} />
      <div className="inner-face"></div>
      <Ticks />
    </div>
  );
};

export default Face;
