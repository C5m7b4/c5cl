import React from 'react';

export interface TabProps {
  className: string;
  onClick: (e: string) => void;
  title: string;
  activeTab: string;
  disabled: boolean;
  id: string;
}

const Tab = (props: TabProps) => {
  let className = 'tab-list-item';
  if (props.id === props.activeTab) {
    className += ' tab-list-active';
  }

  return (
    <li
      onClick={() => props.onClick(props.id)}
      className={className}
      id={props.id}
    >
      {props.title}
    </li>
  );
};

export default Tab;
