import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';

import DataGrid from './DataGrid';

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
  test('should run dragStart', () => {
    const component = (
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
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    const getTableCells = () => {
      Array.from(mountNode.querySelectorAll('tr td:nth-of-type(1'));
    };

    const createBubbledEvent = (type: string, props = {}) => {
      const event = new Event(type, { bubbles: true });
      Object.assign(event, props);
      return event;
    };

    const { getByText } = render(component);
    const div = document.getElementById('table-header-grid1-0');

    const dragStartEvt = new CustomEvent('dragstart');

    // @ts-ignore
    const setData = jest.fn();
    // @ts-ignore
    dragStartEvt.pageX = '150';

    Object.assign(dragStartEvt, {
      dataTransfer: { setData: setData, effectAllowed: 'move' },
    });
    if (div) {
      div.dispatchEvent(dragStartEvt);
    }
    // const columnHeader = screen.getByRole('columnheader', { name: /name/i });
    // const cell = within(columnHeader).getByText(/name/i);
    // div.dispatchEvent(
    //   createBubbledEvent('dragstart', { clientX: 10, clientY: 0 })
    // );
    // const tableCells0 = getTableCells();
    // // @ts-ignore
    // if (tableCells0) {
    //   const startingNode0 = tableCells0[0];
    //   const endingNode0 = tableCells0[0];
    //   // @ts-ignore
    //   startingNode0.dispatchEvent(
    //     createBubbledEvent('dragstart', { clientX: 225, clientY: 0 })
    //   );
    //   // @ts-ignore
    //   endingNode0.dispatchEvent(
    //     createBubbledEvent('drop', { clientX: 225, clientY: 0 })
    //   );
    // }
  });
});
