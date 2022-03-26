import React from 'react';
import { Story, Meta } from '@storybook/react';

import Calendar, { CalendarProps } from './Calendar';

export default {
  title: 'Widgets/Calendar',
  component: Calendar,
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

const handleDateChange = (d: Date) => {
  console.log(d);
};

export const CalendarExample = Template.bind({});
CalendarExample.args = {
  onChange: handleDateChange,
  date: new Date(2022, 2, 26),
};
