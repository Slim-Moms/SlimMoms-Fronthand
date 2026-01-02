import React from 'react';
import styles from './Loader.module.css';

const Loader = ({
  size = 'medium',      // 'small', 'medium', 'large'
  color = 'primary',    // 'primary', 'secondary', 'white', 'dark'
  variant = 'spinner',  // 'spinner', 'dots', 'pulse'
  text = '',
  showText = true,
  fullPage = false,
  className = '',
  overlay = false,
}) => {
  // Size classes
  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  // Color classes
  const colorClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    white: styles.white,
    dark: styles.dark,
  };

  // Variant render
  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`${styles.dotsLoader} ${colorClasses[color]}`}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`${styles.pulseLoader} ${colorClasses[color]} ${sizeClasses[size]}`}></div>
        );
      
      case 'spinner':
      default:
        return (
          <div className={`${styles.spinnerLoader} ${colorClasses[color]} ${sizeClasses[size]}`}>
            <div></div><div></div><div></div><div></div>
          </div>
        );
    }
  };

  // Loader content
  const loaderContent = (
    <div className={`${styles.loaderContainer} ${className}`}>
      {renderVariant()}
      {text && showText && (
        <div className={`${styles.loaderText} ${colorClasses[color]}`}>
          {text}
        </div>
      )}
    </div>
  );

  // Full page loader
  if (fullPage) {
    return (
      <div className={styles.fullPageWrapper}>
        {loaderContent}
      </div>
    );
  }

  // Overlay loader
  if (overlay) {
    return (
      <div className={styles.overlayWrapper}>
        {loaderContent}
      </div>
    );
  }

  // Regular inline loader
  return loaderContent;
};

export default Loader;