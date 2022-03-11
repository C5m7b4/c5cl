import React, { useState, useRef, useEffect } from 'react';

import './Tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  position: TooltipPosition;
  children: React.ReactNode;
  message: string;
  style?: React.CSSProperties;
}

const Tooltip = (props: TooltipProps) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);

  let internalStyle = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '5px',
  } as React.CSSProperties;

  const tooltipRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (props.style) {
      internalStyle = props.style;
    }

    if (tooltipRef.current) {
      tooltipRef.current.addEventListener('mouseleave', hideTooltip);
    }
    if (triggerRef.current) {
      triggerRef.current.addEventListener('mouseover', showTooltip);
    }

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.removeEventListener('mouseleave', hideTooltip);
      }
      if (triggerRef.current) {
        triggerRef.current.removeEventListener('mouseover', showTooltip);
      }
    };
  }, []);

  const showTooltip = () => {
    setDisplayTooltip(true);
  };

  const hideTooltip = () => {
    setDisplayTooltip(false);
  };

  return (
    <span className="mcl-tooltip-wrapper" ref={tooltipRef}>
      {displayTooltip ? (
        <div className={`mcl-tooltip-bubble mcl-tooltip-${props.position}`}>
          <div className="mcl-tooltip-message" style={internalStyle}>
            {props.message}
          </div>
        </div>
      ) : null}
      <span ref={triggerRef} className="mcl-tooltip-trigger">
        {props.children}
      </span>
    </span>
  );
};

export default Tooltip;
