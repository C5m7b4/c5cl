import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Tab from './Tab';

describe('Tab', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const { container } = render(
      <Tab
        id="tab1"
        disabled={false}
        label="Tab1"
        className="tab1"
        onClick={testFn}
        activeTab="tab1"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should be active tab', () => {
    const testFn = jest.fn();
    const { container } = render(
      <Tab
        id="tab1"
        disabled={false}
        label="tab1"
        className="tb1"
        onClick={testFn}
        activeTab="tab1"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle click', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <Tab
        id="tab1"
        disabled={false}
        label="tab1"
        className="tb1"
        onClick={testFn}
        activeTab="tab1"
      />
    );
    const li = getByRole('listitem');
    const click = fireEvent.click(li);
  });
});
