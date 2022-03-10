import React, { useState, useEffect } from 'react';
import Confirm from './Confirm';

const ConfirmDemo = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      handleDelete();
    }
  }, [success]);

  const hide = () => {
    setIsShowing(false);
  };

  const handleDelete = () => {
    console.log('delete something');
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsShowing(!isShowing)}>
          Show Confirm Delete
        </button>
      </div>
      <Confirm
        title="Confirm Something"
        isShowing={isShowing}
        hide={hide}
        confirmText={'delete me'}
        setSuccess={setSuccess}
        moreInfo={'This operation cannot be undone'}
      />
    </div>
  );
};

export default ConfirmDemo;
