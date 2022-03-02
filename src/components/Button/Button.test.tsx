import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  test('renders the button component', () => {
    render(<Button label="Click Me" />);
  });
  test('should render without crashing', () => {
    const frag = render(<Button label="clickme" />);
    expect(frag).toMatchSnapshot();
  });
});
