import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PagingToolbar from './PagingToolbar';
import { testdata1 } from './pagingData';

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
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle zero results', () => {
    const { container } = render(
      <PagingToolbar
        data={[]}
        totalRecords={0}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle next button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
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
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
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
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    const next = screen.getByTestId('handle-next');
    fireEvent.click(next);
    const btn = screen.getByTestId('handle-first');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle prev button click', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    const next = screen.getByTestId('handle-next');
    fireEvent.click(next);
    const btn = screen.getByTestId('handle-prev');
    fireEvent.click(btn);
    expect(container).toMatchSnapshot();
  });
  test('should handle last page', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle current page change', () => {
    const { container } = render(
      <PagingToolbar
        data={testData}
        totalRecords={100}
        onChange={testFn}
        recordsPerPage={20}
      />
    );
    userEvent.type(screen.getByTestId('current-page-input'), '2');
  });
  test('should handle no records per page', () => {
    const { container } = render(
      <PagingToolbar data={testData} totalRecords={100} onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle rendering the last page', () => {
    const { container, rerender, unmount } = render(
      <PagingToolbar
        data={testdata1}
        totalRecords={testdata1.length - 1}
        onChange={testFn}
        recordsPerPage={10}
      />
    );
    const next = screen.getByTestId('handle-next');
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    unmount();
    rerender(
      <PagingToolbar
        data={testdata1}
        totalRecords={testdata1.length - 1}
        onChange={testFn}
        recordsPerPage={10}
      />
    );
  });
  test('should handle previous back to the main page', () => {
    const { container, rerender, unmount } = render(
      <PagingToolbar
        data={testdata1}
        totalRecords={testdata1.length - 1}
        onChange={testFn}
        recordsPerPage={10}
        onRecordsPerPageChange={testFn}
      />
    );
    const next = screen.getByTestId('handle-next');
    fireEvent.click(next);
    const prev = screen.getByTestId('handle-prev');
    fireEvent.click(prev);
  });
  test('should handle records per page change', () => {
    const { container, rerender, unmount } = render(
      <PagingToolbar
        data={testdata1}
        totalRecords={testdata1.length - 1}
        onChange={testFn}
        recordsPerPage={10}
        onRecordsPerPageChange={testFn}
      />
    );
    userEvent.type(screen.getByTestId('rpp-input'), '2');
  });
});
