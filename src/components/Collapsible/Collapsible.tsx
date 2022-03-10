import React from 'react';

import './Collapsible.css';

export interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
}

const Collapsible = (props: CollapsibleProps) => {
  return (
    <div className="wrap-collapsible">
      <input id="collapsible" className="toggle-collapsible" type="checkbox" />
      <label htmlFor="collapsible" className="lbl-toggle-collapsible">
        {props.label}
      </label>
      <div className="collapsible-content">
        <div className="inner-content-collapsible">{props.children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
