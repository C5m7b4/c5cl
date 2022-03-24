import React from 'react';
import { Story, Meta } from '@storybook/react';

import TooltipDemo, { TooltipDemoProps } from './TooltipDemo';

export default {
  title: 'Widgets/Tooltip',
  component: TooltipDemo,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<TooltipDemoProps> = (args) => <TooltipDemo {...args} />;

export const TooltipDemoExampleTop = Template.bind({});
TooltipDemoExampleTop.args = {
  position: 'top',
  message: 'Top Tooltip',
  theme: 'light',
  messageStyle: {
    padding: '20px',
  },
};

export const TooltipDemoExampleBottom = Template.bind({});
TooltipDemoExampleBottom.args = {
  position: 'bottom',
  message: 'Bottom Tooltip',
};

export const TooltipDemoExampleLeft = Template.bind({});
TooltipDemoExampleLeft.args = {
  position: 'left',
  message: 'Left Tooltip',
};

export const TooltipDemoExampleRight = Template.bind({});
TooltipDemoExampleRight.args = {
  position: 'right',
  message: 'Right Tooltip',
};
