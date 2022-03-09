import React from 'react';
import { Story, Meta } from '@storybook/react';

import Tabs, { TabsProps } from './Tabs';

import { Tab1, Tab2 } from './Tab.stories';

export default {
  title: 'Tabs',
  component: Tabs,
} as Meta;

const Template: Story<TabsProps> = (args) => <Tabs {...args} />;

export const TabsExample = Template.bind({});
TabsExample.args = {
  // @ts-ignore
  children: [<Tab1 {...Tab1.args} />, <Tab2 {...Tab2.args} />],
};

export const Tabs1Example = Template.bind({});
Tabs1Example.args = {
  children: [
    // @ts-ignore
    <div label="Tab1">
      <h2>I am tab 1</h2>
    </div>,
    // @ts-ignore
    <div label="Tab2">
      <h2>I am tab 2</h2>
    </div>,
  ],
};
