import React, { useState } from 'react';

import './Collapse.css';

export interface CollapseProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const Collapse = (props: CollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="wrap-collapse">
      <input id={props.id} type="checkbox" />
      <label
        data-testid={`collapse-${props.id}`}
        className={`${
          isCollapsed ? 'lbl-toggle-collapse' : 'lbl-toggle-collapsed'
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {props.label}
      </label>
      <div
        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Collapse;
