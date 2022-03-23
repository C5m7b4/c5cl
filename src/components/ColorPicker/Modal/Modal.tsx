import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<ModalProps> = ({ show = false, onClose, children }) => {
  return (
    <>
      <Backdrop show={show} close={onClose} />
      <ModalWrapper className="color-picker-modal-wrapper" show={show}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
