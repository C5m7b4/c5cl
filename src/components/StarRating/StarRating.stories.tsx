import React from 'react';
import { Story, Meta } from '@storybook/react';

import StarRating, { StarRatingProps } from './StarRating';

export default {
  title: 'Widgets/Star Rating',
  component: StarRating,
} as Meta;

const Template: Story<StarRatingProps> = (args) => <StarRating {...args} />;

export const StarRatingExample = Template.bind({});
