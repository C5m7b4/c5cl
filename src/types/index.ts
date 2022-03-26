import React from 'react';

export type TypeOptions =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'default'
  | 'dark';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type Theme = 'light' | 'dark' | 'colored';

export type AnimationTypes = 'slide' | 'bounce' | 'spin' | 'zoom' | 'flip';

export type Id = number | string;

export type ToastClassName =
  | {
      type?: TypeOptions;
      defaultClassName?: string;
      position?: ToastPosition;
    }
  | string;

export interface ToastContentProps {
  closeToast?: () => void;
}

export type ToastContent = React.ReactNode;

interface CommonOptions {
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  position?: ToastPosition;
  onClick?: (event: React.MouseEvent) => void;
}

export interface ToastOptions extends CommonOptions {
  content?: ToastContent;
  animation?: AnimationTypes;
  type?: TypeOptions;
  autoClose?: boolean;
  showIcon?: boolean;
}

export interface ToastProps extends ToastOptions {
  toastId: Id;
  type: TypeOptions;
  position: ToastPosition;
  children?: ToastContent;
  className?: ToastClassName;
  theme?: Theme;
  showIcon?: boolean;
  toastAnimation?: AnimationTypes;
  toastAutoClose?: boolean;
  toastShowIcon?: boolean;
  options?: ToastOptions;
  toastClassName?: ToastClassName;
  toastBodyStyle?: React.CSSProperties;
}

export interface NotValidatedToastProps extends Partial<ToastProps> {
  toastId: Id;
  toastShowIcon: boolean;
  toastAutoClose: boolean;
  toastClassName: ToastClassName;
  toastBodyStyle: React.CSSProperties;
  bodyStyle: React.CSSProperties;
}

export type HslColor = { h: number; s: number; l: number; a: number };
export type HsvColor = { h: number; s: number; v: number; a: number };
export type RgbColor = { r: number; g: number; b: number; a: number };
export type Alpha = { a: number };

export type Color = string | HslColor | HsvColor | RgbColor;

export type ColorObject = {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  alpha: number;
};

export type ColorCombination =
  | 'analogous'
  | 'monochromatic'
  | 'splitcomplement'
  | 'triad'
  | 'tetrad'
  | 'complement';

export type ColorTheme = {
  background?: string;
  inputBackground?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  width?: string;
};

export type Parsers =
  | 'babel'
  | 'css'
  | 'json'
  | 'flow'
  | 'babel-flow'
  | 'babel-ts'
  | 'typescript'
  | 'json'
  | 'markdown'
  | 'html';
