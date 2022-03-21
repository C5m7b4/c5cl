import React from 'react';
import { Story, Meta } from '@storybook/react';

import TypeAheadDemo from './TypeAheadDemo';

export default {
  title: 'Type Ahead',
  component: TypeAheadDemo,
} as Meta;

const Template: Story = (args) => <TypeAheadDemo {...args} />;

export const TypeAheadDemoExample = Template.bind({});
