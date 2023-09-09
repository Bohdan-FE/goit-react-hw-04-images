import { ModalContainer, Overlay } from './Modal.styled';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImg, tag, handleCloseModal }) => {
  const closeModalClick = e => {
    if (e.currentTarget === e.target) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    const closeModalESC = e => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', closeModalESC);
    return () => {
      window.removeEventListener('keydown', closeModalESC);
    };
  }, [handleCloseModal]);

  return (
    <Overlay onClick={closeModalClick}>
      <ModalContainer>
        <img src={largeImg} alt={tag} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propType = {
  largeImg: PropTypes.string,
  tag: PropTypes.string,
  handleCloseModal: PropTypes.func,
};
