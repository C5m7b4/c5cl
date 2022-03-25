import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

interface SubMenuProps {
  title: string;
}

interface ItemProps {
  title: string;
  submenu?: SubMenuProps[];
}

interface MenuItemsProps {
  items: ItemProps;
  depthLevel: number;
}

const MenuItems = (props: MenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      // @ts-ignore
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = (e: React.MouseEvent) => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <div
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {props.items.title}{' '}
            {props.depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            submenus={props.items.submenu}
            dropdown={dropdown}
            depthLevel={props.depthLevel}
          />
        </>
      ) : (
        <a href="/#">{props.items.title}</a>
      )}
    </div>
  );
};

export default MenuItems;
