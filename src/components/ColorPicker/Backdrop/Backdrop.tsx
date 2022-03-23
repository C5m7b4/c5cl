import React from 'react';

type BackdropProps = {
  show: boolean;
  close: () => void;
};

const Backdrop = ({ show, close }: BackdropProps) => {
  const backdropStyle = {
    position: 'fixed',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: show ? 'block' : 'none',
    background: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  } as React.CSSProperties;

  return <div style={backdropStyle} onClick={close}></div>;
};

export default Backdrop;
