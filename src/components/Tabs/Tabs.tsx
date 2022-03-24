import React, { useState, useEffect } from 'react';
import Tab from './Tab';
import Contents from './Contents';

import './Tabs.css';

export interface TabsProps {
  children: JSX.Element[];
}

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    setActiveTab('tab-0');
  }, []);

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
                  title={child.props.title}
                  disabled={child.props.disabled}
                  onClick={handleTabClick}
                  id={`tab-${index}`}
                  className={child.props.className}
                />
              );
            }
          })}
      </ol>
      <div className="tab-content">
        {props.children &&
          props.children.map((child, idx) => (
            <Contents
              key={`tbc-${idx}`}
              id={`tab-${idx}`}
              activeTab={activeTab}
            >
              {child.props.children}
            </Contents>
          ))}
      </div>
    </div>
  );
};

export default Tabs;
