import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;

  test('should debounce propertly', () => {
    const testFn = (a: number) => {
      return true;
    };
    const [debouncedFunc, teardown] = debounce(testFn, 300);
    let result = false;

    for (let i = 0; i < 100; i++) {
      // @ts-ignore
      result = debouncedFunc(5);
    }

    jest.runAllTimers();
    expect(result).toBeTruthy();

    teardown();
  });
});
