import React from 'react';
import { Story, Meta } from '@storybook/react';

import DatePicker, { DatePickerProps } from './DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

const handleDateChange = (d: number) => {
  console.log('the time is', d);
};

export const DatePickerExample = Template.bind({});
DatePickerExample.args = {
  onChange: handleDateChange,
  startDate: new Date(),
};
