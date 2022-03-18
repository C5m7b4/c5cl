import React from 'react';
import './OutlineButton.css';

export type OutlineButtonTypes =
  | 'success'
  | 'dark'
  | 'info'
  | 'error'
  | 'warning'
  | 'danger'
  | 'default';

export interface OutlineButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type: OutlineButtonTypes;
  style?: React.CSSProperties;
}

const OutlineButton = (props: OutlineButtonProps) => {
  const { type, text, disabled = false, onClick, style } = props;
  console.log('type', type);

  return (
    <button
      style={style}
      className={`btn ${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OutlineButton;
