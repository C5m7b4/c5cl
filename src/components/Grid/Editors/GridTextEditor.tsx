import React, { useState } from 'react';
import { TableHeaderEditor, TableHeader } from '../DataGrid';
import ColorPicker from '../../ColorPicker';
import DatePicker from '../../DatePicker';
import TimePicker from '../../TimePicker';
// import TimePickerReturnValue from '../../TimePicker';
import { formatDate } from '../../../utils';

export interface GridTextEditorProps<T> {
  record: T;
  id: number;
  header: TableHeader<T>;
  onChange?: (e: string, header: TableHeader<T>, record: T) => void;
}

const GridTextEditor = <T,>(props: GridTextEditorProps<T>) => {
  const [value, setValue] = useState(
    props.record[props.header.columnName] as unknown as string
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value, props.header, props.record);
    }
  };

  const handleDateChange = (d: Date) => {
    if (props.onChange) {
      props.onChange(formatDate(d), props.header, props.record);
    }
  };

  // @ts-ignore
  const handleTimeChange = (t: TimePickerReturnValue) => {
    if (props.onChange) {
      props.onChange(t.toString(), props.header, props.record);
    }
  };

  const handleColorChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e, props.header, props.record);
    }
  };

  const myStyle = {
    borderRadius: '5px',
    border: 0,
    outline: 'none',
  };
  const { record, id, header } = props;
  if (header.editor) {
    switch (header.editor) {
      case 'number':
        return (
          <td style={header.style} key={`table-td-${id}`}>
            <input
              style={{ ...header.style, ...myStyle }}
              type="number"
              value={record[header.columnName] as unknown as string}
              onChange={handleChange}
            />
          </td>
        );
      case 'date':
        return (
          <td style={header.style} key={`table-td-${id}`}>
            <DatePicker date={new Date()} onChange={handleDateChange} />
          </td>
        );
        break;
      case 'time':
        return (
          <td style={header.style} key={`table-td-${id}`}>
            <TimePicker
              style={header.style}
              time={new Date()}
              onChange={handleTimeChange}
            />
          </td>
        );
        break;
      case 'color':
        return (
          <td style={header.style} key={`table-td-${id}`}>
            <ColorPicker color={'#000'} onChange={handleColorChange} />
          </td>
        );
        break;
      default:
        // we are defaulting to text
        return (
          <td style={header.style} key={`table-td-${id}`}>
            <input
              style={{ ...header.style, ...myStyle }}
              type="text"
              value={record[header.columnName] as unknown as string}
              onChange={handleChange}
            />
          </td>
        );
    }
  } else {
    return (
      <td style={header.style} key={`table-td-${id}`}>
        <input
          style={{ ...header.style, ...myStyle }}
          type="text"
          value={record[header.columnName] as unknown as string}
          onChange={handleChange}
        />
      </td>
    );
  }
};

export default GridTextEditor;
