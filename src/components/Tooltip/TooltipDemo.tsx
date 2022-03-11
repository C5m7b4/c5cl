import React from 'react';

import Tooltip from './Tooltip';

import { TooltipPosition } from './Tooltip';

export interface TooltipDemoProps {
  position: TooltipPosition;
  message: string;
}

const TooltipDemo = (props: TooltipDemoProps) => {
  return (
    <div>
      <Tooltip
        position={props.position}
        message={props.message}
        style={{ marginTop: '20px' }}
      >
        <button>{props.message}</button>
      </Tooltip>
    </div>
  );
};

export default TooltipDemo;
