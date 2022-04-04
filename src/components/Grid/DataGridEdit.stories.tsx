import React from 'react';
import { Story, Meta } from '@storybook/react';

import DataGrid, { TableProps } from './DataGrid';

const testData = [
  {
    id: 1,
    name: 'Test1',
    color: '#000',
    date: '2/26/2022',
    time: '1:00 PM',
  },
];

const headers = [
  {
    columnName: 'id',
    title: 'id',
  },
  {
    columnName: 'color',
    title: 'color',
    editor: 'color',
  },
  {
    columnName: 'date',
    title: 'date',
    editor: 'date',
  },
  {
    columnName: 'time',
    title: 'Time',
    editor: 'time',
  },
];

export default {
  title: 'Grid/EditableGrid',
  component: DataGrid,
} as Meta;

const Template =
  <T extends {}>(): Story<TableProps<T>> =>
  (args) =>
    <DataGrid<T> {...args} />;

export const GridEditExample = Template<object>().bind({});
// @ts-ignore
GridEditExample.args = {
  data: testData,
  identifier: 'grid1',
  // @ts-ignore
  headers: headers,
  style: { color: 'slateblue' },
  // customRenderers: renderers,
};
