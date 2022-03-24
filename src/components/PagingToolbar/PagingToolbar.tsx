import React, { useState, useEffect } from 'react';

import Tooltip from '../Tooltip';
import { Icons } from '../Icons';

import './PagingToolbar.css';

export interface PagingToolbarProps<T> {
  data: T[];
  totalRecords: number;
  recordsPerPage?: number;
  onChange?: (start: number, end: number) => void;
  onRecordsPerPageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialPagingToolbarState = {
  data: [],
  recordsPerPage: 50,
  totalPages: 0,
  totalRecords: 0,
  start: 0,
  end: 0,
};

const style = { width: '32px', height: '32px' };

function PagingToolbar<T>(props: PagingToolbarProps<T>) {
  const [state, setState] = useState(initialPagingToolbarState);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, totalRecords, recordsPerPage = state.recordsPerPage } = props;

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
      end: state.end === 0 ? recordsPerPage : state.end,
    });
  }, [data, totalRecords, props.recordsPerPage]);

  const handleNext = () => {
    /* istanbul ignore else */
    if (props.onChange) {
      let start = state.start + recordsPerPage;
      let end = state.end + recordsPerPage;
      if (end > totalRecords) {
        props.onChange(start, totalRecords);
      } else {
        props.onChange(start, end);
      }

      setState({
        ...state,
        start,
        end,
      });
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    /* istanbul ignore else */
    if (props.onChange) {
      let start = state.start - recordsPerPage;
      let end = state.end - recordsPerPage;
      props.onChange(start, end);
      setState({
        ...state,
        start,
        end,
      });
    }
    setCurrentPage(currentPage - 1);
  };

  const handleFirst = () => {
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(0, recordsPerPage);
    }
    setCurrentPage(0);
    setState({
      ...state,
      start: 0,
      end: recordsPerPage,
    });
  };

  const handleLast = () => {
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(totalRecords - recordsPerPage, totalRecords);
    }
    const lastPage = Math.ceil(totalRecords / recordsPerPage) - 1;
    setCurrentPage(lastPage);
    setState({
      ...state,
      start: totalRecords - recordsPerPage,
      end: totalRecords,
    });
  };

  const calculateRemainingRecords = () => {
    return totalRecords;
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    /* istanbul ignore else */
    if (props.onRecordsPerPageChange) {
      props.onRecordsPerPageChange(e);
    }
  };

  const handleCurrentPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cp = +e.target.value - 1;
    setCurrentPage(cp);
    let start = recordsPerPage * cp;
    let end = start + recordsPerPage;
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(start, end);
    }
    setState({
      ...state,
      start,
      end,
    });
  };

  return (
    <div className="paging-toolbar-wrapper">
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ margin: '0 auto' }}>
          {currentPage === 0 ? (
            <React.Fragment>
              <span>
                <Previous
                  theme="dark"
                  type="dark"
                  style={{ ...style, opacity: '0.2' }}
                />
              </span>
              <span>
                <Backward
                  theme="dark"
                  type="dark"
                  style={{ ...style, opacity: '0.2' }}
                />
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
              value={currentPage + 1}
              onChange={(e) => handleCurrentPageChange(e)}
              data-testid="current-page-input"
              min="0"
              max={Math.ceil(totalRecords / recordsPerPage)}
            />
            <span> of {state.totalPages}</span>
          </span>

          {currentPage == state.totalPages - 1 ? (
            <React.Fragment>
              <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                <Next
                  theme="dark"
                  type="dark"
                  style={{ ...style, opacity: '0.2' }}
                />
              </span>
              <span>
                <Forward
                  theme="dark"
                  type="dark"
                  style={{ ...style, opacity: '0.2' }}
                />
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
            data-testid="rpp-input"
            onChange={(e) => handleRecordsPerPageChange(e)}
          />
          <span>Records per Page</span>
          <span className="paging-summary">
            <span>{`Displaying ${state.start} - ${
              state.end > totalRecords ? calculateRemainingRecords() : state.end
            } of ${totalRecords}`}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PagingToolbar;
