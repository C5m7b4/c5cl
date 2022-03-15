import React from 'react';
import { Story, Meta } from '@storybook/react';

import Tree2, { TreeProps } from './Tree2';

export default {
  title: 'Tree2',
  component: Tree2,
} as Meta;

const data = {
  error: 0,
  success: true,
  storeName: 'Crossroads 773',
  stores: [
    {
      storeid: 1,
    },
    {
      storeid: 2,
    },
  ],
};

const Template: Story<TreeProps> = (args) => <Tree2 {...args} />;

export const Tree2Example = Template.bind({});
Tree2Example.args = {
  json: data,
};
