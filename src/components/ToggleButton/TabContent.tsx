import React from 'react';

export interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabContent = (props: TabContentProps) => {
  const { id, activeTab, children } = props;

  return activeTab === id ? (
    <div className="tab-content">{children}</div>
  ) : null;
};

export default TabContent;
