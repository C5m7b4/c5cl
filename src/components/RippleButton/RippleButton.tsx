import React, { useEffect, useRef } from 'react';
import { NormalButtonType } from '../Button/Button';
import './RippleButton.css';

export interface RippleButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  color?: string;
  hoverColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
  type?: NormalButtonType;
}

function RippleButton(props: RippleButtonProps) {
  const btn = useRef<HTMLButtonElement>(null);
  let {
    color = '#2952e3',
    hoverColor = '#2546bd',
    textColor = '#fff',
    type = 'normal',
  } = props;

  switch (type) {
    case 'green':
      color = 'limegreen';
      hoverColor = '#2ea62e';
      textColor = '#fff';
      break;
    case 'purple':
      color = '#ba1eba';
      hoverColor = '#9c229c';
      textColor = '#fff';
      break;
    case 'danger':
      color = '#e8bb25';
      hoverColor = '#c9a734';
      textColor = "#fff';";
      break;
    case 'info':
      color = '#5a95cd';
      hoverColor = '#5680a8';
      textColor = '#fff';
      break;
    case 'success':
      color = '#1bcc4a';
      hoverColor = 'rgb(35 169 71)';
      textColor = '#fff';
      break;
    case 'error':
      color = 'red';
      hoverColor = '#bf2424';
      textColor = '#fff';
      break;
    default:
    // do nothing;
  }

  const mouseEnter = (e: React.MouseEvent) => {
    // @ts-ignore
    e.target.style.backgroundColor = hoverColor;
  };

  const mouseLeave = (e: React.MouseEvent) => {
    // @ts-ignore
    e.target.style.backgroundColor = color;
  };

  const click = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    // @ts-ignore
    const buttonTop = e.target?.offsetTop;
    // @ts-ignore
    const buttonLeft = e.target?.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('ripple-button-circle');

    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    btn.current ? btn.current.appendChild(circle) : null;

    props.onClick(e);

    setTimeout(() => {
      circle.remove();
    }, 500);
  };

  useEffect(() => {
    /* istanbul ignore else */
    if (btn.current) {
      btn.current.style.backgroundColor = color;
      btn.current.style.color = textColor;
    }
  }, []);

  return (
    <button
      ref={btn}
      style={props.style}
      className="c5-ripple-button"
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {props.text}
      <span className="ripple-button-circle"></span>
    </button>
  );
}

export default RippleButton;
