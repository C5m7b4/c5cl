import React from 'react';
import { Story, Meta } from '@storybook/react';
import { events } from './events';

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

export const CalendarWithEventsExample = Template.bind({});
CalendarWithEventsExample.args = {
  onChange: handleDateChange,
  date: new Date(2022, 2, 26),
  events: events,
};
