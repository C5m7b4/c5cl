import React from 'react';
import { Story, Meta } from '@storybook/react';

import RangeSliderDemo from './RangeSliderDemo';

export default {
  title: 'Forms/Range Slider Demo',
  component: RangeSliderDemo,
} as Meta;

const Template: Story = (args) => <RangeSliderDemo {...args} />;

export const RangeSliderDemoExample = Template.bind({});
