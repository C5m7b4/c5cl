// @ts-nocheck

import React, { useState } from 'react';

import TypeAheadDropDown from './TypeAheadDropdown';

const FakeData = [
  {
    id: 1,
    storeName: 'Mikes Grocery',
  },
  {
    id: 2,
    storeName: 'Tommy Grocery',
  },
  {
    id: 3,
    storeName: 'TJs Grocery',
  },
  {
    id: 4,
    storeName: 'Marys Grocery',
  },
  {
    id: 5,
    storeName: 'Codys Grocery',
  },
];

const TypeAheadDemo = () => {
  const [selection, setSelection] = useState(1);

  const handleStoreChange = (e) => {
    setSelection(e.id);
  };

  return (
    <div>
      <TypeAheadDropDown
        placeholder={'Select a Store'}
        data={FakeData}
        value={parseInt(selection.id)}
        keyValue={'id'}
        displayValue={'storeName'}
        setSelection={handleStoreChange}
        label={'Stores'}
        labelColor={'black'}
        backgroundColor={'black'}
      />
    </div>
  );
};

export default TypeAheadDemo;
