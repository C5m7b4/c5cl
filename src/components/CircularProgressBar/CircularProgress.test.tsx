import React from 'react';
import { render } from '@testing-library/react';

import CircularProgressBar from './CircularProgressBar';

describe('CircularProgressBar', () => {
  test('should render correctly', () => {
    const { container } = render(
      <CircularProgressBar
        progress={25}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should with score above 50', () => {
    const { container } = render(
      <CircularProgressBar
        progress={55}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should with score below 25', () => {
    const { container } = render(
      <CircularProgressBar
        progress={20}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should with score above 75', () => {
    const { container } = render(
      <CircularProgressBar
        progress={80}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should with percent', () => {
    const { container } = render(
      <CircularProgressBar
        progress={80}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render with score > 100', () => {
    const { container } = render(
      <CircularProgressBar
        progress={110}
        size={150}
        strokeWidth={15}
        circleStrokeOne={'#ff0000'}
        showPercent={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
