import React from 'react';
import { useSelector } from 'react-redux';
import { selectDailyRate, selectNotAllowedProducts } from '../../redux/diet/dietSelectors';
import styles from './RightSideBar.module.css';

const RightSideBar = () => {
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  
  // HATA ÇÖZÜMÜ: Tarihi Türkçe formatında alıyoruz
  const date = new Date().toLocaleDateString('tr-TR'); 

  // Hesaplama mantığı (Şimdilik tüketilen 0 varsayıyoruz)
  const consumed = 0;
  const left = dailyRate ? Math.round(dailyRate) - consumed : 0;
  const percentage = dailyRate ? Math.round((consumed / dailyRate) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* Özet Alanı */}
      <div className={styles.summarySection}>
        <h2 className={styles.header}>Summary for {date}</h2>
        <ul className={styles.statList}>
          <li className={styles.statItem}>
            <span className={styles.statText}>Left</span>
            <span className={styles.statValue}>{left} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span className={styles.statText}>Consumed</span>
            <span className={styles.statValue}>{consumed} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span className={styles.statText}>Daily Rate</span>
            <span className={styles.statValue}>{dailyRate ? Math.round(dailyRate) : 0} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span className={styles.statText}>n% of normal</span>
            <span className={styles.statValue}>{percentage} %</span>
          </li>
        </ul>
      </div>

      {/* Yasaklı Yiyecekler Alanı */}
      <div className={styles.foodSection}>
        <h2 className={styles.header}>Food not recommended</h2>
        {notAllowedProducts && notAllowedProducts.length > 0 ? (
           <ul className={styles.productList}>
             {notAllowedProducts.map((prod, index) => (
               <li key={index}>{prod}</li>
             ))}
           </ul>
        ) : (
          <p className={styles.emptyText}>Your diet will be displayed here</p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;