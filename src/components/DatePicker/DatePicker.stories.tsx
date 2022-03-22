import React from 'react';
import { Story, Meta } from '@storybook/react';

import DatePicker, { DatePickerProps } from './DatePicker';

export default {
  title: 'Pickers/DatePicker1',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const DatePickerExample = Template.bind({});
DatePickerExample.args = {
  date: new Date(),
};
