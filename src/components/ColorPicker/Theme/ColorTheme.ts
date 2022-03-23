import { ColorTheme } from '../../../types';

type Themes = {
  light: ColorTheme;
  dark: ColorTheme;
};

const theme: Themes = {
  light: {
    background: '#fff',
    inputBackground: '#f4f4f4',
    color: '#262626',
    borderColor: '#d4d4d4',
    borderRadius: '5px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    background: 'rgba(40, 40, 40, 0.95)',
    inputBackground: '#454545',
    color: '#e3e3d3',
    borderRadius: '5px',
    borderColor: '#575657',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    width: '280px',
  },
};

export default theme;
