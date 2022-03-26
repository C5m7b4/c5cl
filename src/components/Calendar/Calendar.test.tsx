import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Calendar from './Calendar';

const testfn = jest.fn();
const testDate = new Date(2022, 2, 26);

describe('Calendar', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render next month', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    const next = container.querySelector('.next') as HTMLDivElement;
    fireEvent.click(next);
    expect(container).toMatchSnapshot();
  });
  test('should render previous month', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    const prev = container.querySelector('.prev') as HTMLDivElement;
    fireEvent.click(prev);
    expect(container).toMatchSnapshot();
  });
  test('should handle next year', () => {
    const newDate = new Date(2022, 11, 31);
    const { container } = render(<Calendar onChange={testfn} date={newDate} />);
    const next = container.querySelector('.next') as HTMLDivElement;
    fireEvent.click(next);
    expect(container).toMatchSnapshot();
  });
  test('should handle previous hear', () => {
    const newDate = new Date(2022, 0, 1);
    const { container } = render(<Calendar onChange={testfn} date={newDate} />);
    const prev = container.querySelector('.prev') as HTMLDivElement;
    fireEvent.click(prev);
    expect(container).toMatchSnapshot();
  });
  test('should handle a date click', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );

    const nodes = container.querySelectorAll('div.col.cell');
    const node = nodes[3] as HTMLDivElement;
    fireEvent.click(node);
  });
});
