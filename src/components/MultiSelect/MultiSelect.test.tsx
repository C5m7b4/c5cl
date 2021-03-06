import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelect from './MultiSelect';
import { data } from './data';

const Sandbox = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheck = (s: string[]) => {
    setCheckedItems(s);
  };
  return (
    <div>
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={handleCheck}
        id="id"
        selectBoxId="selectBoxId"
        backgroundColor="red"
        selectId="selectId"
        inputId="inputId"
      />
      <div className="other">Here is some other content</div>
    </div>
  );
};

describe('MultiSelect', () => {
  test('should render correctly', () => {
    const setCheckedItems = jest.fn();
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
        id="id"
        selectBoxId="selectBoxId"
        backgroundColor="red"
        selectId="selectId"
        inputId="inputId"
      />
    );

    expect(container).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalled();
  });
  test('should render without some default props', () => {
    const setCheckedItems = jest.fn();
    const { container, getByRole } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    expect(container).toMatchSnapshot();
    const option = getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    fireEvent.click(option);
  });
  test('should handle click outside', () => {
    const div = document.createElement('div');
    div.id = 'outside';
    document.body.appendChild(div);
    const portal = document.createElement('div');
    portal.id = 'ms-portal-container';
    document.body.appendChild(portal);
    const setCheckedItems = jest.fn();
    const { container, getByRole } = render(
      <Sandbox />
      // <MultiSelect
      //   data={data}
      //   defaultOption="select a department"
      //   keyDescriptor="keyDescriptor"
      //   optionValue="id"
      //   optionText="value"
      //   checkedItems={[]}
      //   setCheckedItems={setCheckedItems}
      // />
    );

    const option = getByRole('option', { name: /select a department/ });
    fireEvent.click(option);

    const outside = document.querySelector('outside');
    if (outside) {
      fireEvent.click(outside);
    }

    const other = container.querySelector('.other') as HTMLDivElement;
    fireEvent.click(other);
  });
  test('should handle check', () => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const setCheckedItems = jest.fn();
    const { container, getByRole } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = getByRole('option', { name: /select a department/ });
    fireEvent.click(option);

    const dept = getByRole('checkbox', { name: /Grocery/ });
    fireEvent.click(dept);
    fireEvent.click(dept);
    fireEvent.click(dept);
  });
  test('should handle search', () => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const setCheckedItems = jest.fn();
    const { container, getByRole, getByPlaceholderText } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );
    const option = getByRole('option', { name: /select a department/ });
    fireEvent.click(option);

    userEvent.type(screen.getByPlaceholderText(/search/i), 'gro');
    const input = getByPlaceholderText('search') as HTMLInputElement;
    expect(input.value).toEqual('gro');

    userEvent.type(
      screen.getByPlaceholderText(/search/i),
      '{backspace}{backspace}{backspace}'
    );
    expect(input.value).toEqual('');
  });
  test('should handle setTimeout', () => {
    jest.useFakeTimers();
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
    const setCheckedItems = jest.fn();
    const { rerender, getByRole } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    rerender(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );
    jest.advanceTimersByTime(500);
  });
});
