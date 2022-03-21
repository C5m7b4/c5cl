import React from 'react';
import { Theme } from '../../types';
import './TextInput.css';

export type TextInputType = 'text' | 'number';
export type TextInputAutoComplete = 'on' | 'off' | string;

export interface TextInputProps {
  id: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: TextInputType;
  placeholder?: string;
  value: string | number;
  error?: string;
  readOnly?: boolean;
  autoComplete?: TextInputAutoComplete;
  theme?: Theme;
}

function TextInput(props: TextInputProps) {
  let wrapperClass = `c5cl-textInput`;
  if (props.error && props.error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={props.id}
        className={`c5cl-textinput-label-${props.theme}`}
      >
        {props.label}
      </label>
      <div className="field">
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          className={`c5cl-textinput-${props.theme}`}
          value={props.value}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          name={props.name}
          autoComplete={props.autoComplete}
        />
      </div>
      {props.error && (
        <div className="alert alert-danger" data-testid="alert">
          {props.error}
        </div>
      )}
    </div>
  );
}

export default TextInput;
