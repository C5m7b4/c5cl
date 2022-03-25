import React, { useState, useRef, useEffect } from 'react';

import './RangeSlider.css';
export type RangeSliderTheme = 'light' | 'dark';

export interface RangeSliderProps {
  step: number;
  min: number;
  max: number;
  value: number;
  onChange: (e: number) => void;
  linearGradientColor?: string;
  rangeBackgroundColor?: string;
  sliderThumbColor?: string;
  defaultValue?: number;
  theme?: RangeSliderTheme;
}

const RangeSlider = (props: RangeSliderProps) => {
  const {
    step,
    min,
    max,
    value,
    linearGradientColor = '#4aa1f3',
    rangeBackgroundColor = '#d7dcdf',
    sliderThumbColor = '#4aa1f3',
    defaultValue = 0,
    theme = 'dark',
  } = props;

  const [range, setRange] = useState(defaultValue);

  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    rangeLinearGradient(value, min, max);
    setRange(value);
    /* istanbul ignore else */
    if (rangeRef.current) {
      rangeRef.current.style.setProperty(
        '--slider-thumb-color',
        `${sliderThumbColor}`
      );
    }
  }, [sliderThumbColor]);

  const calculatePercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100 + '%';
  };

  const rangeLinearGradient = (value: number, min: number, max: number) => {
    const percentage = calculatePercentage(value, min, max);
    const newBackgroundStyle = `linear-gradient(90deg, ${linearGradientColor} ${percentage} 0%, ${rangeBackgroundColor} ${percentage} 100%)`;
    /* istanbul ignore else */
    if (rangeRef.current) {
      rangeRef.current.style.background = newBackgroundStyle;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(+e.target.value);
    }
    setRange(+e.target.value);
    rangeLinearGradient(+e.target.value, min, max);
  };

  return (
    <div>
      <div className="slider-container">
        <input
          data-testid="slider"
          ref={rangeRef}
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
        <span className="range-slider-value">{range}</span>
        <div className="range-min-max-values">
          <span style={{ color: `${theme === 'light' ? '#000' : '#fff'}` }}>
            {min}
          </span>
          <span style={{ color: `${theme === 'light' ? '#000' : '#fff'}` }}>
            {max}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
