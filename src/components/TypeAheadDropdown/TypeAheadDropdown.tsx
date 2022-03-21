import React, { useState, useEffect, useRef } from 'react';

import './TypeAheadDropdown.css';

export interface TypeAheadDropdownProps<T> {
  placeholder?: string;
  data: T[];
  value: string;
  keyValue: T[keyof T];
  displayValue: keyof T;
  setSelection: (e: T) => void;
  label: string;
  labelColor?: string;
  backgroundColor?: string;
  reload?: boolean;
  style?: React.CSSProperties;
}

const TypeAheadDropDown = <T,>(props: TypeAheadDropdownProps<T>) => {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  // @ts-ignore
  const [text, setText] = useState<T[keyof T]>('');
  const [dropDownStyle, setDropDownStyle] = useState<React.CSSProperties>();
  const {
    placeholder,
    data,
    value,
    keyValue,
    displayValue,
    setSelection,
    label,
    labelColor,
    backgroundColor,
    reload,
    style,
  } = props;

  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.length > 0) {
      setSuggestions(data);
    } else {
      console.log('there is no data present');
    }

    if (typeof value !== 'undefined' && value !== null) {
      // @ts-ignore
      const records = data.filter((r) => r[keyValue] == value);
      if (records.length > 0) {
        setText(records[0][displayValue]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (typeof value !== 'undefined' && value !== null) {
      // @ts-ignore
      const records = data.filter((r: T) => r[keyValue] == value);
      if (records.length > 0) {
        setText(records[0][displayValue]);
      }
    }
  }, [reload]);

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropDownStyle({
        position: 'absolute',
        left: '7px',
        top: rect.height + 'px',
        width: rect.width - 10 + 'px',
      });
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setText(e.target.value);
    const records = data.filter((r) => {
      const recordValue = r[displayValue] as unknown as string;
      const searchValue = e.target.value.toUpperCase();
      if (recordValue.toUpperCase().includes(searchValue)) {
        return recordValue;
      }
    });
    if (records.length === 0) {
      setSuggestions(data);
    } else {
      setSuggestions(records);
    }
  };

  const handleSuggestionSelected = (selection: T) => {
    setSelection(selection);
  };

  const onFocus = () => {
    if (listRef.current) {
      listRef.current.style.visibility = 'visible';
      listRef.current.style.opacity = '1';
    } else {
      // do nothing
    }
  };

  const onBlur = () => {
    if (listRef.current) {
      listRef.current.style.opacity = '0';
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.style.visibility = 'hidden';
        }
      }, 500);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // @ts-ignore
    e.target.select();
  };

  const renderSuggestions = () => {
    return (
      <ul ref={listRef} style={dropDownStyle}>
        {suggestions.map((record, i) => (
          // @ts-ignore
          <li key={`${record[keyValue]}-${i}`}>
            <span
              className="tadd-text"
              onClick={() => handleSuggestionSelected(record)}
              style={{ color: 'white' }}
            >
              {record[displayValue as unknown as keyof T]}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="TypeAheadDropDown">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <label
          style={{
            color: labelColor ? labelColor : 'rgb(100, 109, 142)',
            marginTop: '10px',
            textAlign: 'right',
          }}
          htmlFor="typeahead"
        >
          {label}
        </label>
        <input
          ref={inputRef}
          className="form-control"
          style={{
            backgroundColor: backgroundColor ? backgroundColor : '#1f1e2e',
          }}
          name="typeahead"
          autoComplete="off"
          placeholder={placeholder}
          // @ts-ignore
          value={text}
          type="text"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={handleClick}
        />
      </div>
      {renderSuggestions()}
    </div>
  );
};

export default TypeAheadDropDown;
