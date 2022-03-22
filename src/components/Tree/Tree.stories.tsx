import React from 'react';
import { Story, Meta } from '@storybook/react';
import { jsonData1 } from './testJson';

import Tree, { TreeProps } from './Tree';

export default {
  title: 'Tree/Tree',
  component: Tree,
} as Meta;

const data = {
  home: 'home',
  childNodes: [
    { title: 'childnode1.1' },
    [
      {
        title: 'childnode2',
        childNodes: [{ title: 'title1' }],
      },
    ],
  ],
};

const data1 = {
  home: 'home',
  first: 'first',
  second: 'second',
};

const Template: Story<TreeProps> = (args) => <Tree {...args} />;

export const TreeExample = Template.bind({});
TreeExample.args = {
  json: data,
};

export const Tree1Example = Template.bind({});
Tree1Example.args = {
  json: jsonData1,
};
