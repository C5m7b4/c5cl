import React, { useState, useEffect } from 'react';
import { findColor } from '../../utils';
import {
  reservedWords,
  htmlEncode,
  appWords,
  defaultWords,
  alternateWords,
  operators,
  copyTextToClipboard,
} from '../../utils';
// import prettier from 'prettier';
// import parser from 'prettier/parser-babel';
import { Parsers } from '../../types';
import { clipboard } from '../Icons';

export interface CodeDisplayProps {
  code: string;
  showLineNumbers?: boolean;
  codeElem?: string;
  enableCodeElem?: boolean;
  codeStr?: string;
  enableCodeStr?: boolean;
  codeQuote?: string;
  enableCodeQuote?: boolean;
  reserved?: string;
  enableReserved?: boolean;
  appColor?: string;
  enableAppColor?: boolean;
  defaultColor?: string;
  enableDefault?: boolean;
  codeSingle?: string;
  enableCodeSingle?: boolean;
  betweenSingleQuotes?: string;
  enableBetweenSingleQuotes?: boolean;
  parens?: string;
  enableParens?: boolean;
  insideParens?: string;
  enableInsideParens?: boolean;
  alternates?: string;
  enableAlternates?: boolean;
  customReserveWords?: string[];
  customAppWords?: string[];
  customDefaults?: string[];
  customAlternatives?: string[];
  colorInterfaceContents?: boolean;
  interfaceKey?: string;
  interfaceValue?: string;
  curlyBracesColor?: string;
  enableCurlyBracesColor?: boolean;
  destructured?: string;
  enableDestructured?: boolean;
  operatorColor?: string;
  enableOperatorColor?: boolean;
  format?: boolean;
  parserType?: Parsers;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  showLineNumbers = true,
  codeElem = findColor('code-elem'),
  enableCodeElem = true,
  codeStr = findColor('code-str'),
  enableCodeStr = true,
  codeQuote = findColor('code-quote'),
  enableCodeQuote = true,
  reserved = findColor('reserved'),
  enableReserved = true,
  appColor = findColor('app-color'),
  enableAppColor = true,
  defaultColor = findColor('default-color'),
  enableDefault = true,
  codeSingle = findColor('code-single'),
  enableCodeSingle = true,
  betweenSingleQuotes = findColor('between-single-quotes'),
  enableBetweenSingleQuotes = true,
  parens = findColor('parens'),
  enableParens = true,
  insideParens = findColor('inside-parens'),
  enableInsideParens = true,
  alternates = findColor('alternates'),
  enableAlternates = true,
  customReserveWords = [],
  customAppWords = [],
  customDefaults = [],
  customAlternatives = [],
  colorInterfaceContents = true,
  interfaceKey = findColor('interface-key'),
  interfaceValue = findColor('interface-value'),
  curlyBracesColor = findColor('curly-braces'),
  enableCurlyBracesColor = true,
  destructured = findColor('destructued'),
  enableDestructured = true,
  operatorColor = findColor('operator-color'),
  enableOperatorColor = true,
  parserType = 'babel',
  format = false,
}) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const raw = /<|'/g.test(code);
    /* istanbul ignore else */
    if (raw) {
      /* istanbul ignore else */
      if (format) {
        //code = formatCode(code);
      }
      code = htmlEncode(code.slice(0, -1));
    }
    /* istanbul ignore else */
    if (code.length > 0) {
      const lines = code.split('\n');
      setLines(lines);
    }
  }, [code, format, parserType]);

  // const formatCode = (code: string): string => {
  //   try {
  //     const formatted = prettier.format(code, {
  //       parser: parserType,
  //       plugins: [parser],
  //       useTabs: false,
  //       semi: true,
  //       singleQuote: true,
  //     });
  //     return formatted;
  //   } catch (error) {
  //     console.error('Could not parse your code using the babel parser');
  //     return code;
  //   }
  // };

  const copy = (
    t: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { result, msg } = copyTextToClipboard(t);
    const div = document.createElement('div');
    div.classList.add('c5-editor-clipboard-result');
    div.style.position = 'absolute';
    div.style.top = e.clientY + 40 + 'px';
    div.style.left = e.clientX - 80 + 'px';
    /* istanbul ignore else */
    if (e.view) {
      // @ts-ignore
      div.style.top = e.clientY + 40 + e.view.scrollY + 'px';
    }
    if (result == true) {
      div.style.color = 'limegreen';
      div.innerText = 'Code copied to clipboard';
    } else {
      div.style.color = 'red';
      div.innerText = msg;
    }

    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, 4000);
  };

  const replace = (line: string): string => {
    /* istanbul ignore else */
    if (colorInterfaceContents) {
      /* istanbul ignore else */
      if (line.indexOf(':') > 0) {
        const pos = line.indexOf(':');
        const left = line.substring(0, pos);
        const right = line.substring(pos + 1);
        const regExp1 = new RegExp(left);
        line = line.replace(
          regExp1,
          `<span style="color:${interfaceKey}">${left}</span>`
        );
        const regExp2 = new RegExp(right);
        line = line.replace(
          regExp2,
          `<span style="color:${interfaceValue}">${right}</span>`
        );
      }
    }

    /* istanbul ignore else */
    if (enableDestructured) {
      line = line.replace(
        /{(.*?)}/g,
        `<span style="color:${destructured}">{$1}</span>`
      );
    }

    /* istanbul ignore else */
    if (enableCurlyBracesColor) {
      line = line.replace(
        /{/g,
        `<span style="color:${curlyBracesColor}">{</span>`
      );
      line = line.replace(
        /}/g,
        `<span style="color:${curlyBracesColor}">}</span>`
      );
    }

    /* istanbul ignore else */
    if (enableCodeStr) {
      line = line.replace(
        /&quot;(.*?)&quot;/g,
        `<span style="color:${codeStr}">&quot;$1&quot;</span>`
      );
    }

    /* istanbul ignore else */
    if (enableCodeQuote) {
      line = line.replace(
        /&quot;/g,
        `<span style="color:${codeQuote}">&quot;</span>`
      );
    }

    /* istanbul ignore else */
    if (enableBetweenSingleQuotes) {
      line = line.replace(
        /&#39;(.*?)&#39;/g,
        `<span style="color:${betweenSingleQuotes}">&#39;$1&#39;</span>`
      );
    }

    /* istanbul ignore else */
    if (enableCodeSingle) {
      line = line.replace(
        /&#39;/g,
        `<span style="color:${codeSingle}">&#39;</span>`
      );
    }

    /* istanbul ignore else */
    if (enableInsideParens) {
      line = line.replace(
        /\((.*?)\)/g,
        `<span style="color:${insideParens}">($1)</span>`
      );
    }

    /* istanbul ignore else */
    if (enableParens) {
      line = line.replace(/\(/g, `<span style="color:${parens}">(</span>`);
      line = line.replace(/\)/g, `<span style="color:${parens}">)</span>`);
    }

    /* istanbul ignore else */
    if (enableCodeElem) {
      line = line.replace(
        /&lt;(.*?)&gt;/g,
        `<span style="color:${codeElem}">&lt;$1&gt;</span>`
      );
    }

    /* istanbul ignore else */
    if (enableReserved) {
      reservedWords.forEach((word) => {
        const re = new RegExp(word, 'gi');
        line = line.replace(
          re,
          `<span style="color:${reserved}">${word}</span>`
        );
      });
    }

    /* istanbul ignore else */
    if (enableAppColor) {
      appWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color:${appColor}">${word}</span>`
        );
      });
    }

    /* istanbul ignore else */
    if (enableDefault) {
      defaultWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color:${defaultColor}">${word}</span>`
        );
      });
    }

    /* istanbul ignore else */
    if (enableAlternates) {
      alternateWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color: ${alternates}">${word}</span>`
        );
      });
    }

    /* istanbul ignore else */
    if (customReserveWords.length > 0) {
      customReserveWords.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${reserved}">${word}</span>`
          );
        }
      });
    }

    /* istanbul ignore else */
    if (customAppWords.length > 0) {
      customAppWords.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${appColor}">${word}</span>`
          );
        }
      });
    }

    /* istanbul ignore else */
    if (customDefaults.length > 0) {
      customDefaults.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${defaultColor}">${word}</span>`
          );
        }
      });
    }

    /* istanbul ignore else */
    if (customAlternatives.length > 0) {
      customAlternatives.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${alternates}">${word}</span>`
          );
        }
      });
    }

    /* istanbul ignore else */
    if (enableOperatorColor) {
      operators.forEach((operator) => {
        const re = new RegExp(operator, 'g');
        line = line.replace(
          re,
          `<span style="color:${operatorColor}">${operator}</span>`
        );
      });
    }

    return line;
  };

  return (
    <code className="code">
      <div className="copy-to-clipboard">
        <div className="c5-editor-clipboard" onClick={(e) => copy(code, e)}>
          {clipboard()}
        </div>
      </div>
      <div className="editor-top-spacer">
        {showLineNumbers ? <div className="line-number"></div> : <div></div>}
        <div className="code-line"></div>
      </div>
      {lines.length === 0 ? (
        <div className="editor-empty-line">
          {showLineNumbers ? <div className="line-number"></div> : <div></div>}
          <div className="code-line">Currently no code to display</div>
        </div>
      ) : (
        <React.Fragment>
          {lines.map((line, i) => (
            <div key={`cl-${i}`} className="code-content">
              {showLineNumbers ? (
                <div className="line-number">
                  {i + 1}
                  {'  '}
                </div>
              ) : (
                <div></div>
              )}
              <div
                className="code-line"
                dangerouslySetInnerHTML={{ __html: replace(line) }}
              ></div>
            </div>
          ))}
        </React.Fragment>
      )}
      <div className="editor-bottom-spacer">
        {showLineNumbers ? <div className="line-number"></div> : <div></div>}
        <div></div>
      </div>
    </code>
  );
};

export default CodeDisplay;
