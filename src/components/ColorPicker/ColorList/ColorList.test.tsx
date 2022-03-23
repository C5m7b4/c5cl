import React from 'react';
import { render } from '@testing-library/react';
import ColorList from './ColorList';

describe('ColorList', () => {
  test('should render correctly', () => {
    const jestFn = jest.fn;
    const { container } = render(
      <ColorList colors={['#000000']} onClick={jestFn} />
    );
    expect(container).toMatchSnapshot();
  });
});
