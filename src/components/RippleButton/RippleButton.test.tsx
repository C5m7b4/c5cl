import React from 'react';
import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import RippleButton from './RippleButton';

describe('RippleButton', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const frag = render(<RippleButton text="Click Me" onClick={testFn} />);

    expect(frag).toMatchSnapshot();
  });
  test('should handle click event', () => {
    const testFn = jest.fn();
    render(<RippleButton text="Click Me" onClick={testFn} />);

    fireEvent.click(screen.getByText('Click Me'));
  });
});