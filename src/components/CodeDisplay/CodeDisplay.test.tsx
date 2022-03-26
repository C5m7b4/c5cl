import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  reservedWords,
  appWords,
  defaultWords,
  alternateWords,
} from '../../utils';
import CodeDisplay from './CodeDisplay';

const codeSnippet = {
  name: 'Fetch',
  contents: `import avion from 'avion'
  async function getEmployees(url, apikey, searchPhrase){
    let json = await avion({
      method: 'GET',
      cors: true,
      headers: {
        'Content-Type':'application/json'
      },
      url: url + 'users/list',
      params: {
        apikey,
        searchPhrase
      }
    })

    return json;
  }`,
};

describe('CodeDisplay', () => {
  test('should render correctly', () => {
    const { container } = render(<CodeDisplay code={codeSnippet.contents} />);
    expect(container).toMatchSnapshot();
  });
  test('should copy code to clipboard', () => {
    jest.useFakeTimers();
    const { container } = render(<CodeDisplay code={codeSnippet.contents} />);
    const div = container.querySelector(
      '.c5-editor-clipboard'
    ) as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(5000);
  });
  test('should format the code', () => {
    const { container } = render(
      <CodeDisplay code={codeSnippet.contents} format={true} />
    );
  });
  test('should render custom reserved words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customReserveWords={reservedWords}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render customAppWords', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customAppWords={appWords}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render custom default words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customDefaults={defaultWords}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should render custom alternate words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customAlternatives={alternateWords}
      />
    );
    expect(container).toMatchSnapshot();
  });
  test('should handle not showing line number', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        showLineNumbers={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
