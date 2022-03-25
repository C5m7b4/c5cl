import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RangeSlider from './RangeSlider';

const testfn = jest.fn();

describe('RangeSlider', () => {
  test('should render correctly', () => {
    const { container } = render(
      <RangeSlider min={0} max={100} step={1} value={50} onChange={testfn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle theme', () => {
    const { container } = render(
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={50}
        onChange={testfn}
        theme="light"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle click event', () => {
    const { container, getByTestId } = render(
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={50}
        onChange={testfn}
        theme="light"
      />
    );
    const slider = screen.getByTestId('slider');
    fireEvent.change(getByTestId('slider'), { target: { value: 25 } });
  });
});
