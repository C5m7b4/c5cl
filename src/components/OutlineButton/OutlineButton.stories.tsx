import React from 'react';
import { Story, Meta } from '@storybook/react';

import OutlineButton, { OutlineButtonProps } from './OutlineButton';

export default {
  title: 'Buttons',
  component: OutlineButton,
} as Meta;

const Template: Story<OutlineButtonProps> = (args) => (
  <OutlineButton {...args} />
);

export const SuccessButtonExample = Template.bind({});
SuccessButtonExample.args = {
  text: 'Success',
  onClick: () => console.log('success was clicked'),
  type: 'success',
};

export const InfoButtonExample = Template.bind({});
InfoButtonExample.args = {
  text: 'Info',
  onClick: () => console.log('info was clicked'),
  type: 'info',
};

export const WarningButtonExample = Template.bind({});
WarningButtonExample.args = {
  text: 'Warning',
  onClick: () => console.log('warning was clicked'),
  type: 'warning',
};

export const DangerButtonExample = Template.bind({});
DangerButtonExample.args = {
  text: 'Danger',
  onClick: () => console.log('danger was clicked'),
  type: 'danger',
};

export const DefaultButtonExample = Template.bind({});
DefaultButtonExample.args = {
  text: 'Default',
  onClick: () => console.log('default was clicked'),
  type: 'default',
};

export const DarkButtonExample = Template.bind({});
DarkButtonExample.args = {
  text: 'Default',
  onClick: () => console.log('default was clicked'),
  type: 'dark',
};
