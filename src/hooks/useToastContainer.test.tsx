import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { useToastContainer } from './useToastContainer';

const TestHarness = () => {
  const { portalId, loaded } = useToastContainer('bottom-center');
  return (
    <div>
      <div className="portalid">{portalId}</div>
      <div className="loaded">{loaded.toString()}</div>
    </div>
  );
};

describe('useToastContainer', () => {
  test('should work', () => {
    const { container } = render(<TestHarness />);
    const portalId = container.querySelector('.portalid');
    const loaded = container.querySelector('.loaded') as HTMLDivElement;
    expect(loaded.innerHTML).toEqual('true');
  });
});
