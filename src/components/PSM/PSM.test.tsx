import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PSM, { PSMProps } from './PSM';

describe('PSM', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const { container } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle a single character', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(screen.getByPlaceholderText('Enter Password'), '!');
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!');
  });
  test('should handle two characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(screen.getByPlaceholderText('Enter Password'), '!5');
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!5');
  });
  test('should handle three characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(screen.getByPlaceholderText('Enter Password'), '!5S');
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!5S');
  });
  test('should handle five characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(screen.getByPlaceholderText('Enter Password'), '!5Ss');
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!5Ss');
  });
  test('should handle seven characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(screen.getByPlaceholderText('Enter Password'), '!5Ss1111');
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!5Ss1111');
  });
  test('should handle a password with more than 17 characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!5Ss111122222222222'
    );
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!5Ss111122222222222');
  });
  test('should handle two adjacent special characters', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    const input = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement;
    expect(input.value).toEqual('!!@5Teams5!!@');
  });
  test('should show submit button', () => {
    const testFn = jest.fn();
    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    const btn = container.querySelector('button');
    expect(btn).toBeVisible();
    if (btn) {
      fireEvent.click(btn);
    }
  });
  test('should handle no user for props', () => {
    const testFn = jest.fn();

    const { container, getByPlaceholderText } = render(
      // @ts-ignore
      <PSM confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      '!!@5Teams5!!@'
    );
    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      const text = screen.getByText('Please select a user');
      expect(text).toBeVisible();
    }
  });
  test('should handle a userid of zero', () => {
    const testFn = jest.fn();

    const { container, getByPlaceholderText } = render(
      <PSM userid={0} confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      '!!@5Teams5!!@'
    );
    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      const text = screen.getByText('Please select a user');
      expect(text).toBeVisible();
    }
  });
  test('should successfully submit new password', () => {
    const testFn = jest.fn();

    const { container, getByPlaceholderText } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      '!!@5Teams5!!@'
    );
    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
    }
  });
});
