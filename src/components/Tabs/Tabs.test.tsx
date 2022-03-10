// @ts-nocheck

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Tabs from './Tabs';

describe('Tabs', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Tabs>
        <div name="tab1" label="Tab1">
          <h2>Tab1</h2>
        </div>
        <div name="tab2" label="tab2">
          <h2>Tab2</h2>
        </div>
      </Tabs>
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle click', () => {
    const { container, getByRole } = render(
      <Tabs>
        <div className="tab1" label="Tab1">
          <h2>Tab1</h2>
        </div>
        <div className="tab2" label="tab2">
          <h2>Tab2</h2>
        </div>
      </Tabs>
    );
    const tab = container.querySelector('div > div:nth-child(1)');
    // @ts-ignore
    fireEvent.click(tab);
  });
});
