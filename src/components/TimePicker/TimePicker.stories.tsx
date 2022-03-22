import React from 'react';
import { Story, Meta } from '@storybook/react';

import TimePicker, {
  TimePickerProps,
  TimePickerReturnValue,
} from './TimePicker';

export default {
  title: 'Pickers/Time Picker',
  component: TimePicker,
} as Meta;

const handleTimeChange = (e: TimePickerReturnValue) => console.log(e);

const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} />;

export const TimePickerExample = Template.bind({});
TimePickerExample.args = {
  time: new Date('3/20/2022 3:15 PM'),
  onChange: handleTimeChange,
  returnShortTime: true,
};
