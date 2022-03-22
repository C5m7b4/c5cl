import React from 'react';

import './SizeableToggle.css';

export interface SizeableToggleProps {
  name: string;
  id: string;
  onText?: string;
  offText?: string;
  small?: boolean;
  disabled?: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SizeableToggle = (props: SizeableToggleProps) => {
  const { small = false, disabled = false, checked = false } = props;
  return (
    <div className={`sizeable-toggle${small ? '-small-switch' : ''}`}>
      <input
        type="checkbox"
        className="sizeable-toggle-checkbox"
        name={props.name}
        id={props.id}
        disabled={disabled}
        checked={checked}
        onChange={props.onChange}
      />
      <label className="sizeable-toggle-label" htmlFor={props.name}>
        <span
          className={`${
            disabled
              ? 'sizeable-toggle-inner sizeable-toggle-disabled'
              : 'sizeable-toggle-inner'
          }`}
          data-yes={small ? '' : props.onText}
          data-no={small ? '' : props.offText}
        ></span>
        <span
          className={`${
            disabled
              ? 'sizeable-toggle-switch sizeable-toggle-disabled'
              : 'sizeable-toggle-switch'
          }`}
        ></span>
      </label>
    </div>
  );
};

export default SizeableToggle;
