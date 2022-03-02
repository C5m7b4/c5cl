import React from 'react';
import { render } from '@testing-library/react';

import TextInput from './TextInput';

describe('TextInput', () => {
  test('should render correctly', () => {
    const testFn = jest.fn();
    const frag = render(
      <TextInput
        id="testId"
        name="testId"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
      />
    );

    expect(frag).toMatchSnapshot();
  });
});
