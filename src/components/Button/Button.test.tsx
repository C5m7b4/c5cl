import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  test('renders the button component', () => {
    render(<Button label="Click Me" />);
  });
  test('should render without crashing', () => {
    const frag = render(<Button label="clickme" />);
    expect(frag).toMatchSnapshot();
  });
  test('should handle normal type', () => {
    const { container } = render(<Button label="clickme" type="normal" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle green type', () => {
    const { container } = render(<Button label="clickme" type="green" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle purple type', () => {
    const { container } = render(<Button label="clickme" type="purple" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle danger type', () => {
    const { container } = render(<Button label="clickme" type="danger" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle info type', () => {
    const { container } = render(<Button label="clickme" type="info" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle success type', () => {
    const { container } = render(<Button label="clickme" type="success" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle error type', () => {
    const { container } = render(<Button label="clickme" type="error" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
});
