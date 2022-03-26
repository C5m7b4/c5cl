import { throttle } from './throttle';

const add = () => {
  return 1 + 1;
};

describe('throttle', () => {
  test('should throttle', () => {
    jest.useFakeTimers();
    const fn = throttle(add, 200);
    const result = fn();
    jest.advanceTimersByTime(300);
  });
});
