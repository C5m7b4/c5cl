import React from 'react';
import { Story, Meta } from '@storybook/react';
import '../../../dist/css/c5-editor.css';

import CodeDisplay, { CodeDisplayProps } from './CodeDisplay';

export default {
  title: 'Widgets/CodeDisplay',
  component: CodeDisplay,
} as Meta;

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

const Template: Story<CodeDisplayProps> = (args) => <CodeDisplay {...args} />;

export const CodeDisplayExample = Template.bind({});
CodeDisplayExample.args = {
  showLineNumbers: true,
  code: codeSnippet.contents,
};
