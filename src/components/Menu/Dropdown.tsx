import React from 'react';
import MenuItems from './MenuItems';

interface SubMenuProps {
  title: string;
}

interface DropDownProps {
  submenus: SubMenuProps[];
  dropdown: boolean;
  depthLevel: number;
}

const Dropdown = (props: DropDownProps) => {
  let { depthLevel } = props;
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={`dropdown ${dropdownClass} ${props.dropdown ? 'show' : ''}`}>
      {props.submenus.map((submenu, index) => (
        <li key={`sbm-${index}`} className="menu-items">
          <MenuItems
            items={submenu}
            key={`mi-sb-${index}`}
            depthLevel={depthLevel}
          />
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
