import React from 'react';
import './Modal.scss';

type ModalProps = {
    onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  return (
    <div className="modal">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Modal