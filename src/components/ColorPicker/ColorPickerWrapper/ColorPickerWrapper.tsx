import React, { useState, useEffect } from 'react';
import { Color } from '../../../types';
import themes from '../Theme/ColorTheme';
import Modal from '../Modal/Modal';
import ColorPicker from '../ColorPicker/ColorPicker';

export type ColorPickerWrapperProps = {
  color: Color;
  onChange: (color: Color) => void;
  height?: number;
  width?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: string;
  borderColor?: Color;
};

const ColorPickerWrapper: React.FC<ColorPickerWrapperProps> = ({
  color,
  onChange,
  height = 40,
  width = 120,
  borderRadius = 10,
  borderWidth = 5,
  borderStyle = 'solid',
  borderColor = '#333',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {}, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setTop(event.clientY - window.innerHeight / 2);
    setLeft(event.clientX - window.innerWidth / 2);
    setShowPicker(!showPicker);
  };

  const swatchStyle = {
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${borderRadius}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: `${borderColor}`,
    borderStyle: `${borderStyle}`,
    cursor: 'pointer',
    backgroundColor: `${color}`,
  };

  return (
    <div>
      <button
        className="mpw-swatch"
        style={swatchStyle}
        onClick={handleClick}
      ></button>
      {showPicker && (
        <Modal show={showPicker} onClose={() => setShowPicker(false)}>
          <ColorPicker
            color={color}
            // @ts-ignore
            onChange={(color) => onChange(color.hex)}
            theme={themes.dark}
            top={top}
            left={left}
          />
        </Modal>
      )}
    </div>
  );
};

export default ColorPickerWrapper;
