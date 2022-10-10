import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import DataGrid from './DataGrid';

let sym1 = Symbol('foo');

const testData = [
  {
    id: 1,
    storeName: 'IGA 001',
    storeNumber: '001',
    termCount: 3,
    active: true,
    sym1: sym1,
    date: new Date(2022, 2, 2),
  },
  {
    id: 2,
    storeName: 'IGA 002',
    storeNumber: '002',
    termCount: 3,
    active: false,
    sym1: sym1,
    date: new Date(2022, 2, 2),
  },
  {
    id: 3,
    storeName: 'IGA 003',
    storeNumber: '003',
    termCount: 3,
    active: true,
    sym1: sym1,
    date: new Date(2022, 2, 2),
  },
];

const { container, getByTestId } = render(
  <DataGrid
    data={testData}
    identifier={'grid1'}
    headers={[
      {
        columnName: 'id',
        title: 'ID',
        visible: true,
        style: {
          textAlign: 'center',
        },
      },
      {
        columnName: 'storeName',
        title: 'Name',
        style: {
          textAlign: 'left',
        },
      },
      {
        columnName: 'storeNumber',
        title: '#',
        style: {
          textAlign: 'center',
        },
      },
      {
        columnName: 'active',
        title: 'Active',
        style: {
          textAlign: 'center',
        },
      },
      {
        columnName: 'sym1',
        title: 'Sum1',
      },
      {
        columnName: 'date',
        title: 'date',
        editor: 'date',
      },
    ]}
  />
);

const NODE_TYPE = Object.freeze({
  ELEMENT_NODE: 1,
});

window.Element.prototype.closest =
  window.Element.prototype.closest ||
  function (selectors: any) {
    // @ts-ignore
    let el = this;
    while (el && el.nodeType === NODE_TYPE.ELEMENT_NODE) {
      if (el.matches(selectors)) {
        return el;
      }
      el = el.parentNode;
    }
    return null;
  };

describe('DataGrid', () => {
  test('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });
  test('should sort data asc', () => {
    const { container } = render(
      <DataGrid
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
    );

    expect(container).toBeVisible();
    const div = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(1)'
    );
    if (div) {
      fireEvent.click(div);
    }
  });
  test('should sort data desc', () => {
    const { container } = render(
      <DataGrid
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
        ]}
      />
    );

    expect(container).toBeVisible();
    const div = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(1)'
    );
    if (div) {
      fireEvent.click(div);
      fireEvent.click(div);
    }
  });
  test('should render light mode', () => {
    const { container } = render(
      <DataGrid
        mode="light"
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
    );
    expect(container).toBeVisible();
  });
  test('should display context menu', () => {
    const { container } = render(
      <DataGrid
        mode="light"
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
    );
    const div = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(1)'
    );

    if (div) {
      fireEvent.contextMenu(div);
      setTimeout(() => {
        const cn = container.querySelector(
          '#mikto-columns-grid1 > div > div:nth-child(2) > div:nth-child(1)'
        );
        expect(cn).toBeVisible();
      }, 200);
    }
  });
  test('should handle checking a column', () => {
    const { container, getByTestId } = render(
      <DataGrid
        mode="light"
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
    );
    const div = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(1)'
    );

    if (div) {
      fireEvent.contextMenu(div);

      const cn = getByTestId(`mikto-table-check-grid1-1`);
      if (cn) {
        fireEvent.click(cn);
        fireEvent.click(cn);
      }
    }
  });
  test('shoudl show filter', () => {
    const { container, getByTestId } = render(
      <DataGrid
        mode="light"
        data={testData}
        identifier={'grid1'}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
    );
    const caret = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(2)'
    );
    if (caret) {
      fireEvent.click(caret);
      const check = getByTestId('mikto-table-filter-0') as HTMLInputElement;
      if (check) {
        expect(check.checked).toBeFalsy();
        fireEvent.click(check);
        expect(check.checked).toBeTruthy();
        fireEvent.click(check);
        expect(check.checked).toBeFalsy();
      }
    }
  });
  test('should sort by column with equal data', () => {
    const renderers = {
      active: (i: any) => {
        return <input type="checkbox" checked={i.active} />;
      },
    };
    const { container, getByRole } = render(
      <DataGrid
        data={testData}
        identifier={'grid1'}
        customRenderers={renderers}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'termCount',
            title: 'Terms',
          },
        ]}
      />
    );

    expect(container).toBeVisible();
    const div = getByRole('columnheader', { name: 'Terms' });
    if (div) {
      fireEvent.click(div);
      fireEvent.click(div);
    }
  });
  test('should handle single row click', () => {
    const renderers = {
      active: (i: any) => {
        return <input type="checkbox" checked={i.active} />;
      },
    };
    const testfn = jest.fn();
    const { container, getByRole } = render(
      <DataGrid
        data={testData}
        identifier={'grid1'}
        customRenderers={renderers}
        handleRowClick={testfn}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'termCount',
            title: 'Terms',
          },
        ]}
      />
    );

    // now click on any row
    const table = screen.getByRole('table', { name: '' });
    const row = table.querySelector('tr:nth-child(2)') as HTMLTableRowElement;
    expect(row).toBeVisible();
    fireEvent.click(row);
    fireEvent.click(row, { detail: 1 });
  });
  test('should handle double click', () => {
    jest.useFakeTimers();
    const renderers = {
      active: (i: any) => {
        return <input type="checkbox" checked={i.active} />;
      },
    };
    const testfn = jest.fn();
    const { container, getByRole } = render(
      <DataGrid
        data={testData}
        identifier={'grid1'}
        customRenderers={renderers}
        handleRowClick={testfn}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            visible: true,
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeName',
            title: 'Name',
            style: {
              textAlign: 'left',
            },
            sortable: 'desc',
          },
          {
            columnName: 'storeNumber',
            title: '#',
            style: {
              textAlign: 'center',
            },
            sortable: 'desc',
          },
          {
            columnName: 'termCount',
            title: 'Terms',
          },
        ]}
      />
    );

    // now double click on any row
    const table = screen.getByRole('table', { name: '' });
    const row = table.querySelector('tr:nth-child(2)') as HTMLTableRowElement;
    fireEvent.click(row, { detail: 2 });

    const cancel = screen.getByTestId('grid-editing-cancel');
    fireEvent.click(cancel);

    fireEvent.click(row, { detail: 2 });
    const confirm = screen.getByTestId('grid-editing-confirm');
    fireEvent.click(confirm);
  });
});
