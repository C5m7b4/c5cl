import React, { useState } from 'react';
import Tab from './Tab';

import './Tabs.css';

export interface TabsProps {
  children: JSX.Element[];
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {props.children &&
          props.children.map((child, index) => {
            if (child) {
              return (
                <Tab
                  activeTab={activeTab}
                  key={`tabs-li-${index}`}
                  label={child.props.label}
                  disabled={child.props.disabled}
                  onClick={handleTabClick}
                  id={child.props.id}
                  className={child.props.className}
                />
              );
            }
          })}
      </ol>
      <div className="tab-content">
        {props.children &&
          props.children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
      </div>
    </div>
  );
};

export default Tabs;
