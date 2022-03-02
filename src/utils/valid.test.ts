import { isValid } from './valid';

describe('isValid', () => {
  test('should return true for a valid string value', () => {
    expect(isValid('hello')).toBeTruthy();
  });
  test('should return false for a undefined value', () => {
    // @ts-ignore
    expect(isValid(undefined)).toBe(false);
  });
  test('should return false for a null value', () => {
    // @ts-ignore
    expect(isValid(null)).toBe(false);
  });
  test('should return false for an empty string', () => {
    expect(isValid('')).toBe(false);
  });
  test('should return false for an empty object', () => {
    const myObj = {};
    expect(isValid(myObj)).toBe(false);
  });
  test('should return true for an object with keys', () => {
    const myObj = { name: 'mike' };
    expect(isValid(myObj)).toBe(true);
  });
  test('should return false for a zero number', () => {
    expect(isValid(0)).toBe(false);
  });
  test('should return true for a number that is not zero', () => {
    expect(isValid(10)).toBe(true);
    expect(isValid(-50)).toBe(true);
  });
});
