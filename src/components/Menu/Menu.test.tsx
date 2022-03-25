import React from 'react';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';

import { menudata } from './menudata';

import Menu from './Menu';

const Sandbox = () => {
  return (
    <div>
      <Menu items={menudata} />
      <div className="other">
        Here is some other div for clicking outside of our component
      </div>
    </div>
  );
};

describe('Menu', () => {
  test('should render correctly', () => {
    const { container } = render(<Menu items={menudata} />);
    expect(container).toMatchSnapshot();
  });
  test('should show submenu', () => {
    const { container, getByRole } = render(<Menu items={menudata} />);

    const btn = screen.getByRole('button', { name: 'Services' });
    fireEvent.mouseOver(btn);
    const menuItem = screen.getByRole('button', { name: 'web development »' });
    fireEvent.mouseOver(menuItem);
    fireEvent.mouseLeave(menuItem);
    expect(container).toMatchSnapshot();
    fireEvent.mouseLeave(btn);

    fireEvent.click(btn);
  });
  test('should handle click outside', () => {
    const { container, getByRole } = render(<Sandbox />);
    const btn = screen.getByRole('button', { name: 'Services' });
    fireEvent.mouseOver(btn);

    const body = container.querySelector('.other') as HTMLDivElement;
    fireEvent.mouseDown(body);
  });
});
