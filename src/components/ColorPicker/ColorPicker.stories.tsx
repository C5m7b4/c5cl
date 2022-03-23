import React from 'react';
import { Story, Meta } from '@storybook/react';

import ColorPickerDemo from './ColorPickerDemo';

export default {
  title: 'Pickers/ColorPicker',
  component: ColorPickerDemo,
} as Meta;

const Template: Story = (args) => <ColorPickerDemo {...args} />;

export const ColorPickerExample = Template.bind({});
ColorPickerExample.args = {};
