import React, { useState, useEffect } from 'react';

import Tooltip from '../Tooltip';
import { Icons } from '../Icons';

import './PagingToolbar.css';

export interface PagingToolbarProps<T> {
  data: T[];
  currentPage: number;
  totalRecords: number;
  handlePageChange: (n: number) => void;
  recordsPerPage: number;
  handleRecordsPerPageChange: () => void;
  start: number;
  end: number;
}

const initialPagingToolbarState = {
  data: [],
  recordsPerPage: 50,
  totalPages: 0,
  currentPage: 1,
  totalRecords: 0,
  start: 0,
  end: 0,
};

const style = { width: '32px', height: '32px' };

function PagingToolbar<T>(props: PagingToolbarProps<T>) {
  const [state, setState] = useState(initialPagingToolbarState);

  const {
    data,
    currentPage,
    totalRecords,
    recordsPerPage,
    handlePageChange,
    handleRecordsPerPageChange,
    start,
    end,
  } = props;

  const {
    previous: Previous,
    next: Next,
    backward: Backward,
    forward: Forward,
  } = Icons;

  useEffect(() => {
    let totalPages = Math.ceil(totalRecords / recordsPerPage);
    if (totalPages === 0) {
      totalPages = 1;
    }

    setState({
      ...state,
      totalPages,
      recordsPerPage,
      currentPage: currentPage + 1,
      end: totalRecords < recordsPerPage ? totalRecords : end,
    });
  }, [data, totalRecords]);

  const handleNext = () => {
    handlePageChange(state.currentPage);
  };

  const handlePrev = () => {
    handlePageChange(state.currentPage - 2);
  };

  const handleFirst = () => {
    handlePageChange(0);
  };

  const handleLast = () => {
    handlePageChange(state.totalPages - 1);
  };

  return (
    <div className="paging-toolbar-wrapper">
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ margin: '0 auto' }}>
          {state.currentPage === 1 ? (
            <React.Fragment>
              <span>
                <Backward theme="dark" type="dark" style={style} />
              </span>
              <span
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  height: '8px',
                }}
              ></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Tooltip message={'First Page'} position="bottom" theme="dark">
                <span
                  className="paging-button"
                  data-testid="handle-first"
                  onClick={handleFirst}
                >
                  <Previous theme="dark" type="dark" style={style} />
                </span>
              </Tooltip>
              <Tooltip message={'Previous Page'} position="bottom" theme="dark">
                <span
                  style={{ marginLeft: '10px', marginRight: '10px' }}
                  className="paging-button"
                  onClick={handlePrev}
                  data-testid="handle-prev"
                >
                  <Backward theme="dark" type="dark" style={style} />
                </span>
              </Tooltip>
            </React.Fragment>
          )}
          <span style={{ verticalAlign: 'text-bottom' }}>
            <span>Page</span>
            <input
              type="number"
              className="paging-toolbar-current-page"
              value={state.currentPage}
              onChange={() => console.log('change')}
              data-testid="current-page-input"
            />
            <span> of {state.totalPages}</span>
          </span>

          {currentPage == state.totalPages - 1 ? (
            <React.Fragment>
              <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                <Next theme="dark" type="dark" style={style} />
              </span>
              <span>
                <Forward theme="dark" type="dark" style={style} />
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Tooltip message="Next Page" position="bottom" theme="dark">
                <span
                  style={{ marginLeft: '10px', marginRight: '10px' }}
                  className="paging-button"
                  data-testid="handle-next"
                  onClick={handleNext}
                >
                  <Forward theme="dark" type="dark" style={style} />
                </span>
              </Tooltip>
              <Tooltip message="Last Page" position="bottom" theme="dark">
                <span
                  className="paging-button"
                  data-testid="handle-last"
                  onClick={handleLast}
                >
                  <Next theme="dark" type="dark" style={style} />
                </span>
              </Tooltip>
            </React.Fragment>
          )}
        </div>
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
        <div style={{ margin: '-8px auto' }}>
          <span>Show</span>
          <input
            type="number"
            className="paging-records-per-page"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
          />
          <span>Records per Page</span>
          <span className="paging-summary">
            <span>{`Displaying ${start} - ${state.end} of ${totalRecords}`}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PagingToolbar;
