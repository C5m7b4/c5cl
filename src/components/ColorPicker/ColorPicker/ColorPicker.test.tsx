import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker color={'#000000'} onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should hide alpha', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker color={'#000000'} onChange={testFn} hideAlpha />
    );
    expect(container).toMatchSnapshot();
  });
  test('should have colorlist', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker
        color={'#00ff00'}
        onChange={testFn}
        presets={['#000', '#fff']}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle invalid color', () => {
    const testFn = jest.fn();
    const { container } = render(<ColorPicker color={'#aha'} />);
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (analogous)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker
        color={'#ff00ff'}
        onChange={testFn}
        combinations="analogous"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (monochromatic)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker
        color={'#fff'}
        combinations="monochromatic"
        onChange={testFn}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (splitcomplement)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker
        color={'#fff'}
        combinations="splitcomplement"
        onChange={testFn}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (triad)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker color={'#fff'} combinations="triad" onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (tetrad)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker color={'#fff'} combinations="tetrad" onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle color combinations (complement)', () => {
    const testFn = jest.fn();
    const { container } = render(
      <ColorPicker color={'#fff'} combinations="complement" onChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle input changes', () => {
    const testFn = jest.fn();
    const { container, getByRole } = render(
      <ColorPicker color={'#fff'} onChange={testFn} />
    );

    userEvent.type(screen.getByRole('spinbutton', { name: 'R' }), '255');
    const r = screen.getByRole('spinbutton', {
      name: 'R',
    }) as HTMLInputElement;
    expect(r.value).toEqual('255');

    userEvent.type(screen.getByRole('spinbutton', { name: 'G' }), '255');
    const g = screen.getByRole('spinbutton', { name: 'G' }) as HTMLInputElement;
    expect(g.value).toEqual('255');

    userEvent.type(screen.getByRole('spinbutton', { name: 'B' }), '255');
    const b = screen.getByRole('spinbutton', { name: 'B' }) as HTMLInputElement;
    expect(b.value).toEqual('255');

    userEvent.type(screen.getByRole('spinbutton', { name: 'Alpha' }), '100');
    const alpha = screen.getByRole('spinbutton', {
      name: 'Alpha',
    }) as HTMLInputElement;
    expect(alpha.value).toEqual('100');

    userEvent.type(screen.getByRole('textbox', { name: '# Hex' }), 'ffffff');
    const hex = screen.getByRole('textbox', {
      name: '# Hex',
    }) as HTMLInputElement;
    expect(hex.value).toEqual('ffffff');
  });
});
