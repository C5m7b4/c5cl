import React from 'react';
import { Story, Meta } from '@storybook/react';

import Treeview, { TreeviewProps } from './Treeview';

export default {
  title: 'Treeview',
  component: Treeview,
} as Meta;

const data = {
  home: {
    link1: 'link1',
    link2: {
      url: 'www.google.com',
      sites: [
        'site1',
        'site2',
        {
          content: 'porn',
        },
        {
          rating: 'x',
        },
      ],
    },
  },
  buttons: 'Buttons',
};

const data1 = {
  home: 'home',
  home1: 'home1',
};

const Template =
  <T extends {}>(): Story<TreeviewProps<T>> =>
  (args) =>
    <Treeview {...args} />;

export const TreeviewExample = Template<object>().bind({});
TreeviewExample.args = {
  data: data1,
  toggled: true,
  name: 'Treeview 1',
  isLast: false,
  isChildElement: false,
  isParentToggled: false,
};
