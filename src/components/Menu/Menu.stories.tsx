import React from 'react';
import { Story, Meta } from '@storybook/react';

import Menu, { MenuProps } from './Menu';
import { menudata } from './menudata';

export default {
  title: 'Widgets/Menu',
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = (args) => <Menu {...args} />;

export const MenuExample = Template.bind({});
MenuExample.args = {
  logo: 'Mikto',
  items: menudata,
};
