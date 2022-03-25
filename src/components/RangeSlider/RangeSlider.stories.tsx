import React from 'react';
import { Story, Meta } from '@storybook/react';

import RangeSlider, { RangeSliderProps } from './RangeSlider';

export default {
  title: 'Forms/RangeSlider',
  component: RangeSlider,
};

const Template: Story<RangeSliderProps> = (args) => <RangeSlider {...args} />;

export const RangeSliderExample = Template.bind({});
RangeSliderExample.args = {
  min: 0,
  max: 100,
  value: 50,
  step: 1,
  defaultValue: 75,
  linearGradientColor: '#4aa1f3',
  rangeBackgroundColor: '#d7dcdf',
  sliderThumbColor: '#ff0000',
};
