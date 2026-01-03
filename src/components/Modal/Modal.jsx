// src/components/Modal/Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13" stroke="#9B9FAA" strokeWidth="2" />
            <path d="M1 13L13 1" stroke="#9B9FAA" strokeWidth="2" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;