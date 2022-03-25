import React from 'react';
import { Icons } from '../Icons';

import './Searchbox.css';

export interface SearchboxProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Searchbox = (props: SearchboxProps) => {
  const { search: Search } = Icons;

  return (
    <div className="searchbox-wrapper">
      <input
        className="searchbox"
        placeholder="Search"
        onChange={props.onChange}
        value={props.value}
      />
      <span className="searchbox-span">
        <Search
          theme="dark"
          type="dark"
          style={{ height: '24px', width: '24px' }}
          className="searchbox-icon"
        />
      </span>
    </div>
  );
};

export default Searchbox;
