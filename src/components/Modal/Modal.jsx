import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = (props) => {
  const [visible, setVisible] = useState(props.visible);
  let timeout;

  useEffect(() => {
    setVisible(props.visible);
    if (props.visible) {
      timeout = setTimeout(() => {
        closeModal();
      }, 4000);
    }
  }, [props.visible]);

  const closeModal = () => {
    clearTimeout(timeout);
    setVisible(false);
    props.onCloseModal();
  };

  return (
    <div className="modal" hidden={!visible} onClick={closeModal}>
      {props.message}
    </div>
  );
};

export default Modal;
