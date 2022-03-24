import React, { useState, useEffect } from 'react';

import PagingToolbar from './PagingToolbar';
import DataGrid from '../Grid';

import { serverData } from './pagingData';
import { formatDate } from '../../utils';

interface serverDataProps {
  id: number;
  name: string;
  employees: number;
  email: string;
  phone: string;
  state: string;
  city: string;
  active: boolean;
  hirDate: Date;
}

const PagingDemo = () => {
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [data, setData] = useState<serverDataProps[]>([]);

  useEffect(() => {
    getData();
  }, [recordsPerPage]);

  const renderers = {
    active: (i: any) => {
      return <input type="checkbox" checked={i.active} readOnly={true} />;
    },
    hirDate: (i: any) => {
      return <span>{formatDate(i.hirDate)}</span>;
    },
  };

  const handleChange = (s: number, e: number) => {
    getData(s, e);
  };

  const getData = (s: number = 0, e: number = recordsPerPage) => {
    // @ts-ignore
    setData(serverData.filter((r) => r.id >= s && r.id <= e));
  };

  const onRecordsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordsPerPage(+e.target.value);
  };

  return (
    <div>
      <h2>Paging Demo</h2>
      <DataGrid
        data={data}
        identifier={'grid1'}
        customRenderers={renderers}
        headers={[
          {
            columnName: 'id',
            title: 'ID',
            style: {
              textAlign: 'center',
            },
            visible: true,
          },
          {
            columnName: 'name',
            title: 'Name',
          },
          {
            columnName: 'employees',
            title: 'Cnt',
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'email',
            title: 'Email',
          },
          {
            columnName: 'phone',
            title: 'Phone',
            visible: false,
          },
          {
            columnName: 'state',
            title: 'ST',
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'city',
            title: 'City',
          },
          {
            columnName: 'active',
            title: 'Active',
            style: {
              textAlign: 'center',
            },
          },
          {
            columnName: 'hirDate',
            title: 'Hire Date',
            style: {
              textAlign: 'center',
            },
          },
        ]}
      />
      <PagingToolbar
        data={data}
        totalRecords={serverData.length - 1}
        onChange={handleChange}
        recordsPerPage={recordsPerPage}
        onRecordsPerPageChange={onRecordsPerPageChange}
      />
    </div>
  );
};

export default PagingDemo;
