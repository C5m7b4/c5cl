import React from 'react';
import { Story, Meta } from '@storybook/react';

import Collapsible, { CollapsibleProps } from './Collapsible';

export default {
  title: 'Collapse/Collapsible',
  component: Collapsible,
} as Meta;

const Template: Story<CollapsibleProps> = (args) => <Collapsible {...args} />;

export const CollapsibleExample = Template.bind({});

CollapsibleExample.args = {
  label: 'Test Div',
  children: [
    <div>
      <h2>Here is a collapsible</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa molestias
        officiis ab reiciendis tempore culpa, recusandae at non ducimus minus
        repellat rerum explicabo eum distinctio maiores sapiente voluptatum
        praesentium expedita exercitationem dolorem ipsum qui. Nisi, eveniet
        perspiciatis officiis illo rem voluptate harum in, iste dicta, quo
        cupiditate rerum. Iure, repellendus!
      </p>
    </div>,
  ],
};

export const CollapsibleExample1 = Template.bind({});
CollapsibleExample1.args = {
  label: 'Test Div 1',
  children: [<div>Here is another Collapsible</div>],
};
