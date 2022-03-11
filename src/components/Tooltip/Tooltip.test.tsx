import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Tooltip from './Tooltip';
import { act } from 'react-dom/test-utils';

describe('Tooltip', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Tooltip position="top" message="tooltip">
        <h2>Hello</h2>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle some style', () => {
    const { container } = render(
      <Tooltip
        position="top"
        message="tooltip"
        style={{ backgroundColor: 'red' }}
      >
        <h2>Hello</h2>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle mouseOver', () => {
    const { container, getByRole, unmount } = render(
      <Tooltip position="top" message="tooltip">
        <div>Hello</div>
      </Tooltip>
    );
    const header = container.querySelector(
      '.mcl-tooltip-trigger'
    ) as HTMLDivElement;
    fireEvent.mouseOver(header);
    fireEvent.mouseLeave(header);
    fireEvent.mouseOut(header);
  });
  test('should run useEffect cleanup return function', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    const { unmount } = render(
      <Tooltip position="top" message="tooltip">
        <div>Hello</div>
      </Tooltip>
    );
    unmount();
  });
});
