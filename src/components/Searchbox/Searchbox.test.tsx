import React from 'react';
import { render } from '@testing-library/react';

import Searchbox from './Searchbox';

const testfn = jest.fn();

describe('Searchbox', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Searchbox onChange={testfn} placeholder="search" value="test" />
    );
    expect(container).toMatchSnapshot();
  });
});
