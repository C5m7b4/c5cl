import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Calendar from './Calendar';

import { events } from './events';
import { act } from 'react-dom/test-utils';

const testfn = jest.fn();
const testDate = new Date(2022, 2, 26);

let harness: any;

beforeEach(() => {
  harness = document.createElement('div');
  document.body.appendChild(harness);
});

afterEach(() => {
  document.body.removeChild(harness);
  harness = null;
});

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
  test('should show events', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} events={events} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should show event', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} events={events} />
    );
    const div = screen.getByTestId('event-0-3152022');
    fireEvent.click(div);
    jest.advanceTimersByTime(1000);
    expect(container).toMatchSnapshot();
  });
  test('should show eventList', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} events={events} />
    );
    const div = screen.getByTestId('event-list');
    fireEvent.click(div);
    jest.advanceTimersByTime(1000);
    expect(container).toMatchSnapshot();
  });
  test('should handle closing EventViewer', () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(
        <Calendar onChange={testfn} date={testDate} events={events} />,
        harness
      );
    });

    const div = screen.getByTestId('event-0-3152022');
    act(() => {
      fireEvent.click(div);
      jest.advanceTimersByTime(1000);
    });

    const btn = harness.querySelector(
      '.close-box > button'
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.click(btn);
      jest.advanceTimersByTime(500);
    });
  });
  test('should handle closing EventList', () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(
        <Calendar onChange={testfn} date={testDate} events={events} />,
        harness
      );
    });

    const div = screen.getByTestId('event-list');
    act(() => {
      fireEvent.click(div);
      jest.advanceTimersByTime(1000);
    });

    const btn = harness.querySelector(
      '.close-box > button'
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.click(btn);
      jest.advanceTimersByTime(500);
    });
  });

  test('should handle ok on event', () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(
        <Calendar onChange={testfn} date={testDate} events={events} />,
        harness
      );
    });
    const div = screen.getByTestId('event-0-3152022');
    act(() => {
      fireEvent.click(div);
      jest.advanceTimersByTime(1000);
    });

    const okBtn = screen.getByText('OK');
    act(() => {
      fireEvent.click(okBtn);
      jest.advanceTimersByTime(500);
    });
  });
  test('should handle clicking an event in the EventList', () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(
        <Calendar onChange={testfn} date={testDate} events={events} />,
        harness
      );
    });

    const div = screen.getByTestId('event-list');
    act(() => {
      fireEvent.click(div);
      jest.advanceTimersByTime(1000);
    });

    const ev = screen.getByTestId('el-e-1') as HTMLDivElement;
    act(() => {
      fireEvent.click(ev);
    });
  });
});
