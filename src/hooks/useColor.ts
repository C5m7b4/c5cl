import { useState, useEffect } from 'react';
import { initColor } from '../components/ColorPicker/ColorPicker/helper';

import { Color, ColorObject } from '../types';

export const useColor = (color: Color) => {
  const [col, setCol] = useState<ColorObject>(initColor(color));

  useEffect(() => {
    setCol(initColor(color));
  }, [color]);

  return col;
};
