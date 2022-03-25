import React, { useState } from 'react';

import RangeSlider, { RangeSliderTheme } from './RangeSlider';
import ToggleSwitch from '../ToggleSwitch';

const RangeSliderDemo = () => {
  const [range, setRange] = useState(25);
  const [theme, setTheme] = useState<RangeSliderTheme>('dark');
  const [enabled, setEnabled] = useState(true);

  const handleChange = (e: number) => {
    setRange(e);
  };

  const handleClick = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    setEnabled(!enabled);
  };

  return (
    <div>
      <h2 style={{ color: `${theme === 'light' ? '#000' : '#fff'}` }}>
        Range Slider Demo
      </h2>
      <ToggleSwitch id={'t1'} active={enabled} handleClick={handleClick} />
      <RangeSlider
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
        value={range}
        linearGradientColor={'#4aa1f3'}
        rangeBackgroundColor={'#d7dcdf'}
        sliderThumbColor={'#4aa1f3'}
        defaultValue={50}
        theme={theme}
      />
    </div>
  );
};

export default RangeSliderDemo;
