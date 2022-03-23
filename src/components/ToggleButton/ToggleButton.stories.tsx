import React from 'react';
import { Story, Meta } from '@storybook/react';

import ToggleButton from './ToggleButton';

export default {
  title: 'Forms/Toggle Button',
  component: ToggleButton,
} as Meta;

const children = [
  <div title="tab1">
    <p></p>
  </div>,
  <div title="tab2">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem rem
      adipisci a. Deserunt consequatur labore amet quia modi? Ab explicabo
      cumque tempora sed quo ad quaerat vitae tenetur ipsam blanditiis
      necessitatibus numquam, dolor minus, obcaecati et nulla! Fugiat dolore
      laudantium sunt, optio reprehenderit autem explicabo voluptas officiis
      doloribus ut maiores et veniam consequatur eveniet natus saepe odio
      dolorem cum quidem ullam, dicta, necessitatibus molestiae. Eum, itaque
      quibusdam. Illo perspiciatis libero voluptates error mollitia ab ut
      consequatur iste autem! Ipsam architecto tempore deserunt? Impedit
      laboriosam deleniti nesciunt illo. Blanditiis suscipit autem neque, quod
      impedit praesentium at, excepturi repudiandae totam dolorum temporibus!
    </p>
  </div>,
  <div title="tab3">
    <p>Here is tab 3</p>
  </div>,
];

const Template: Story = (args) => <ToggleButton>{children}</ToggleButton>;

export const ToggleButtonExample = Template.bind({});
ToggleButtonExample.args = {
  children,
};
