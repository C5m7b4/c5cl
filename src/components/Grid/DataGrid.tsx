import React, { useState, useEffect, useRef } from 'react';
import { Columns } from './Columns/Columns';
import { Filter } from './Filter/Filter';
import GridTextEditor from './Editors/GridTextEditor';
import RowEditConfirmation from './Editors/RowEditConfirmation';
import './DataGrid.css';

export type CustomRenderers<T> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

export type PrimitiveType = string | symbol | number | boolean;

export function isPrimitive(value: unknown): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}

export type TableHeaderEditor = 'text' | 'number' | 'date' | 'time' | 'color';

export type TableHeader<T> = {
  columnName: keyof T;
  title: string;
  sortable?: 'asc' | 'desc' | false;
  visible?: boolean;
  style?: React.CSSProperties;
  width?: number;
  filterable?: boolean;
  editor?: TableHeaderEditor;
};

export type Mode = 'light' | 'dark';

export interface TableProps<T> {
  data: T[];
  identifier: string;
  customRenderers?: CustomRenderers<T>;
  headers: TableHeader<T>[];
  fill?: boolean;
  style?: React.CSSProperties;
  className?: string;
  tableClassName?: string;
  mode?: Mode;
  handleRowClick?: (record: T) => void;
  handleRowEdit?: (record: T, header: TableHeader<T>, newValue: any) => void;
  handleEditConfirm?: (record: T) => void;
}

// export function objectKeys<T extends {}>(obj: T) {
//   return Object.keys(obj).map((objKey) => objKey as keyof T);
// }

function DataGrid<T>(props: TableProps<T>) {
  const [render, setRender] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [selectedHeader, setSelectedHeader] = useState<TableHeader<T>>();
  const [columnModalStyle, setColumnModalStyle] = useState({});
  const [showColumnsModal, setShowColumnModal] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState<string[]>([]);
  const [filterChecked, setFilterChecked] = useState(false);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterStyle, setFilterStyle] = useState<React.CSSProperties>({
    position: 'absolute',
  });
  const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
  const [headerString, setHeaderString] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState<T>();
  const [confirmStyle, setConfirmStyle] = useState<React.CSSProperties>({
    position: 'absolute',
  });

  // check to see if the rowclick exists or not

  const { fill, tableClassName = 'mikto-table', style, mode = 'dark' } = props;

  const table = useRef<HTMLTableElement>(null);
  let draggedId = '';
  let uniqueId = 0;

  useEffect(() => {
    setFilteredData(props.data);

    // const stylesheet = document.styleSheets[0];
    try {
      /* istanbul ignore else */
      if (mode === 'dark') {
        /* istanbul ignore else */
        if (table.current) {
          table.current.style.backgroundColor = '#000';
        }
      } else {
        /* istanbul ignore else */
        if (table.current) {
          table.current.style.backgroundColor = '#fff';
        }
      }
    } catch {}
  }, [mode, props.data]);

  const getUniqueId = () => {
    uniqueId++;
    return uniqueId;
  };

  const sortByProperty = (prop: keyof T, asc = 0) => {
    if (!asc) {
      return (a: T, b: T) =>
        a[prop] === b[prop] ? 0 : a[prop] < b[prop] ? -1 : 1;
    } else {
      return (b: T, a: T) =>
        a[prop] === b[prop] ? 0 : a[prop] < b[prop] ? -1 : 1;
    }
  };

  const handleSortClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    columnName: keyof T
  ) => {
    e.preventDefault();
    const header = props.headers.find((h) => h.columnName === columnName);
    /* istanbul ignore else */
    if (header) {
      /* istanbul ignore else */
      if (!header.sortable) {
        header.sortable = 'asc';
      }
      if (header.sortable === 'asc') {
        header.sortable = 'desc';
        const sortedData = props.data.sort(sortByProperty(columnName, 0));
        setFilteredData(sortedData);
      } else {
        header.sortable = 'asc';
        const sortedData = props.data.sort(sortByProperty(columnName, 1));
        setFilteredData(sortedData);
      }
      setRender(!render);
    }
  };

  const handleModal = (
    e: React.MouseEvent<HTMLSpanElement>,
    divid: string,
    header: TableHeader<T>
  ) => {
    e.preventDefault();
    const div = document.getElementById(divid);
    setSelectedHeader(header);
    /* istanbul ignore else */
    if (div && table.current) {
      const rect = div.getBoundingClientRect();
      const tableRect = table.current.getBoundingClientRect();
      /* istanbul ignore else */
      if (rect && tableRect) {
        const left = e.clientX.toFixed(0).toString() + 'px';
        const top = (rect.top + rect.height).toFixed(0).toString() + 'px';
        const style = {
          position: 'absolute',
          top: top,
          left: left,
        };
        setColumnModalStyle(style);
        setShowColumnModal(!showColumnsModal);
      }
    }
  };

  const handleColumnCheck = (e: string, checked: boolean) => {
    const header = props.headers.filter((h) => h.title === e)[0];
    if (checked) {
      setCheckedColumns([...checkedColumns, e]);
      header.visible = true;
    } else {
      const newArray = checkedColumns.filter((c) => c !== e);
      setCheckedColumns(newArray);
      header.visible = false;
    }
  };

  const handleFilterClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    header: string,
    divid: string
  ) => {
    const div = document.getElementById(divid);
    setHeaderString(header);
    /* istanbul ignore else */
    if (div && table.current) {
      const rect = div.getBoundingClientRect();
      const tableRect = table.current.getBoundingClientRect();
      /* istanbul ignore else */
      if (rect && tableRect) {
        const left = (rect.left + rect.width - 75).toFixed(0).toString() + 'px';
        const top = (rect.top + rect.height).toFixed(0).toString() + 'px';
        const style = {
          position: 'absolute',
          top: top,
          left: left,
        };
        setFilterStyle({
          position: 'absolute',
          zIndex: '5',
          left: left,
          top: top,
          backgroundColor: '#aaa',
          padding: '8px',
        });
        setShowFilter(!showFilter);
      }
    }
  };

  const dragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    const id = (ev.target as HTMLDivElement).id;
    try {
      ev.dataTransfer.setData('text/plain', id);
      draggedId = id;
    } catch {
      // do nothing. This is just here so the tests dont blow up
    }
  };

  const dragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const id = (ev.target as HTMLDivElement).id;
    /* istanbul ignore else */
    if (id) {
      (ev.target as HTMLDivElement).classList.add('mikto-table-drag-over');
    }
  };

  const dragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const id = (ev.target as HTMLDivElement).id;
    /* istanbul ignore else */
    if (id) {
      (ev.target as HTMLDivElement).classList.add('mikto-table-drag-over');
    }
  };

  const dragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    (ev.target as HTMLDivElement).classList.remove('mikto-table-drag-over');
  };

  const drop = (ev: React.DragEvent<HTMLDivElement>) => {
    (ev.target as HTMLDivElement).classList.remove('mikto-table-drag-over');
    try {
      const id = ev.dataTransfer.getData('text/plain');
      const originalPosition = id.slice(id.length - 1);
      const header = props.headers[+originalPosition];
      props.headers.splice(+originalPosition, 1);

      const dropId = (ev.target as HTMLElement).id.slice(
        (ev.target as HTMLElement).id.length - 1
      );
      /* istanbul ignore else */
      if (dropId == originalPosition) {
        return;
      }

      // get the X position of the dropped element
      const dropElementX = ev.clientX;
      const draggable = document.getElementById(id);
      if (draggable) {
        draggable.classList.remove('mikto-hide-dragged-column');
      }

      const table = document.getElementById(props.identifier);
      /* istanbul ignore else */
      if (table) {
        const thead = table.querySelector('thead');
        /* istanbul ignore else */
        if (thead) {
          const tr = thead.querySelector('tr');
          /* istanbul ignore else */
          if (tr) {
            for (let i = 0; i < tr.childNodes.length; i++) {
              const el = tr.childNodes[i];
              const id = (el as HTMLDivElement).id;
              /* istanbul ignore else */
              if (id === draggedId) {
                continue;
              }

              /* istanbul ignore else */
              if (el) {
                const rect = (el as HTMLElement).getBoundingClientRect();
                const x1 = rect.width - (rect.x + rect.width / 4);
                const x2 = rect.x + rect.width;

                if (dropElementX <= x1) {
                  const newPosition = (el as HTMLElement).id.slice(
                    (el as HTMLElement).id.length - 1
                  );
                  props.headers.splice(+newPosition, 0, header);
                  setRender(!render);
                  draggedId = '';
                  break;
                } else if (dropElementX <= x2) {
                  /* istanbul ignore else */
                  if (draggable) {
                    const newPosition = (el as HTMLElement).id.slice(
                      (el as HTMLElement).id.length - 1
                    );
                    props.headers.splice(+newPosition, 0, header);
                    setRender(!render);
                    draggedId = '';
                    break;
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {}
  };

  const rowClick = (e: React.MouseEvent, record: T) => {
    switch (e.detail) {
      case 1:
        /* istanbul ignore else */
        if (props.handleRowClick) {
          props.handleRowClick(record);
        }
        break;
      case 2:
        setEditingRecord(record);
        setIsEditing(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const style = { top: `${rect.bottom.toFixed(0)}px` };
        setConfirmStyle({ ...confirmStyle, ...style });
        break;
      default:
        /* istanbul ignore else */
        if (props.handleRowClick) {
          props.handleRowClick(record);
        }
        break;
    }
  };

  const handleEditConfirm = () => {
    // here we need to find a way to gather all the state that was edited
    setIsEditing(false);
    if (props.handleEditConfirm && editingRecord) {
      props.handleEditConfirm(editingRecord);
    }
  };

  const handleEditChange = (e: any, header: TableHeader<T>, record: T) => {
    try {
      // @ts-ignore
      const editRecord = filteredData.filter((r) => r.id === record.id)[0];
      /* istanbul ignore else */
      if (editRecord) {
        // @ts-ignore
        editRecord[header.columnName] = e;
        setEditingRecord(editRecord);
      }
    } catch (error) {}
  };

  function renderHeader(header: TableHeader<T>, id: number) {
    const { title, visible = true } = header;
    if (!visible === false) {
      return (
        <th
          draggable
          key={`table-header-${id}`}
          id={`table-header-${props.identifier}-${id}`}
          style={header.style}
          className={`mikto-header-sort-${mode}`}
          onContextMenu={(e) =>
            handleModal(e, `table-header-${props.identifier}-${id}`, header)
          }
          onDragStart={dragStart}
        >
          <span
            style={{ width: '80%', cursor: 'pointer' }}
            onClick={(e) => handleSortClick(e, header.columnName)}
          >
            {title}
          </span>
          <span
            style={{ width: '20%', float: 'right', textAlign: 'center' }}
            className={`mikto-grid-chevron down`}
            onClick={(e) =>
              handleFilterClick(
                e,
                header.columnName as string,
                `table-header-${props.identifier}-${id}`
              )
            }
          ></span>
        </th>
      );
    } else {
      return;
    }
  }

  function renderEditor(item: T, id: number, header: TableHeader<T>) {
    uniqueId++;
    const unique = uniqueId;
    return (
      <GridTextEditor
        record={item}
        id={getUniqueId()}
        header={header}
        onChange={handleEditChange}
        key={`ge-${id}-${unique}`}
      />
    );
  }

  function renderRow(item: T, id: number) {
    let rowStyle = 'mikto-table-row-light';
    /* istanbul ignore else */
    if (mode === 'dark') {
      rowStyle = 'mikto-table-row-dark';
    }
    uniqueId++;
    let unique = uniqueId;

    let record: T;
    /* istanbul ignore else */
    if (item) {
      record = item;
      if (item === editingRecord) {
        rowStyle = 'mikto-table-row-editing';
      }
    }
    return (
      <tr
        // @ts-ignore
        onClick={(e) => rowClick(e, record)}
        key={`table-row-${id}-${unique}`}
        className={`${rowStyle}`}
      >
        {props.headers.map((header, i) => {
          const { visible = true } = header;
          /* istanbul ignore else */
          if (visible) {
            const data = item[header.columnName];

            const customRenderer = props.customRenderers?.[header.columnName];
            /* istanbul ignore else */
            if (customRenderer) {
              return (
                <td style={header.style} key={`table-td-${i}-${id}-${unique}`}>
                  {customRenderer(item)}
                </td>
              );
            }

            if (isEditing && editingRecord === record) {
              // display the editing equivalent of this field
              return renderEditor(record, i, header);
            } else {
              return (
                <td style={header.style} key={`table-td-${i}-${id}-${unique}`}>
                  {isPrimitive(item[header.columnName])
                    ? item[header.columnName]
                    : ''}
                </td>
              );
            }
          }
        })}
      </tr>
    );
  }

  const handleFilterItemClick = (
    checked: boolean,
    r: string,
    headerString: string
  ) => {
    if (checked) {
      setFilterColumn(headerString);
      /* istanbul ignore else */
      if (!checkedFilters.includes(r)) {
        checkedFilters.push(r);
        /* istanbul ignore else */
        if (headerString.length > 0) {
          const newData = props.data.filter((d) =>
            // @ts-ignore
            checkedFilters.includes(d[headerString])
          );
          setFilteredData(newData);
        }
      }
    } else {
      const newFilters = checkedFilters.filter((f) => f !== r);
      if (newFilters.length == 0) {
        setFilteredData(props.data);
      } else {
        if (headerString.length > 0) {
          const newData = props.data.filter((d) =>
            // @ts-ignore
            newFilters.includes(d[headerString])
          );
          setFilteredData(newData);
        }
      }
      setCheckedFilters(newFilters);
    }
  };

  return (
    <div className={tableClassName} style={{ ...style, width: '100%' }}>
      <table
        ref={table}
        style={{ width: '100%' }}
        className={props.tableClassName}
        id={props.identifier}
      >
        <thead
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          onDragEnter={dragEnter}
          onDrop={drop}
        >
          <tr>{props.headers.map(renderHeader)}</tr>
        </thead>
        <tbody>{filteredData.map(renderRow)}</tbody>
      </table>
      <div id={`mikto-columns-${props.identifier}`}></div>
      <div id={`mikto-filter-${props.identifier}`}></div>
      <div id={`mikto-confirm=${props.identifier}`}></div>
      <Columns
        open={showColumnsModal}
        divId={`mikto-columns-${props.identifier}`}
        style={columnModalStyle as React.CSSProperties}
        headers={props.headers as unknown as string[]}
        checkedColumns={checkedColumns}
        handleCheckClick={handleColumnCheck}
        identifier={props.identifier}
        data={props.data}
      />
      <Filter
        header={headerString}
        open={showFilter}
        divId={`mikto-filter-${props.identifier}`}
        data={props.data}
        style={filterStyle}
        availableFilters={checkedFilters}
        filterItemClicked={handleFilterItemClick}
      />
      <RowEditConfirmation
        show={isEditing}
        hide={() => setIsEditing(false)}
        style={confirmStyle}
        confirm={handleEditConfirm}
        identifier={props.identifier}
      />
    </div>
  );
}

export default DataGrid;
