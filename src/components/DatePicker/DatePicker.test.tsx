import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import DatePicker from './DatePicker';

describe('DatePicker', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const { container } = render(
      <DatePicker onChange={testFn} date={new Date('1/1/2022')} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle year change', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <DatePicker onChange={testFn} date={new Date('1/1/2022')} id="1" />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    const btn1 = container.querySelector('#c5-dp-1-ly') as HTMLDivElement;
    fireEvent.click(btn1);
    const btn2 = container.querySelector('#c5-dp-1-ny') as HTMLElement;
    fireEvent.click(btn2);
  });
  test('should handle month change', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <DatePicker onChange={testFn} date={new Date('1/1/2022')} id="1" />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    const btn1 = container.querySelector('#c5-dp-1-lm') as HTMLDivElement;
    fireEvent.click(btn1);
    const btn2 = container.querySelector('#c5-dp-1-nm') as HTMLDivElement;
    fireEvent.click(btn2);
  });
  test('should handle the year changing', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <DatePicker onChange={testFn} date={new Date('12/31/2021')} id="1" />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    const btn2 = container.querySelector('#c5-dp-1-nm') as HTMLDivElement;
    fireEvent.click(btn2);
  });
  test('should handle a new date click', () => {
    const testFn = jest.fn();
    const { container, getByText } = render(
      <DatePicker onChange={testFn} date={new Date('12/31/2021')} id="1" />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);

    const day = getByText('17');
    fireEvent.click(day);
  });
});
