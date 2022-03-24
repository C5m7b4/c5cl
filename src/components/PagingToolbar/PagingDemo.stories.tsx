import React from 'react';
import { Story, Meta } from '@storybook/react';

import PagingDemo from './PagingDemo';

export default {
  title: 'Widgets/PagingDemo',
  component: PagingDemo,
} as Meta;

const Template: Story = (args) => <PagingDemo />;

export const PagingDemoExample = Template.bind({});
