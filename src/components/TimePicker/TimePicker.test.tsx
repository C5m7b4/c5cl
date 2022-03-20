import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TimePicker from './TimePicker';

const dte = new Date('3/20/2022 3:00 AM');

describe('TimePicker', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const { container } = render(<TimePicker time={dte} onChange={testFn} />);
    expect(container).toMatchSnapshot();
  });
  test('should handle active component', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={dte} onChange={testFn} />
    );
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);
  });
  test('should handle pm', () => {
    const testFn = jest.fn();
    const { container } = render(
      <TimePicker time={new Date('3/20/2022 4:00 PM')} onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle am click', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={new Date('3/20/2022 4:00 PM')} onChange={testFn} />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const btn1 = container.querySelector(
      '.am-pm-info > div.am'
    ) as HTMLButtonElement;
    fireEvent.click(btn1);
  });
  test('should handle pm click', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={new Date('3/20/2022 4:00 AM')} onChange={testFn} />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const btn1 = container.querySelector(
      '.am-pm-info > div.pm'
    ) as HTMLButtonElement;
    fireEvent.click(btn1);
  });
  test('should handle hour change click', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={new Date('3/20/2022 4:00 AM')} onChange={testFn} />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const hour = container.querySelector('.position-2') as HTMLDivElement;
    fireEvent.click(hour);
  });
  test('should handle an id prop', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker
        time={new Date('3/20/2022 4:00 AM')}
        onChange={testFn}
        id={'1'}
      />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);
  });
  test('should handle minute change', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={new Date('3/20/2022 4:00 AM')} onChange={testFn} />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const hour = container.querySelector('.position-2') as HTMLDivElement;
    fireEvent.click(hour);

    const minute = container.querySelector('.position-9') as HTMLDivElement;
    fireEvent.click(minute);
  });
  test('should handle close', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker time={new Date('3/20/2022 4:00 AM')} onChange={testFn} />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const close = container.querySelector(
      '.c5-time-picker > div.clock > div.close > button'
    ) as HTMLButtonElement;
    fireEvent.click(close);
  });
  test('should handle return short time', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker
        time={new Date('3/20/2022 4:00 AM')}
        onChange={testFn}
        returnShortTime={true}
      />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const close = container.querySelector(
      '.c5-time-picker > div.clock > div.close > button'
    ) as HTMLButtonElement;
    fireEvent.click(close);
  });
  test('should handle return short time with an hour greater than 12', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <TimePicker
        time={new Date('3/20/2022 4:00 PM')}
        onChange={testFn}
        returnShortTime={true}
      />
    );

    // open the picker
    const div = container.querySelector('.c5-tp-input') as HTMLDivElement;
    fireEvent.click(div);

    const close = container.querySelector(
      '.c5-time-picker > div.clock > div.close > button'
    ) as HTMLButtonElement;
    fireEvent.click(close);
  });
});
