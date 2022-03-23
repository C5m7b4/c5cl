import React, { useState, useEffect } from 'react';
import TabNavItem from './TabNavItem';
import TabContent from './TabContent';

import './ToggleButton.css';

export interface ToggleButtonProps {
  children: JSX.Element[];
}

const ToggleButton = (props: ToggleButtonProps) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { children } = props;

  useEffect(() => {
    setActiveTab('tab-0');
  }, []);

  return (
    <div className="toggle-button">
      <ul className="nav">
        {props.children &&
          props.children.map((child, idx) => (
            <TabNavItem
              key={`tni-${idx}`}
              title={child.props.title}
              id={`tab-${idx}`}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
      </ul>
      <div className="outlet">
        {children &&
          children.map((child, idx) => (
            <TabContent
              key={`tc-${idx}`}
              id={`tab-${idx}`}
              activeTab={activeTab}
            >
              {child.props.children}
            </TabContent>
          ))}
      </div>
    </div>
  );
};

export default ToggleButton;
