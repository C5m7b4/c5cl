import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const TestCmp = () => {
  return (
    <div>
      <h2>I am a component</h2>
    </div>
  );
};

const ErrorCmp = () => {
  throw new Error('this is an error');
};

describe('ErrorBoundary', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ErrorBoundary>
        <TestCmp />
      </ErrorBoundary>
    );
    expect(container).toMatchSnapshot();
  });
  test('should render an error', () => {
    try {
      const { container } = render(
        <ErrorBoundary>
          <ErrorCmp />
        </ErrorBoundary>
      );
    } catch (error) {}
  });
});
