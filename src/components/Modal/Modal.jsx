import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Scroll kilit
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
            {/* SVG ikon kullanılabilir veya basit X */}
            &#10005; 
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;