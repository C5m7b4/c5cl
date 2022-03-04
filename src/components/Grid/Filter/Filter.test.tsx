import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';

const header = {
  columnName: 'id',
  title: 'ID',
  visible: true,
  style: {
    textAlign: 'center',
  },
};

const testData = [
  {
    id: 1,
    storeName: 'IGA 001',
    storeNumber: '001',
    termCount: 3,
  },
  {
    id: 2,
    storeName: 'IGA 002',
    storeNumber: '002',
    termCount: 4,
  },
  {
    id: 3,
    storeName: 'IGA 003',
    storeNumber: '003',
    termCount: 6,
  },
];

describe('Filter', () => {
  test('should render correctly', () => {
    const frag = render(
      // @ts-ignore
      <Filter header={header} open={true} divId="tf" data={testData} />
    );

    expect(frag).toMatchSnapshot();
  });
  test('should show open modal', () => {
    document.body.innerHTML = '<div id="tf"></div>';

    const frag = render(
      <Filter
        // @ts-ignore
        header={header}
        open={true}
        divId="tf"
        data={testData}
        availableFilters={[]}
      />
    );
    expect(frag).toMatchSnapshot();
  });
  test('should detect if an item is already checked', () => {
    document.body.innerHTML = '<div id="tf"></div>';

    const frag = render(
      <Filter
        // @ts-ignore
        header={header}
        open={true}
        divId="tf"
        data={testData}
        availableFilters={['ID']}
      />
    );
    expect(frag).toMatchSnapshot();
  });
  test('should detect checkbox click', () => {
    document.body.innerHTML = '<div id="tf"></div>';

    const testFn = jest.fn();

    const frag = render(
      <Filter
        // @ts-ignore
        header={header}
        open={true}
        divId="tf"
        data={testData}
        availableFilters={['ID']}
        filterItemClicked={testFn}
      />
    );
    const check: HTMLInputElement = screen.getByTestId('mikto-table-filter-0');
    userEvent.click(check);
  });
});
