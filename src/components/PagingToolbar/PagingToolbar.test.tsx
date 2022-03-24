import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PagingToolbar from './PagingToolbar';

const testData = [
  {
    id: 1,
    storeName: 'store1',
  },
  {
    id: 2,
    storeName: 'store2',
  },
];

const testFn = jest.fn();
const testFn1 = jest.fn();

describe('Paging Toolbar', () => {
  test('should render properly', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle zero results', () => {
    const { container } = render(
      <PagingToolbar
        data={[]}
        currentPage={1}
        totalRecords={0}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle next button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    const btn = screen.getByTestId('handle-next');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle last button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    const btn = screen.getByTestId('handle-last');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle first button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    const btn = screen.getByTestId('handle-first');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle prev button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    const btn = screen.getByTestId('handle-prev');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle last page', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={4}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={25}
        end={50}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle current page change', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        currentPage={1}
        totalRecords={100}
        handlePageChange={testFn}
        recordsPerPage={20}
        handleRecordsPerPageChange={testFn1}
        start={0}
        end={25}
      />
    );
    userEvent.type(screen.getByTestId('current-page-input'), '2');
  });
});
