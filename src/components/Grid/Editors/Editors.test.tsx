import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import DataGrid from '../DataGrid';

const data = [
  {
    id: 1,
    number: 5,
    date: new Date(2022, 2, 15),
    time: new Date('2/15/2022 2:00 pm'),
    color: '#ff0000',
  },
  {
    id: 2,
    number: 5,
    date: new Date(2022, 2, 15),
    time: new Date('2/15/2022 2:00 pm'),
    color: '#ff0000',
  },
  {
    id: 3,
    number: 5,
    date: new Date(2022, 2, 15),
    time: new Date('2/15/2022 2:00 pm'),
    color: '#ff0000',
  },
];

describe('editors', () => {
  test('should handle number', () => {
    const { container } = render(
      <DataGrid
        data={data}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'id',
          },
          {
            columnName: 'number',
            title: 'num',
            editor: 'number',
          },
          {
            columnName: 'date',
            title: 'Date',
            editor: 'date',
          },
          {
            columnName: 'time',
            title: 'Time',
            editor: 'time',
          },
          {
            columnName: 'color',
            title: 'Color',
            editor: 'color',
          },
        ]}
      />
    );

    const table = screen.getByRole('table', { name: '' });
    const row = table.querySelector('tr:nth-child(2)') as HTMLTableRowElement;
    fireEvent.click(row, { detail: 2 });

    const cancel = screen.getByTestId('grid-editing-cancel');
    fireEvent.click(cancel);
  });
});
