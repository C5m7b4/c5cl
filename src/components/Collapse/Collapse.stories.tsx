import React from 'react';
import { Meta, Story } from '@storybook/react';

import Collapse, { CollapseProps } from './Collapse';

export default {
  title: 'Collapse/Collapse',
  component: Collapse,
} as Meta;

const Template: Story<CollapseProps> = (args) => <Collapse {...args} />;

export const CollapseExample = Template.bind({});

CollapseExample.args = {
  id: 'collapse1',
  label: 'collapse',
  children: [
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et at commodi
      eum possimus officia doloremque iusto aperiam ut facere perferendis. Vitae
      tenetur, sapiente nam suscipit itaque rerum ad ut, blanditiis delectus
      porro quisquam! Omnis explicabo quidem aliquid consectetur ullam culpa
      incidunt porro, itaque nostrum perspiciatis, sed aliquam sit fugit id.
    </div>,
  ],
};
