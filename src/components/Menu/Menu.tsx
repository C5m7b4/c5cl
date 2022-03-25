import React from 'react';
import Navbar from './Navbar';
import './Menu.css';

interface SubMenuProps {
  title: string;
}

interface ItemProps {
  title: string;
  submenu?: SubMenuProps[];
}

export interface MenuProps {
  logo?: any;
  items: ItemProps[];
}

const Menu = (props: MenuProps) => {
  return (
    <header>
      <div className="nav-area">
        <a href="/#" className="logo">
          {props.logo}
        </a>
        <Navbar items={props.items} />
      </div>
    </header>
  );
};

export default Menu;
