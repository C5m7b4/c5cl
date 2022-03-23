import React from 'react';

export interface TabNavItemProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (s: string) => void;
}

const TabNavItem = (props: TabNavItemProps) => {
  const { id, title, activeTab, setActiveTab } = props;

  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleClick}
      className={activeTab === id ? 'toggle-button-active-tab' : ''}
    >
      {title}
    </li>
  );
};

export default TabNavItem;
