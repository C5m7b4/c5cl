import React from 'react';
import { Story, Meta } from '@storybook/react';

import IconsDemo from './IconsDemo';

export default {
  title: 'Icons',
  component: IconsDemo,
} as Meta;

const Template: Story = (args) => <IconsDemo />;

export const IconsDemoExample = Template.bind({});
