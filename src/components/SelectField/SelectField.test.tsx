import React from 'react';
import { render, screen } from '@testing-library/react';

import SelectField from './SelectField';

describe('SelectField', () => {
  test('component renders correctly', () => {
    const testFn = jest.fn();
    const fakeData = [
      {
        id: 1,
        name: 'tim',
        age: 25,
      },
      {
        id: 2,
        name: 'sally',
        age: 23,
      },
    ];
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
      />
    );

    expect(frag).toMatchSnapshot();
  });
  test('should render with an error', () => {
    const testFn = jest.fn();
    const fakeData = [
      {
        id: 1,
        name: 'tim',
        age: 25,
      },
      {
        id: 2,
        name: 'sally',
        age: 23,
      },
    ];
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
        error="you got an error"
      />
    );

    expect(frag).toMatchSnapshot();
  });
  test('expect to render with an empty error message', () => {
    const testFn = jest.fn();
    const fakeData = [
      {
        id: 1,
        name: 'tim',
        age: 25,
      },
      {
        id: 2,
        name: 'sally',
        age: 23,
      },
    ];
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
        error=""
      />
    );

    expect(frag).toMatchSnapshot();
  });
  test('should render the error message you got an error', () => {
    const testFn = jest.fn();
    const fakeData = [
      {
        id: 1,
        name: 'tim',
        age: 25,
      },
      {
        id: 2,
        name: 'sally',
        age: 23,
      },
    ];
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
        error="You got an error"
      />
    );

    const div: HTMLDivElement = screen.getByTestId('alert');
    expect(div.innerHTML).toEqual('You got an error');
  });
});
