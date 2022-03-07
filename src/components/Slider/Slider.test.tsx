import React from 'react';
import { render } from '@testing-library/react';
import Slider from './Slider';

const trackImage =
  'data:image/png;base64,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';

describe('Slider', () => {
  test('component renders correctly', () => {
    const testFn = jest.fn();
    const frag = render(
      <Slider
        id="test"
        name="test"
        onChange={testFn}
        min={1}
        max={10}
        step={2}
        value={4}
        trackColor={'#ff0000'}
        image={trackImage}
      />
    );
    expect(frag).toMatchSnapshot();
  });

  test('creating style element', () => {
    let style = document.createElement('style');
    document.head.appendChild(style);
    style.textContent = `.slider-style::-webkit-slider-thumb{background-image: url("https://static.vecteezy.com/system/resources/thumbnails/002/297/979/small/planet-illustration-of-the-planet-earth-planet-with-t-shirts-and-ode-cartoon-style-free-vector.jpg")}`;
    expect(style).toBeTruthy();
  });
  test('should render with out trackColor', () => {
    const testFn = jest.fn();
    const frag = render(
      <Slider
        id="test"
        name="test"
        onChange={testFn}
        min={1}
        max={10}
        step={2}
        value={4}
        image={trackImage}
      />
    );
    expect(frag).toMatchSnapshot();
  });
  test('should render without an image', () => {
    const testFn = jest.fn();
    const frag = render(
      <Slider
        id="test"
        name="test"
        onChange={testFn}
        min={1}
        max={10}
        step={2}
        value={4}
        trackColor={'#ff0000'}
      />
    );
    expect(frag).toMatchSnapshot();
  });
});
