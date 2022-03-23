import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ToggleButton>
        <div title="Tab1">
          <p>Here is some content</p>
        </div>
        <div title="tab2">
          <p>Here is some more content</p>
        </div>
      </ToggleButton>
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle click', () => {
    const { container } = render(
      <ToggleButton>
        <div title="tab1">
          <p>Here is some content</p>
        </div>
        <div title="tab2">
          <p>Here is some content</p>
        </div>
      </ToggleButton>
    );
    const div = container.querySelector(
      '.toggle-button-active-tab'
    ) as HTMLDivElement;
    fireEvent.click(div);
  });
});
