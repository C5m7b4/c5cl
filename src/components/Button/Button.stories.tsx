import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Buttons',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonExample = Template.bind({});
ButtonExample.args = {
  label: 'Click Me',
};
