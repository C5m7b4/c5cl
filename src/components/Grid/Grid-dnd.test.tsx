import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { fireMouseEvent } from './fireMouseEvent';
import { dragAndDrop } from './dragAndDrop';

import DataGrid from './DataGrid';

jest.dontMock('./DataGrid');

const testData = [
  {
    id: 1,
    storeName: 'IGA 001',
    storeNumber: '001',
    termCount: 3,
    active: true,
  },
  {
    id: 2,
    storeName: 'IGA 002',
    storeNumber: '002',
    termCount: 3,
    active: false,
  },
  {
    id: 3,
    storeName: 'IGA 003',
    storeNumber: '003',
    termCount: 3,
    active: true,
  },
];

describe('Grid-dnd', () => {
  test('should handle drag start', () => {
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

    // here is where our drag and drop stuff goes
    const dragComponent = container.querySelector(
      '#table-header-grid1-0 > span:nth-child(1)'
    ) as HTMLElement;
    const dropComponent = container.querySelector(
      '#table-header-grid1-1 > span:nth-child(1)'
    ) as HTMLElement;
    if (dragComponent && dropComponent) {
      dragAndDrop(dragComponent, dropComponent);
      // let pos = dragComponent.getBoundingClientRect();
      // if (pos) {
      //   const center1X = Math.floor((pos.left + pos.right) / 2);
      //   const center1Y = Math.floor((pos.top + pos.bottom) / 2);

      //   pos = dropComponent.getBoundingClientRect();
      //   const center2X = Math.floor((pos.left + pos.right) / 2);
      //   const center2Y = Math.floor((pos.top + pos.bottom) / 2);

      //   // mouse over dragged element and mousedown
      //   fireMouseEvent('mousemove', dragComponent, center1X, center1Y);
      //   fireMouseEvent('mouseenter', dragComponent, center1X, center1Y);
      //   fireMouseEvent('mouseover', dragComponent, center1X, center1Y);
      //   fireMouseEvent('mousedown', dragComponent, center1X, center1Y);

      //   //start dragging process over drop target
      //   const dragStarted = fireMouseEvent(
      //     'dragstart',
      //     dragComponent,
      //     center1X,
      //     center1Y
      //   );

      //   if (!dragStarted) {
      //     return;
      //   }

      //   fireMouseEvent('drag', dragComponent, center1X, center1Y);
      //   fireMouseEvent('mousemove', dragComponent, center1X, center1Y);
      //   fireMouseEvent('drag', dragComponent, center2X, center2Y);
      //   fireMouseEvent('mousemove', dropComponent, center2X, center2Y);
      //}
    }
  });
});
