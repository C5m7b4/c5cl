import { ToastPosition } from '../types';
import { EditorColorObject, colors } from './colors';

export function generateToastId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2).toString()
  );
}

export const getToastContainerPosition = (position: ToastPosition) => {
  switch (position) {
    case 'top-right':
      return 'position: fixed; top: 10px; right: 10px; z-index: 9999;';
    case 'top-left':
      return 'position: fixed; top: 10px; left: 10px; z-index: 9999;';
    case 'top-center':
      return 'position: fixed; top: 10px; left: 50%; z-index: 9999;';
    case 'bottom-right':
      return 'position: fixed; bottom: 10px; right: 10px; z-index: 9999;';
    case 'bottom-left':
      return 'position: fixed; bottom: 10px; left: 10px; z-index: 9999;';
    case 'bottom-center':
      return 'position: fixed; bottom: 10px; left: 50%; z-index: 9999;';
    default:
      return 'position: fixed; top: 10px; right: 10px; z-index: 9999;';
  }
};

export const findColor = (colorName: string): string => {
  const color: EditorColorObject = colors.filter(
    (c) => c.name === colorName
  )[0];
  if (color) {
    return color.color;
  } else {
    return '';
  }
};

export function htmlEncode(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

export function copyTextToClipboard(text: string): {
  result: boolean;
  msg: string;
} {
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.opacity = '0';
  textarea.style.zIndex = '-1';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  textarea.value = text;

  let result = false;
  let msg = '';

  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  try {
    const success = document.execCommand('copy');
    msg = success ? 'successful' : 'unsuccessful';
    result = true;
  } catch (error: any) {
    msg = error.message;
  }

  document.body.removeChild(textarea);
  return {
    result,
    msg,
  };
}
