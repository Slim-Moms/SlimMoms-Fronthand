import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import { selectIsLoading as selectDietLoading } from '../../redux/diet/dietSelectors';
import styles from './Loader.module.css';

const AppLoader = () => {
  const isGlobalLoading = useSelector(selectIsLoading);
  const isDietLoading = useSelector(selectDietLoading);

  // Show loader if any is true 
  if (!isGlobalLoading && !isDietLoading) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
        <div className={styles.dot3}></div>
      </div>
    </div>
  );
};

export default AppLoader;