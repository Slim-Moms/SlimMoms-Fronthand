import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import  Loader  from '../Loader/Loader.jsx';
import styles from './Modal.module.css';



const Modal = ({
  children,
  isOpen,
  onClose,
  title = '',
  showLoader = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
  size = 'medium', // 'small', 'medium', 'large'
  showCloseButton = true,
}) => {
  // ESC tuşu ile kapatma
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEsc) {
      onClose();
    }
  }, [onClose, closeOnEsc]);

  // Overlay tıklama ile kapatma
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Event listener'ları ekle/kaldır
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Sayfa scroll'unu engelle
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Scroll'u geri aç
    };
  }, [isOpen, handleKeyDown]);

  // Modal açık değilse null döndür
  if (!isOpen) return null;

  // Modal içeriğini portal ile body'ye ekle
  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div 
        className={`${styles.modalContainer} ${styles[size]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={styles.modalHeader}>
            {title && (
              <h2 id="modal-title" className={styles.modalTitle}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Modalı kapat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={styles.modalContent}>
          {showLoader ? <Loader /> : children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;