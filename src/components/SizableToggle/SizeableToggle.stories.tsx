import React from 'react';
import { Story, Meta } from '@storybook/react';

import SizeableToggle, { SizeableToggleProps } from './SizableToggle';

export default {
  title: 'Toggles/Sizable Toggle',
  component: SizeableToggle,
} as Meta;

const Template: Story<SizeableToggleProps> = (args) => (
  <SizeableToggle {...args} />
);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('isChecked', e.target.checked);
};

export const SizeableToggleExample = Template.bind({});
SizeableToggleExample.args = {
  name: 'T1',
  id: 'T1',
  onText: 'Yes',
  offText: 'No',
  small: false,
  disabled: false,
  checked: true,
  onChange: handleChange,
};
