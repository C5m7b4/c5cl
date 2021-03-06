import React from 'react';
import { Story, Meta } from '@storybook/react';

import TextInput, { TextInputProps } from './TextInput';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const TextInputExample = Template.bind({});
TextInputExample.args = {
  id: 't1',
  name: 't1',
  label: 'This is my input',
  type: 'text',
  placeholder: 'Enter your name',
  value: 'Mike',
};

export const TextInputReadOnlyExample = Template.bind({});
TextInputReadOnlyExample.args = {
  id: 't1',
  name: 't1',
  label: 'This is my input',
  type: 'text',
  placeholder: 'Enter your name',
  readOnly: true,
};
