import React from 'react';
import MenuItems from './MenuItems';

interface SubMenuProps {
  title: string;
}

interface ItemProps {
  title: string;
  submenu?: SubMenuProps[];
}

interface NavbarProps {
  items: ItemProps[];
}

const Navbar = (props: NavbarProps) => {
  const depthLevel = 0;
  return (
    <nav>
      <ul className="menus">
        {props.items.map((menu, index) => {
          return (
            <MenuItems
              items={menu}
              key={`mi-${index}`}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
