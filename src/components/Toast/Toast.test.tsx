import React from 'react';
import { getByRole, render, fireEvent } from '@testing-library/react';

import Toast from './Toast';

describe('Toast', () => {
  test('it should render correctly', () => {
    const { container } = render(
      <Toast
        content={'Here is my Toast'}
        toastId={'123'}
        type={'success'}
        position={'top-right'}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render without position', () => {
    const { container } = render(
      // @ts-ignore
      <Toast content={'Here is a toast'} toastId={'123'} type={'success'} />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle slide animation', () => {
    const { container, getByRole } = render(
      <Toast
        content="Here is a toast"
        toastId="123"
        type="success"
        toastAnimation="slide"
        position="top-right"
      />
    );
    const div = container.querySelector('.Toastify__slide-enter--top-right');
    expect(div).toBeInTheDocument();
  });
  test('should show success icon', () => {
    const { container } = render(
      <Toast
        content="toast"
        toastId="123"
        type="success"
        toastShowIcon={true}
        position="top-right"
        toastAnimation="slide"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should show info icon', () => {
    const { container } = render(
      <Toast
        content="toast"
        toastId="123"
        type="info"
        toastShowIcon={true}
        position="top-right"
        toastAnimation="slide"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should show error icon', () => {
    const { container } = render(
      <Toast
        content="toast"
        toastId="123"
        type="error"
        toastShowIcon={true}
        position="top-right"
        toastAnimation="slide"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should show warning icon', () => {
    const { container } = render(
      <Toast
        content="toast"
        toastId="123"
        type="warning"
        toastShowIcon={true}
        position="top-right"
        toastAnimation="slide"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle removal of toast', () => {
    const { container, getByRole } = render(
      <Toast
        content="toast"
        toastId="123"
        type="warning"
        position="top-right"
      />
    );
    const div = getByRole('main');
    fireEvent.click(div);
  });
  test('should handle setTimeout', () => {
    jest.useFakeTimers();
    const { container, getByRole } = render(
      <Toast
        content="toast"
        toastId="123"
        type="warning"
        position="top-right"
      />
    );
    const div = getByRole('main');
    fireEvent.click(div);
    jest.advanceTimersByTime(1200);
  });
});
