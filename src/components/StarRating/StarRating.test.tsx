import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StarRating from './StarRating';

const testfn = jest.fn();

describe('Star Rating', () => {
  test('should render properly', () => {
    const { container } = render(<StarRating onClick={testfn} />);
    expect(container).toMatchSnapshot();
  });
  test('should handle mouse enter', () => {
    const { container, getByTestId } = render(<StarRating onClick={testfn} />);
    fireEvent.mouseEnter(screen.getByTestId('star-1'));
    fireEvent.mouseLeave(screen.getByTestId('star-1'));
  });
  test('should handle click', () => {
    const { container, getByTestId } = render(<StarRating onClick={testfn} />);
    fireEvent.click(screen.getByTestId('star-1'));
  });
});
