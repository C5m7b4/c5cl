import React from 'react';
import { Story, Meta } from '@storybook/react';

import ProgressBar, { ProgressBarProps } from './ProgressBar';

export default {
  title: 'Progress/ProgressBar',
  component: ProgressBar,
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const ProgressBarExample = Template.bind({});
ProgressBarExample.args = {
  msg: 'Progress',
  max: 100,
  progress: 50,
  // msgStyle: {
  //   transform: 'translateY(-25px) translateX(100px)',
  //   color: 'rgb(22 10 90)',
  // },
};
