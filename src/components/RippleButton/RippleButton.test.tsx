import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import RippleButton from './RippleButton';

// afterEach(cleanup);

// beforeAll(() =>
//   jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
// );
// // @ts-ignore
// afterAll(() => React.useEffect.mockRestore());

describe('RippleButton', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const frag = render(<RippleButton text="Click Me" onClick={testFn} />);

    expect(frag).toMatchSnapshot();
  });
  test('should handle click event', () => {
    jest.useFakeTimers('modern');
    const testFn = jest.fn();
    render(<RippleButton text="Click Me" onClick={testFn} />);

    fireEvent.click(screen.getByText('Click Me'));
  });
  test('should simulate a mouse leave event', () => {
    const testFn = jest.fn();
    render(<RippleButton text="Click Me" onClick={testFn} />);

    fireEvent.hover(screen.getByText('Click Me'));
    fireEvent.unhover(screen.getByText('Click Me'));
  });
  test('should unmount', () => {
    jest.useFakeTimers();
    const testFn = jest.fn();
    const { container, unmount, rerender } = render(
      <RippleButton text="Click Me" onClick={testFn} />
    );
    rerender(<RippleButton text="Click Me again" onClick={testFn} />);
    unmount();
    jest.advanceTimersByTime(500);
  });
});
