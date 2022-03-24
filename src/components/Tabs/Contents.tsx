import React from 'react';

export interface ContentsProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

const Contents = (props: ContentsProps) => {
  const { id, activeTab, children } = props;

  return activeTab === id ? <div>{children}</div> : null;
};

export default Contents;
