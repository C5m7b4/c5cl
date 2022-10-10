import React from 'react';
import { createPortal } from 'react-dom';

import './RowEditConfirmation.css';

export interface RowEditConfirmationProps {
  show: boolean;
  hide: () => void;
  confirm: () => void;
  style: React.CSSProperties;
  identifier: string;
}

const RowEditConfirmation = (props: RowEditConfirmationProps) => {
  const div = document.getElementById(`mikto-confirm=${props.identifier}`);
  if (props.show && div) {
    return createPortal(
      <div className="row-edit-confirmation" style={props.style}>
        <div className="contents">
          <div className="buttons">
            <button
              data-testid="grid-editing-cancel"
              type="button"
              className="cancel"
              onClick={props.hide}
            >
              Cancel
            </button>
            <button
              data-testid="grid-editing-confirm"
              type="button"
              className="ok"
              onClick={props.confirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>,
      div
    );
  } else {
    return null;
  }
};

export default RowEditConfirmation;
