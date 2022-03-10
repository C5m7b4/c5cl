import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MultiSelectPortal from './MultiSelectPortal';
import { data } from './data';

describe('MultiSelectPortal', () => {
  test('should render correctly', () => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const handleCheck = jest.fn();
    const handleSearchChange = jest.fn();
    const amIChecked = jest.fn();
    const { container } = render(
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionValue="id"
        optionText="value"
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputid"
        id="id"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should render correctly without an id', () => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const handleCheck = jest.fn();
    const handleSearchChange = jest.fn();
    const amIChecked = jest.fn();
    const { container } = render(
      // @ts-ignore
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionValue="id"
        optionText="value"
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputid"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should not draw a portal', () => {
    const handleCheck = jest.fn();
    const handleSearchChange = jest.fn();
    const amIChecked = jest.fn();
    const { container } = render(
      // @ts-ignore
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionValue="id"
        optionText="value"
        open={false}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputid"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should render with no data', () => {
    const handleCheck = jest.fn();
    const handleSearchChange = jest.fn();
    const amIChecked = jest.fn();
    const { container } = render(
      // @ts-ignore
      <MultiSelectPortal
        data={[]}
        keyDescriptor={'select a department'}
        optionValue="id"
        optionText="value"
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputid"
      />
    );

    expect(container).toMatchSnapshot();
  });
  test('should check a box', () => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const handleCheck = jest.fn();
    const handleSearchChange = jest.fn();
    const amIChecked = jest.fn();
    const { container, getByRole } = render(
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionValue="id"
        optionText="value"
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputid"
        id="id"
      />
    );

    const check = getByRole('checkbox', { name: /Grocery/ });
    fireEvent.click(check);
  });
});
