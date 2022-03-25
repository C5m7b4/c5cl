import React from 'react';
import { Story, Meta } from '@storybook/react';

import Searchbox, { SearchboxProps } from './Searchbox';

export default {
  title: 'Forms/Searchbox',
  component: Searchbox,
} as Meta;

const Template: Story<SearchboxProps> = (args) => <Searchbox {...args} />;

export const SearchboxExample = Template.bind({});
SearchboxExample.args = {
  placeholder: 'Search',
};
