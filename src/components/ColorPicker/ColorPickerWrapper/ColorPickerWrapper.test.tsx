import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ColorPickerWrapper from './ColorPickerWrapper';

const Harness = () => {
  const handleChange = () => {};

  return (
    <div>
      <div className="closeme"></div>
      <ColorPickerWrapper color={'#fff'} onChange={handleChange} />
    </div>
  );
};

describe('ColorPickerWrapper', () => {
  test('should render correctly', () => {
    const testfn = jest.fn();
    const { container } = render(
      <ColorPickerWrapper color={'#fff'} onChange={testfn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle click', () => {
    const testfn = jest.fn();
    const { container } = render(
      <ColorPickerWrapper color={'#fff'} onChange={testfn} />
    );

    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);
  });
  test('should handle close', () => {
    const { container } = render(<Harness />);

    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);

    const close = container.querySelector('.closeme') as HTMLDivElement;
    fireEvent.click(close);
  });
});
