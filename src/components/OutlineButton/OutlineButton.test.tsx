import React from 'react';
import { render } from '@testing-library/react';

import OutlineButton from './OutlineButton';

describe('OutlineButton', () => {
  test('should render correctly', () => {
    const testFn = jest.fn;
    const { container } = render(
      <OutlineButton text="Hello" type="default" onClick={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
});
