import React, { useState, useEffect } from 'react';

import './ProgressBar.css';

export interface ProgressBarProps {
  msg: string;
  max: number;
  progress: number;
  opacity?: number;
  msgStyle?: React.CSSProperties;
}

const ProgressBar = (props: ProgressBarProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [progress, setProgress] = useState(0);

  const {
    opacity = 1,
    msgStyle = {
      color: 'rgb(22 10 90)',
      transform: 'translateX(100px) translateY(-25px)',
    },
  } = props;

  useEffect(() => {
    const currentProgress = (props.progress / props.max) * 100;
    setProgress(currentProgress);

    const newStyle = {
      opacity: opacity,
      width: `${currentProgress}%`,
    };

    setStyle(newStyle);
  }, [props.progress]);

  return (
    <div className="mcl-progress-bar">
      <div className="mcl-progress-done" style={style} />
      <div
        className="mcl-progress-msg"
        style={msgStyle}
      >{`${props.msg} ${progress}`}</div>
    </div>
  );
};

export default ProgressBar;
