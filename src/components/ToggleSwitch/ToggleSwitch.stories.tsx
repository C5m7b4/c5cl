import React from 'react';
import { Meta, Story } from '@storybook/react';

import ToggleSwitch, { ToggleSwitchProps } from './ToggleSwitch';

export default {
  title: 'Toggles/ToggleSwitch',
  component: ToggleSwitch,
};

const Template: Story<ToggleSwitchProps> = (args) => <ToggleSwitch {...args} />;

const handleClick = (id: string, b: boolean) => {
  console.log('i have been clicked', b, id);
};

export const ToggleSwitchExample = Template.bind({});
ToggleSwitchExample.args = {
  active: true,
  id: 'toggle1',
  handleClick,
};
