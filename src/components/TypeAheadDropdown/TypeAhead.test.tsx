import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TypeAheadDropDown from './TypeAheadDropdown';

const FakeData = [
  {
    id: 1,
    storeName: 'Mikes Grocery',
  },
  {
    id: 2,
    storeName: 'Tommy Grocery',
  },
  {
    id: 3,
    storeName: 'TJs Grocery',
  },
  {
    id: 4,
    storeName: 'Marys Grocery',
  },
  {
    id: 5,
    storeName: 'Codys Grocery',
  },
];

describe('TypeAheadDropdown', () => {
  test('should render correctly', () => {
    const fakeFn = jest.fn();
    const { container } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        label={'Stores'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render with background color and labelColor', () => {
    const fakeFn = jest.fn();
    const { container } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should search', () => {
    const fakeFn = jest.fn();
    const { container } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );

    const input = container.querySelector('input');
    userEvent.type(screen.getByPlaceholderText(/Select Store/i), 'mi');
    userEvent.type(
      screen.getByPlaceholderText(/Select Store/i),
      '{backspace}{backspace}'
    );
  });
  test('should handle drop down selection', () => {
    const fakeFn = jest.fn();
    const { container, getByRole } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );

    const input = container.querySelector('input');
    userEvent.type(screen.getByPlaceholderText(/Select Store/i), 'mi');

    const option = getByRole('listitem', { name: '' });
    fireEvent.click(option);
  });
  test('should handle no search results', () => {
    const fakeFn = jest.fn();
    const { container, getByRole } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );

    const input = container.querySelector('input');
    userEvent.type(screen.getByPlaceholderText(/Select Store/i), 'di');
  });
  test('should handle selection', () => {
    const fakeFn = jest.fn();
    const { container, getByRole } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );

    const input = container.querySelector('input');
    userEvent.type(screen.getByPlaceholderText(/Select Store/i), 'mi');

    const option = container.querySelector('.tadd-text') as HTMLSpanElement;
    fireEvent.click(option);
  });
  test('should handle onBlur', () => {
    const fakeFn = jest.fn();
    const { container, getByRole } = render(
      <TypeAheadDropDown
        data={FakeData}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );

    const input = container.querySelector('input') as HTMLElement;
    userEvent.type(screen.getByPlaceholderText(/Select Store/i), 'mi');

    fireEvent.focusOut(input);
  });
  test('should handle no data', () => {
    const fakeFn = jest.fn();
    const { container, getByRole } = render(
      <TypeAheadDropDown
        data={[]}
        placeholder={'Select Store'}
        value={'1'}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={fakeFn}
        backgroundColor={'#fff'}
        label={'Stores'}
        labelColor={'#fff'}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
