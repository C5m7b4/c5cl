import React, { useState, useEffect } from 'react';
import ColorPickerWrapper, { ColorPicker, themes } from './index';

const ColorPickerDemo: React.FC = () => {
  const [color, setColor] = useState('#00ff00');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="wrapper">
      <div className="demo-title">Welcome to our Color Picker Demo</div>
      <div className="demo-buttons">
        <button
          className="demo-btn1"
          onClick={() => setShowPicker(!showPicker)}
        >
          Click me for a Color Picker
        </button>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <ColorPickerWrapper
          color={color}
          onChange={(e) => setColor(e.toString())}
        />
      </div>
      {showPicker && (
        <ColorPicker
          color={color}
          onChange={(e) => setColor(e.hex)}
          theme={themes.dark}
          combinations="analogous"
        />
      )}
    </div>
  );
};

export default ColorPickerDemo;
